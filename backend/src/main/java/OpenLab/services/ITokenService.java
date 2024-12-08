package OpenLab.services;

import OpenLab.models.User;
import OpenLab.models.UserInfo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public interface ITokenService {
    String generateToken(User user);

    String generateTokenn(User user, UserInfo userInfo);

    boolean validateToken(String token, UserDetails userDetails);

    String getUsernameFromToken(String token);

    Date getExpirationDateFromToken(String token);

    boolean isTokenExpired(String token);

    Jwt decode(String token) throws JwtException;
}
