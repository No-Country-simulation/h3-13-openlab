package OpenLab.controllers;

import OpenLab.services.Impl.AuthService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/apii")
public class AuthController {

    private final ClientRegistrationRepository clientRegistrationRepository;
    private final OAuth2AuthorizedClientService authorizedClientService;
    private final AuthService authService;

    public AuthController(ClientRegistrationRepository clientRegistrationRepository, OAuth2AuthorizedClientService authorizedClientService, AuthService authService) {
        this.clientRegistrationRepository = clientRegistrationRepository;
        this.authorizedClientService = authorizedClientService;
        this.authService = authService;
    }

    @GetMapping("/user-info2")
    public ResponseEntity<?> getUserInfo(OAuth2AuthenticationToken authentication) {
        OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
                authentication.getAuthorizedClientRegistrationId(),
                authentication.getName()
        );

        if (client == null || client.getAccessToken() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No access token available.");
        }

        String userInfoEndpointUri = "https://<YOUR_AUTH0_DOMAIN>/userinfo";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + client.getAccessToken().getTokenValue());
        HttpEntity<String> entity = new HttpEntity<>("", headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                userInfoEndpointUri,
                HttpMethod.GET,
                entity,
                Map.class
        );

        return ResponseEntity.ok(response.getBody());
    }

    @GetMapping("/user-info")
    public ResponseEntity<?> getUserInfo(Authentication authentication) {
        if (authentication == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuario no autenticado");
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof OidcUser oidcUser) {
            String email = oidcUser.getEmail();
            String name = oidcUser.getFullName();
            Map<String, Object> claims = oidcUser.getClaims();

            return ResponseEntity.ok(Map.of(
                    "email", email,
                    "name", name,
                    "claims", claims));

        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Principal no es una instancia de OidcUser. Es: " + principal.getClass());
        }
    }

    @GetMapping("/access-token")
    public ResponseEntity<?> getAccessToken(OAuth2AuthenticationToken authentication) throws Exception {

        try {
            // Cargar el cliente autorizado
            OAuth2AuthorizedClient client = authorizedClientService
                    .loadAuthorizedClient(
                            authentication.getAuthorizedClientRegistrationId(),
                            authentication.getName()
                    );

            if (client == null || client.getAccessToken() == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("No se pudo obtener el token de acceso.");
            }

            // Obtener el token de acceso
            String accessToken = client.getAccessToken().getTokenValue();

            OAuth2User principal = authentication.getPrincipal();
            String email = (String) principal.getAttributes().get("email");
            if (email == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("No se pudo extraer el email del usuario.");
            }

            String customToken = String.valueOf(authService.autentificarUser(accessToken));
            if (customToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body("No se pudo autenticar al usuario.");
            }

            return ResponseEntity.ok(Map.of("access_token", customToken));
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Ocurrió un error al procesar la solicitud.", "details", ex.getMessage()));
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout1(HttpServletRequest request, HttpServletResponse response) throws Exception {
        // Realiza el logout local
        SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
        logoutHandler.logout(request, response, null);

        // Redirige a Auth0 para el logout
        String logoutUrl = "https://dev-byesylnv0qhe4lwt.us.auth0.com/v2/logout";  // Cambia tu dominio y la URL de retorno
        System.out.println("Logout URL: " + logoutUrl);

        // Redirige al usuario a Auth0 para el logout
        response.sendRedirect(logoutUrl);

        return ResponseEntity.status(302).header("Location", logoutUrl).build();
    }

    @GetMapping("/saludo")
    public ResponseEntity<String> Saludo() {

        return ResponseEntity.ok("hola soy un saludo");
    }

    @GetMapping("/home")
    public ResponseEntity<String> home() {

        return ResponseEntity.ok("hola estoy en el home");
    }

}

