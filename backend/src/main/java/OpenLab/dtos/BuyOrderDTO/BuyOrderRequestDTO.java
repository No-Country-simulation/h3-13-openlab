package OpenLab.dtos.BuyOrderDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record BuyOrderRequestDTO(
        @NotBlank
        String logo,
        @NotBlank
        String name,
        @NotNull
        int tokens,
        @NotNull
        double price
) {
}
