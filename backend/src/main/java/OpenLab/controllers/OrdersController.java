package OpenLab.controllers;

import OpenLab.dtos.ApiResponseDTO;
import OpenLab.exceptions.ApplicationException;
import OpenLab.models.BuyOrder;
import OpenLab.models.SellOrder;
import OpenLab.services.IBuyOrderService;
import OpenLab.services.ISellOrderService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
