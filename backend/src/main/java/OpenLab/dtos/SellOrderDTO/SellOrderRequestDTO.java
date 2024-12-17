package OpenLab.dtos.SellOrderDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SellOrderRequestDTO(
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
