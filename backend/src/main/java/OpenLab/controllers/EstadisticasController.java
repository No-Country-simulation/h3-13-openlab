package OpenLab.controllers;

import OpenLab.dtos.ApiResponseDTO;
import OpenLab.dtos.EstadisticasDTO.EstadisticasResponseDTO;
import OpenLab.services.IEstadisticasService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/stadistics")
public class EstadisticasController {

    private final IEstadisticasService estadisticasService;

    public EstadisticasController(IEstadisticasService estadisticasService) {
        this.estadisticasService = estadisticasService;
    }

    @GetMapping("/{id}")
    @Operation(summary = "Se devuelven las estadisticas")
    public ResponseEntity<ApiResponseDTO<EstadisticasResponseDTO>> obtenerEstadisticas(@PathVariable Long id) {
        EstadisticasResponseDTO estadisticasResponseDTO = estadisticasService.calcularEstadisticas(id);
        return new ResponseEntity<>(new ApiResponseDTO<>(true, "Exito", estadisticasResponseDTO), HttpStatus.CREATED);
    }
}
