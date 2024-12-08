package OpenLab.services.Impl;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class CustomJwtDecoderService implements JwtDecoder {

    @Value("${SECRET_KEY}")
    private String secretKey;
    @Value("${auth0.domain}")
    private String domain;
    @Value("${auth0.clientSecret}")
    private String clientSecret;
    @Value("${auth0.audience}")
    private String audience;

    public CustomJwtDecoderService() {}

    @Override
    public Jwt decode(String token) throws JwtException {
        try {
            token = token.replace("Bearer ", "");
            token.trim();
            Algorithm algorithm = Algorithm.HMAC256(secretKey);
            JWTVerifier verifier = JWT.require(algorithm)
                    .withIssuer(domain.trim())
                    .withAudience(audience.trim())
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
    }

