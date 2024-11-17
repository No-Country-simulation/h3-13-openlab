package OpenLab.services;

import OpenLab.models.User;
import org.springframework.security.core.userdetails.UserDetails;

public interface ITokenService {
    String generateToken(User user);
    String getUsernameFromToken(String token);
    boolean validateToken(String token, UserDetails userDetails);
}
