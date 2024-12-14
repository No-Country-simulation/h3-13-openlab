package OpenLab.security;

import OpenLab.controllers.LogoutController;
import OpenLab.services.Impl.CustomJwtDecoderService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.InMemoryOAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.DelegatingOAuth2TokenValidator;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2TokenValidator;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Value("${auth0.domain}")
    private String issuer;
    @Value("${auth0.clientId}")
    private String clientId;
    @Value("${auth0.clientSecret}")
    private String clientSecret;
    @Value("${AUTH0_AUDIENCE}")
    private String audience;
    @Value("${AUTH0_USERINFO_URL}")
    private String userInfoUrl;
    @Value("${AUTH0_TOKEN_URL}")
    private String tokenUrl;

    @Value("${AUTH0_AUTHORIZATION_URL}")
    private String authorizationUrl;
    @Value("${AUTH0_CALLBACK_URL}")
    private String callbackUrl;

    private final CustomJwtDecoderService customJwtDecoder;

    private final SecurityFilter securityFilter;

    public SecurityConfiguration(CustomJwtDecoderService customJwtDecoder, SecurityFilter securityFilter) {
        this.customJwtDecoder = customJwtDecoder;
        this.securityFilter = securityFilter;
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, @Lazy AuthenticationSuccessHandler authenticationSuccessHandler) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        //Autenticacion Controller
                        .requestMatchers(HttpMethod.POST, "/api/**", "/api/login", "/api/login/signup", "/api/admin/add", "/api/cliente/add").permitAll()
                        //Auth Controller Angel
                        .requestMatchers("/apii/access-token**").permitAll()
                        .requestMatchers("/apii/saludo**").permitAll()
                        .requestMatchers("/apii/home**").authenticated()
                        .requestMatchers("/logout**").authenticated()

                        //Cliente Controller
                        .requestMatchers(HttpMethod.GET, "/api/cliente/getAll", "/api/cliente/{id}").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/cliente/update").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/cliente/{id}").authenticated()
                        //Iniciativa Controller
                        .requestMatchers(HttpMethod.POST, "/api/iniciativa/add").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/iniciativa/getAllIniciativas").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/iniciativa/getUserIniciativas/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/iniciativa/search").permitAll()
                        //Admin Controller
                        .requestMatchers(HttpMethod.GET, "/api/admin/getAll", "/api/cliente/{id}").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/admin/update").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/admin/{id}").authenticated()
                        //Contratos Controller
                        .requestMatchers(HttpMethod.GET, "/orderbook/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/orderbook/**").permitAll()
                        // Socials Controller
                        .requestMatchers(HttpMethod.POST, "/api/social/socials").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/social/getUserLikes/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/social/getUserJoins/{id}").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/social/getUserShares/{id}").permitAll()
                        //Swagger
                        .requestMatchers(HttpMethod.GET, "/swagger-ui.html", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
                        .anyRequest().authenticated())
                //Login a traves de Auth0
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(authenticationSuccessHandler)
                        .userInfoEndpoint(userInfo -> userInfo.oidcUserService(oidcUserService()))
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwtAuthenticationProvider())
                )
                .addFilterBefore(securityFilter, OAuth2LoginAuthenticationFilter.class)
                .logout(logout -> logout
                                .logoutSuccessHandler(logoutSuccessHandler())
//
                                .deleteCookies("JSESSIONID")
                                .clearAuthentication(true)
                                .invalidateHttpSession(true)
                );


        // .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())));
        return http.build();
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new LogoutController();
    }

    @Bean
    public OidcUserService oidcUserService() {
        return new OidcUserService() {

            @Override
            public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
                OidcUser oidcUser = super.loadUser(userRequest);

                // Verifica si los claims necesarios están presentes
                String email = oidcUser.getAttribute("email");
                if (email == null) {
                    throw new OAuth2AuthenticationException("El email no está presente en el token.");
                }

                return oidcUser;
            }

            ; // Manejo básico de OIDC User
        };
    }


    @Bean
    public OAuth2AuthorizedClientService authorizedClientService(ClientRegistrationRepository clientRegistrationRepository) {
        return new InMemoryOAuth2AuthorizedClientService(clientRegistrationRepository);
    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        ClientRegistration registration = ClientRegistration.withRegistrationId("auth0")
                .clientId(clientId)
                .clientSecret(clientSecret)
                .redirectUri(callbackUrl)
                .authorizationUri(authorizationUrl)
                .tokenUri(tokenUrl)
                .userInfoUri(userInfoUrl)
                .jwkSetUri("https://dev-byesylnv0qhe4lwt.us.auth0.com/.well-known/jwks.json")
                .userNameAttributeName("sub")
                .clientName("Auth0")
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .scope("openid", "profile", "email")
                .build();

        return new InMemoryClientRegistrationRepository(registration);
    }

    private JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");
        grantedAuthoritiesConverter.setAuthoritiesClaimName("permissions");

        JwtAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();
        authenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);

        return authenticationConverter;
    }

    @Bean
    public JwtAuthenticationProvider jwtAuthenticationProvider() {
        JwtAuthenticationProvider provider = new JwtAuthenticationProvider(new CustomJwtDecoderService());
        provider.setJwtAuthenticationConverter(jwtAuthenticationConverter());
        return provider;
    }

    //    private final AuthDomainConfig domainConfig;
