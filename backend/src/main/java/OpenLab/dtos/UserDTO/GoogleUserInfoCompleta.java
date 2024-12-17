package OpenLab.dtos.UserDTO;

import java.util.List;

public record GoogleUserInfoCompleta(
        String sub,
        String name,
        String given_name,
        String family_name,
        String picture,
        String email
        //List<String> roles
) {
}
