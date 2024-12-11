package OpenLab.dtos.ClienteDTO;

import OpenLab.dtos.UserDTO.UserDTO;

import java.util.List;

public record ClienteResponseDTO(
        Long id,
        String nombre,
        String apellido,
        String picture,
        String nombreCompleto,
        UserDTO usuario,

        List<Long> idIniciativas
) {
}
