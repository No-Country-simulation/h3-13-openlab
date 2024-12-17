package OpenLab.services.Impl;

import OpenLab.models.User;
import OpenLab.security.SecretKeyConfig;
import OpenLab.services.ITokenService;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

@Service
public class TokenServiceImpl implements ITokenService {

    @Autowired
    private SecretKeyConfig secretKeyConfig;

    @Override
    public String generateToken(User user) {
        try {
            System.out.println("Generando token...");
            Algorithm algorithm = Algorithm.HMAC256(secretKeyConfig.getSECRET_KEY());
            return JWT.create()
                    .withIssuer("Open Lab")
                    .withSubject(user.getEmail())
                    .withClaim("id", user.getId())
//                    .withClaim("role", user.getRol().name())
                    .withClaim("nombre", user.getEmail())
                    .withExpiresAt(Date.from(generateExpirationDate()))
                    .sign(algorithm);

        } catch (JWTCreationException e) {
            throw new RuntimeException("Error al crear el token");
        }

    }

    private Instant generateExpirationDate() {
        return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-05:00"));
    }

}
