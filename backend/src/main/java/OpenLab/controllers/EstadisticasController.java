package OpenLab.controllers;

import OpenLab.dtos.ApiResponseDTO;
import OpenLab.dtos.EstadisticasDTO.EstadisticasResponseDTO;
import OpenLab.models.Estadisticas;
import OpenLab.services.IEstadisticasService;
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
    public ResponseEntity<ApiResponseDTO<EstadisticasResponseDTO>> obtenerEstadisticas(@PathVariable Long id) {
        EstadisticasResponseDTO estadisticasResponseDTO = estadisticasService.calcularEstadisticas(id);
        return new ResponseEntity<>(new ApiResponseDTO<>(true, "Exito", estadisticasResponseDTO), HttpStatus.CREATED);
    }
}
