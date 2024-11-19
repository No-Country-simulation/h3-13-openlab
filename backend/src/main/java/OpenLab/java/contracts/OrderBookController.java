package OpenLab.java.contracts;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.web3j.tuples.generated.Tuple3;

import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("/orderbook")
public class OrderBookController {

    private final OrderBookService orderBookService;

    public OrderBookController(OrderBookService orderBookService) {
        this.orderBookService = orderBookService;
    }

    // Endpoint para obtener el número de órdenes de compra
    @GetMapping("/buy-count")
    public ResponseEntity<BigInteger> getBuyCount() {
        try {
            return ResponseEntity.ok(orderBookService.buyCount());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint para cancelar una orden de compra
    @PostMapping("/cancel-buy")
    public ResponseEntity<String> cancelBuy() {
        try {
            orderBookService.cancelBuy();
            return ResponseEntity.ok("Buy order cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Endpoint para cancelar una orden de venta
    @PostMapping("/cancel-sell")
    public ResponseEntity<String> cancelSell() {
        try {
            orderBookService.cancelSell();
            return ResponseEntity.ok("Sell order cancelled successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Endpoint para obtener las órdenes de compra
    @GetMapping("/buy-side")
    public ResponseEntity<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>> getBuySide() {
        try {
            return ResponseEntity.ok(orderBookService.getBuySide());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint para obtener las órdenes de venta
    @GetMapping("/sell-side")
    public ResponseEntity<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>> getSellSide() {
        try {
            return ResponseEntity.ok(orderBookService.getSellSide());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint para obtener el spread (diferencia de precio entre la mejor orden de compra y venta)
    @GetMapping("/spread")
    public ResponseEntity<BigInteger> getSpread() {
        try {
            return ResponseEntity.ok(orderBookService.getSpread());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint para colocar una orden de compra
    @PostMapping("/place-buy")
    public ResponseEntity<String> placeBuy(@RequestParam BigInteger price, @RequestParam BigInteger quantity) {
        try {
            orderBookService.placeBuy(price, quantity);
            return ResponseEntity.ok("Buy order placed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Endpoint para colocar una orden de venta
    @PostMapping("/place-sell")
    public ResponseEntity<String> placeSell(@RequestParam BigInteger price, @RequestParam BigInteger quantity) {
        try {
            orderBookService.placeSell(price, quantity);
            return ResponseEntity.ok("Sell order placed successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    // Endpoint para obtener el número de órdenes de venta
    @GetMapping("/sell-count")
    public ResponseEntity<BigInteger> getSellCount() {
        try {
            return ResponseEntity.ok(orderBookService.sellCount());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Endpoint para escuchar eventos de "BuyOrderPlaced" (orden de compra colocada)
    @GetMapping("/listen-buy-order-placed")
    public ResponseEntity<String> listenToBuyOrderPlacedEvents() {
        orderBookService.listenToBuyOrderPlacedEvents();
        return ResponseEntity.ok("Listening to BuyOrderPlaced events");
    }

    // Endpoint para escuchar eventos de "CancelBuyOrder" (orden de compra cancelada)
    @GetMapping("/listen-cancel-buy-order")
    public ResponseEntity<String> listenToCancelBuyOrderEvents() {
        orderBookService.listenToCancelBuyOrderEvents();
        return ResponseEntity.ok("Listening to CancelBuyOrder events");
    }

    // Endpoint para escuchar eventos de "CancelSellOrder" (orden de venta cancelada)
    @GetMapping("/listen-cancel-sell-order")
    public ResponseEntity<String> listenToCancelSellOrderEvents() {
        orderBookService.listenToCancelSellOrderEvents();
        return ResponseEntity.ok("Listening to CancelSellOrder events");
    }

    // Endpoint para escuchar eventos de "SellOrderPlaced" (orden de venta colocada)
    @GetMapping("/listen-sell-order-placed")
    public ResponseEntity<String> listenToSellOrderPlacedEvents() {
        orderBookService.listenToSellOrderPlacedEvents();
        return ResponseEntity.ok("Listening to SellOrderPlaced events");
    }
}
