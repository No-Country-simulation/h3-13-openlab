package OpenLab.dtos.SocialsDTO;

public record SocialsRequestDTO(
        boolean like,
        boolean share,
        boolean join,
        Long idCliente,
        Long idIniciativa
) {
}
