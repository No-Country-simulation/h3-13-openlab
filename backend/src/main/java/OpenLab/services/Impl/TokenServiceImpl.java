package OpenLab.services.Impl;

import OpenLab.models.User;
import OpenLab.models.UserInfo;
import OpenLab.security.SecretKeyConfig;
import OpenLab.services.ITokenService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static javax.crypto.Cipher.SECRET_KEY;

@Service
public class TokenServiceImpl implements ITokenService {


    @Value("${SECRET_KEY}")
    private String secretKey;
    @Value("${auth0.domain}")
    private String domain;
    @Value("${auth0.clientSecret}")
    private String clientSecret;
    @Value("${auth0.audience}")
    private String audience;


    @Override
    public String generateToken(User user) {
        return null;
    }

    @Override
    public String generateTokenn(User user, UserInfo userInfo) {

        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            return JWT.create()
                    .withIssuer(domain)
                    .withSubject(userInfo.getSub())
                    //.withAudience(audience)
                    .withClaim("id", user.getId())
                    .withClaim("email", user.getEmail())
                    .withClaim("name", user.getName())
                    .withClaim("role", String.valueOf(user.getRol()))
                    .withIssuedAt(new Date())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);

        } catch (JWTCreationException e) {
            throw new RuntimeException("Error al crear el token");
        }
    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-05:00"));
    }

    public boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    public Date getExpirationDateFromToken(String token) {
        Jwt jwt = decode(token);
        return Date.from(jwt.getExpiresAt());
    }

    public String getUsernameFromToken(String token) {

        if (token == null) {
            throw new RuntimeException("Token nulo");
        }
        DecodedJWT verifier;
        try {
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            verifier = JWT.require(algorithm)
                    .withIssuer(domain)
                    .withAudience(audience)
                    .build()
                    .verify(token);

            if (verifier.getSubject() == null) {
                throw new RuntimeException("Verificador invalido");
            }
            return String.valueOf(verifier.getClaim("email").as(String.class));
        } catch (JWTCreationException e) {
            throw new RuntimeException("Error al verificar el token");
        }
    }

    @Override
    public boolean validateToken(String token, UserDetails userDetails) {
        String email = getUsernameFromToken(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public Jwt decode(String token) throws JwtException {
        try {
            token = token.replace("Bearer ", "");
            token.trim();
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(domain.trim())
                    .build();


            DecodedJWT decodedJWT = verifier.verify(token);

            // Extraer Claims
            Map<String, Object> claims = new HashMap<>();
            decodedJWT.getClaims().forEach((k, v) -> claims.put(k, v.as(Object.class)));

            // Construir el objeto Jwt que Spring Security utiliza
            return Jwt.withTokenValue(token)
                    .headers(h -> h.put("alg", decodedJWT.getAlgorithm()))
                    .claims(c -> c.putAll(claims))
                    .issuedAt(decodedJWT.getIssuedAt().toInstant())
                    .expiresAt(decodedJWT.getExpiresAt().toInstant())
                    .build();

        } catch (Exception e) {
            throw new JwtException("Token inválido", e);
        }
    }


//
//    //    @Autowired
////    private SecretKeyConfig secretKeyConfig;
//    @Override
//    public String generateToken(User user) {
//        try {
//            System.out.println("Generando token...");
//            Algorithm algorithm = Algorithm.HMAC256(secretKeyConfig.getSECRET_KEY());
//            return JWT.create()
//                    .withIssuer("Open Lab")
//                    .withSubject(user.getEmail())
//                    .withClaim("id", user.getId())
////                    .withClaim("role", user.getRol().name())
//                    .withClaim("nombre", user.getEmail())
//                    .withExpiresAt(Date.from(generateExpirationDate()))
//                    .sign(algorithm);
//
//        } catch (JWTCreationException e) {
//            throw new RuntimeException("Error al crear el token");
//        }
//
//    }
//
//    private Instant generateExpirationDate() {
//        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-05:00"));
//    }

}
