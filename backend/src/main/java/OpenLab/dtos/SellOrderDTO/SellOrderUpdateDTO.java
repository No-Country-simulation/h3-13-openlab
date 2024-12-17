package OpenLab.dtos.SellOrderDTO;

import jakarta.validation.constraints.NotNull;

public record SellOrderUpdateDTO(
        @NotNull
        Long id,
        String logo,
        String name,
        int tokens,
        double price
) {
}
