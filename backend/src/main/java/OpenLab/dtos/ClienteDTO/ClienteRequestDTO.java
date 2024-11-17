package OpenLab.dtos.ClienteDTO;

import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record ClienteRequestDTO(
        @NotNull(message = "El nombre es obligatorio")
        String nombre,
        @NotNull(message = "El apellido es obligatorio")
        String apellido,
        @Valid @NotNull
        DatosAutenticacionUsuario usuario
) {
}
