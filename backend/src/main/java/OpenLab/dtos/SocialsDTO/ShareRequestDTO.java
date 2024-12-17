package OpenLab.dtos.SocialsDTO;

import jakarta.validation.constraints.NotNull;

public record ShareRequestDTO(
        @NotNull Long idCliente,
        @NotNull Long idIniciativa,
        boolean share
) {
}
