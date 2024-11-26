package OpenLab.dtos.ClienteDTO;

import OpenLab.dtos.UserDTO.UserDTO;

public record ClienteResponseDTO(
        Long id,
        String nombre,
        String apellido,
        String picture,
        String nombreCompleto,
        UserDTO usuario
) {
}
