package OpenLab.dtos.BuyOrderDTO;

public record BuyOrderResponseDTO(
        Long id,
        String logo,
        String name,
        int tokens,
        double price
) {
}
