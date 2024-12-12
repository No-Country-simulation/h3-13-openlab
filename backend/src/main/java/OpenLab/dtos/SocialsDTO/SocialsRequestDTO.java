package OpenLab.dtos.SocialsDTO;

import jakarta.validation.constraints.NotNull;

public record SocialsRequestDTO(
        boolean like,
        boolean share,
        boolean join,
        @NotNull Long idCliente,
        @NotNull Long idIniciativa
) {}
