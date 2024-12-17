package OpenLab.dtos.AdminDTO;

import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record AdminRequestDTO(
        @NotNull(message = "El nombre es obligatorio")
        String nombre,
        @NotNull(message = "El apellido es obligatorio")
        String apellido,
        @Valid @NotNull
        DatosAutenticacionUsuario usuario
) {
}
