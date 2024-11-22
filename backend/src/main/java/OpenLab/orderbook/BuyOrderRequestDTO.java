package OpenLab.orderbook;

import java.math.BigInteger;

public record BuyOrderRequestDTO(
        BigInteger price,
        BigInteger quantity
){
}
