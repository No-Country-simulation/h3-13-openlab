package OpenLab.controllers;

import OpenLab.dtos.UserDTO.GoogleUserInfoCompleta;
import OpenLab.services.IAutenticacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/login")
public class AutenticacionController {

    private final IAutenticacionService autenticacionService;

    public AutenticacionController(IAutenticacionService autenticacionService) {
        this.autenticacionService = autenticacionService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@AuthenticationPrincipal Jwt jwt) {

        System.out.println(jwt.getTokenValue());

        // Recuperar claims del token
        Map<String, Object> claims = jwt.getClaims();

        // Extraer datos personalizados del namespace
        String namespace = "https://open-lab.com/";
        String userId = (String) claims.get("sub");
        String name = (String) claims.get(namespace + "name");
        String familyName = (String) claims.get(namespace + "family_name");
        String givenName = (String) claims.get(namespace + "given_name");
        String picture = (String) claims.get(namespace + "picture");
        String email = (String) claims.get(namespace + "email");
        List<String> roles = (List<String>) claims.get(namespace + "roles"); // Extraer roles

        GoogleUserInfoCompleta googleUserInfoCompleta = new GoogleUserInfoCompleta(
                userId, name, givenName, familyName, picture, email, roles
        );

        System.out.println(googleUserInfoCompleta);

        // Usar el mensaje devuelto por el servicio
        String result = autenticacionService.autenticarConGooglePersonalizado(googleUserInfoCompleta);

        return ResponseEntity.ok(result);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(GoogleUserInfoCompleta googleUserInfoCompleta) {
        String result = autenticacionService.autenticarConGooglePersonalizado(googleUserInfoCompleta);
        return ResponseEntity.ok(result);
    }
}
