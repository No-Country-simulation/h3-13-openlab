package OpenLab.controllers;

import OpenLab.dtos.ApiResponseDTO;
import OpenLab.dtos.IiniciativaDTO.IniciativaRequestDTO;
import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.mappers.IniciativaMapper;
import OpenLab.models.Iniciativa;
import OpenLab.services.IniciativaService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/iniciativa")
public class IniciativaController {

    private final IniciativaService iniciativaService;
    private final IniciativaMapper iniciativaMapper;

    public IniciativaController(IniciativaService iniciativaService, IniciativaMapper iniciativaMapper) {
        this.iniciativaService = iniciativaService;
        this.iniciativaMapper = iniciativaMapper;
    }

    @PostMapping("/add")
    @Operation(summary = "Se agrega una iniciativa")
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> save(@RequestBody @Valid IniciativaRequestDTO iniciativaRequestDTO) {
        IniciativaResponseDTO iniciativaResponseDTO = iniciativaService.saveIniciativa(iniciativaRequestDTO);
        String message = "Iniciativa Creada";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, iniciativaResponseDTO), HttpStatus.CREATED);
    }

    @GetMapping("/getAllIniciativas")
    @Operation(summary = "Se devuelven todas las iniciativas creadas")
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getAll() {
        List<Iniciativa> iniciativas = iniciativaService.findAll();
        List<IniciativaResponseDTO> iniciativasResponseDTO = iniciativaMapper.toListResponseDTO(iniciativas);
        String message = "Iniciativas Encontradas";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, iniciativasResponseDTO), HttpStatus.OK);
    }

    @GetMapping("/getUserIniciativas/{id}")
    @Operation(summary = "Se devuelven las iniciativas del usuario")
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getUserIniciativas(@PathVariable @Valid Long id) {
        List<IniciativaResponseDTO> iniciativas = iniciativaService.getUserIniciativas(id);
        String message = "Iniciativas Encontradas";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, iniciativas), HttpStatus.OK);
    }

}
