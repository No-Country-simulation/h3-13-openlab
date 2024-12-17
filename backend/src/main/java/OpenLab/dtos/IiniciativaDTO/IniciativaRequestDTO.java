package OpenLab.dtos.IiniciativaDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record IniciativaRequestDTO(
        @NotBlank
        String imagen,
        @NotBlank
        String billetera,
        @NotBlank
        String nombre,
        @NotBlank
        String idea,
        @NotBlank
        String problema,
        @NotBlank
        String oportunidad,
        @NotBlank
        String solucion,
        @NotNull
        int monto_requerido,
        @NotNull
        Long clienteId
) {
}
