package OpenLab.dtos.SocialsDTO;

import jakarta.validation.constraints.NotNull;

public record JoinRequestDTO(
        @NotNull Long idCliente,
        @NotNull Long idIniciativa,
        boolean join
) {
}
