package OpenLab.services.Impl;

import OpenLab.dtos.TokenDTO.JWTTokenDTO;
import OpenLab.mappers.UserMapper;
import OpenLab.models.User;
import OpenLab.models.UserInfo;
import OpenLab.services.ITokenService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AuthService {

    @Value("${auth0.domain}")
    private String auth0Domain;
    //
    @Value("${auth0.clientId}")
    private String clientId;

    @Value("${auth0.clientSecret}")
    private String clientSecret;

    @Value("${auth0.audience}")
    private String audience;

    @Value("${AUTH0_USERINFO_URL}")
    private String userInfoUrl;

    private final ITokenService jwtService;
    private final UserServiceImpl userService;
    private final UserMapper userMapper;


    public AuthService(TokenServiceImpl jwtService, UserServiceImpl userService, UserMapper userMapper) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.userMapper = userMapper;
    }


    public JWTTokenDTO autentificarUser(String accessToken) throws Exception {
        String token;
        try {

            UserInfo userinfo = getUserFromAccessToken(accessToken);
            User userResponse = userService.findByEmail(userinfo.getEmail());

            if (userResponse == null) {
                User newUser = userService.save(userMapper.toEntitySave(userinfo));

                return new JWTTokenDTO(jwtService.generateTokenn(newUser, userinfo));
            }

            return new JWTTokenDTO((jwtService.generateTokenn(userResponse, userinfo)));
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    public UserInfo getUserFromAccessToken(String token) throws Exception {


        WebClient webClient = WebClient.builder()
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();


        return webClient.get()
                .uri(userInfoUrl)
                .headers(headers -> headers.set("Authorization", "Bearer " + token))
                .retrieve()
                .bodyToMono(UserInfo.class)
                .doOnNext(user -> System.out.println("User en el getUserFromAccessToken: " + user))
                .doOnError(error -> System.out.println("Error: " + error.getMessage()))
                .block();
    }


    public String logout(String returnTo) {

        return String.format("https://%s/v2/logout?client_id=%s&returnTo=%s",
                auth0Domain, clientId, returnTo);
    }
    public String logoutt() {

        return String.format("https://%s/v2/logout?client_id=%s",
                auth0Domain, clientId);
    }


}


