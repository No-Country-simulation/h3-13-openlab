package OpenLab.dtos.UserDTO;

public record GoogleUserInfoCompleta(
        String sub,
        String name,
        String given_name,
        String family_name,
        String picture,
        String email,
        boolean email_verified
) {
}
