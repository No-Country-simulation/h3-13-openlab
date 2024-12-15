package OpenLab.controllers;

import OpenLab.dtos.ApiResponseDTO;
import OpenLab.dtos.BuyOrderDTO.*;
import OpenLab.dtos.SellOrderDTO.*;
import OpenLab.exceptions.ApplicationException;
import OpenLab.models.BuyOrder;
import OpenLab.models.SellOrder;
import OpenLab.services.IBuyOrderService;
import OpenLab.services.ISellOrderService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/orders")
public class OrdersController {

    private final IBuyOrderService buyOrderService;
    private final ISellOrderService sellOrderService;

    public OrdersController(IBuyOrderService buyOrderService, ISellOrderService sellOrderService) {
        this.buyOrderService = buyOrderService;
        this.sellOrderService = sellOrderService;
    }

    @GetMapping("/getAllBuyOrders")
    @Operation(summary = "Obtiene todos buy orders")
    public ResponseEntity<ApiResponseDTO<BuyOrder>> findAllBuyOrder() {
        try {
            List<BuyOrder> buyOrders = buyOrderService.findAll();
            return new ResponseEntity<>(new ApiResponseDTO<>(true, "Exito", buyOrders), HttpStatus.CREATED);
        } catch (ApplicationException e) {
            throw new ApplicationException(" Ha ocurrido un error " + e.getMessage());
        }
    }

    @GetMapping("/getAllSellOrders")
    @Operation(summary = "Obtiene todos sell orders")
    public ResponseEntity<ApiResponseDTO<SellOrder>> findAllSellOrders() {
        try {
            List<SellOrder> sellOrders = sellOrderService.findAll();
            return new ResponseEntity<>(new ApiResponseDTO<>(true, "Exito", sellOrders), HttpStatus.CREATED);
        } catch (ApplicationException e) {
            throw new ApplicationException(" Ha ocurrido un error " + e.getMessage());
        }
    }

    @PostMapping("/addBuyOrder")
    @Operation(summary = "Agrega una nueva orden de compra")
    public ResponseEntity<ApiResponseDTO<BuyOrderResponseDTO>> saveBuyOrder(@RequestBody @Valid BuyOrderRequestDTO buyOrderRequestDTO) {
        BuyOrderResponseDTO buyOrderResponseDTO = buyOrderService.saveBuyOrder(buyOrderRequestDTO);
        String message = "Orden de compra creada";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, buyOrderResponseDTO), HttpStatus.CREATED);
    }

    @PostMapping("/addSellOrder")
    @Operation(summary = "Agrega una nueva orden de venta")
    public ResponseEntity<ApiResponseDTO<SellOrderResponseDTO>> saveBuyOrder(@RequestBody @Valid SellOrderRequestDTO sellOrderRequestDTO) {
        SellOrderResponseDTO sellOrderResponseDTO = sellOrderService.saveSellOrder(sellOrderRequestDTO);
        String message = "Orden de venta creada";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, sellOrderResponseDTO), HttpStatus.CREATED);
    }

    @DeleteMapping("deleteBuyOrder/{id}")
    @Operation(summary = "Elimina un orden de compra")
    public ResponseEntity<String> deleteBuyOrder(@PathVariable("id") Long id) {
        buyOrderService.delete(id);
        return ResponseEntity.ok("Buy Order Eliminado");
    }

    @DeleteMapping("deleteSellOrder/{id}")
    @Operation(summary = "Elimina un orden de venta")
    public ResponseEntity<String> deleteSellOrder(@PathVariable("id") Long id) {
        sellOrderService.delete(id);
        return ResponseEntity.ok("Sell Order Eliminado");
    }

    @PutMapping("/updateBuyOrder")
    @Operation(summary = "Modifica un orden de compra")
    public ResponseEntity<String> updateBuyOrder(@RequestBody @Valid BuyOrderUpdateDTO buyOrderUpdateDTO) {
        BuyOrderResponseDTO buyOrder = buyOrderService.updateBuyOrder(buyOrderUpdateDTO);
        return ResponseEntity.ok("Buy Order Acualizado");
    }

    @PutMapping("/updateSellOrder")
    @Operation(summary = "Modifica un orden de venta")
    public ResponseEntity<String> updateSellOrder(@RequestBody @Valid SellOrderUpdateDTO sellOrderUpdateDTO) {
        SellOrderResponseDTO buyOrder = sellOrderService.updateSellOrder(sellOrderUpdateDTO);
        return ResponseEntity.ok("Sell Order Acualizado");
    }
}
