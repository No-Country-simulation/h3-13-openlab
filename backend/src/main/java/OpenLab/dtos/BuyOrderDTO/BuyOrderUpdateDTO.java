package OpenLab.dtos.BuyOrderDTO;

import jakarta.validation.constraints.NotNull;

public record BuyOrderUpdateDTO(
        @NotNull
        Long id,
        String logo,
        String name,
        int tokens,
        double price
) {
}
