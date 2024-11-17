package OpenLab.dtos.AdminDTO;

import jakarta.validation.constraints.NotNull;

public record AdminUpdateDTO(
        @NotNull(message = "El id es obligatorio")
        Long id,
        String nombre,
        String apellido
) {
}
