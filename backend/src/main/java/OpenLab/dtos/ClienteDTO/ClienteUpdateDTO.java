package OpenLab.dtos.ClienteDTO;

import jakarta.validation.constraints.NotNull;

public record ClienteUpdateDTO(
        @NotNull(message = "El id es obligatorio")
        Long id,
        String nombre,
        String apellido
) {
}