//    private final AuthAudienceConfig audienceConfig;
//
//    public SecurityConfiguration(AuthDomainConfig domainConfig, AuthAudienceConfig audienceConfig) {
//        this.domainConfig = domainConfig;
//        this.audienceConfig = audienceConfig;
//    }

//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable())
//                .authorizeHttpRequests(auth -> auth
//                        //Autenticacion Controller
//                        .requestMatchers(HttpMethod.POST, "/api/**","/api/login", "/api/login/signup","/api/admin/add", "/api/cliente/add").permitAll()
//                        //Cliente Controller
//                        .requestMatchers(HttpMethod.GET, "/api/cliente/getAll", "/api/cliente/{id}").permitAll()
//                        .requestMatchers(HttpMethod.PUT, "/api/cliente/update").authenticated()
//                        .requestMatchers(HttpMethod.DELETE, "/api/cliente/{id}").authenticated()
//                        //Iniciativa Controller
//                        .requestMatchers(HttpMethod.POST, "/api/iniciativa/add").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/iniciativa/getAllIniciativas").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/iniciativa/getUserIniciativas/{id}").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/iniciativa/search").permitAll()
//                        //Admin Controller
//                        .requestMatchers(HttpMethod.GET, "/api/admin/getAll", "/api/cliente/{id}").authenticated()
//                        .requestMatchers(HttpMethod.PUT, "/api/admin/update").authenticated()
//                        .requestMatchers(HttpMethod.DELETE, "/api/admin/{id}").authenticated()
//                        //Contratos Controller
//                        .requestMatchers(HttpMethod.GET, "/orderbook/**").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/orderbook/**").permitAll()
//                        // Socials Controller
//                        .requestMatchers(HttpMethod.POST, "/api/social/socials").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/social/getUserLikes/{id}").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/social/getUserJoins/{id}").permitAll()
//                        .requestMatchers(HttpMethod.GET, "/api/social/getUserShares/{id}").permitAll()
//                        //Swagger
//                        .requestMatchers(HttpMethod.GET,"/swagger-ui.html", "/v3/api-docs/**", "/swagger-ui/**").permitAll()
//                        .anyRequest().authenticated())
//                .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.decoder(jwtDecoder())));
//        return http.build();
//    }
//
//    @Bean
//    public JwtDecoder jwtDecoder() {
//        NimbusJwtDecoder jwtDecoder = JwtDecoders.fromIssuerLocation(domainConfig.getAUTH_DOMAIN());
//
//        // Validación personalizada del token JWT
//        OAuth2TokenValidator<Jwt> audienceValidator = new AudienceValidator(audienceConfig.getAUTH_AUDIENCE());
//        OAuth2TokenValidator<Jwt> defaultValidator = JwtValidators.createDefaultWithIssuer(domainConfig.getAUTH_DOMAIN());
//        OAuth2TokenValidator<Jwt> combinedValidator = new DelegatingOAuth2TokenValidator<>(defaultValidator, audienceValidator);
//
//        jwtDecoder.setJwtValidator(combinedValidator);
//        return jwtDecoder;
//    }


}