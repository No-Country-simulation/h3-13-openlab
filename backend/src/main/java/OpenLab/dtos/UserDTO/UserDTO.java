package OpenLab.dtos.UserDTO;

import OpenLab.enums.Roles;

public record UserDTO(
        String email,
        Roles rol
) {
}
