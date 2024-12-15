package OpenLab.dtos.SocialsDTO;

import jakarta.validation.constraints.NotNull;

public record LikeRequestDTO(
        @NotNull Long idCliente,
        @NotNull Long idIniciativa,
        boolean like
) {
}
