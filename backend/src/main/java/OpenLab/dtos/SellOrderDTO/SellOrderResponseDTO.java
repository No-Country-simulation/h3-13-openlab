package OpenLab.dtos.SellOrderDTO;

public record SellOrderResponseDTO(
        Long id,
        String logo,
        String name,
        int tokens,
        double price
) {
}
