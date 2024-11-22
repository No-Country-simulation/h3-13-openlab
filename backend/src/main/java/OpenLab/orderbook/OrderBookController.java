package OpenLab.orderbook;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
@RestController
@RequestMapping("/orderbook")
public class OrderBookController {

    @PostMapping("/validate-buy")
    public ResponseEntity<String> validateBuyOrder(@RequestBody BuyOrderRequestDTO request) {
        try {
            // Lógica de validación (puedes personalizar)
            if (request.price().compareTo(BigInteger.ZERO) <= 0 ||
                    request.quantity().compareTo(BigInteger.ZERO) <= 0) {
                throw new IllegalArgumentException("El precio y la cantidad deben ser mayores a 0.");
            }
            return ResponseEntity.ok("Datos validados correctamente. Procede con la transacción.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}

