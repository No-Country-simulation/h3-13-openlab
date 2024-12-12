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
import java.util.Optional;

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
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getAll() {;
        List<Iniciativa> iniciativas = iniciativaService.findAll();
        List<IniciativaResponseDTO> iniciativasResponseDTO = iniciativaMapper.toListResponseDTO(iniciativas);
        String message = "Iniciativas Encontradas";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, iniciativasResponseDTO), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtiene una iniciativa en particular")
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> findById(@PathVariable("id") Long id) {
        Optional<Iniciativa> iniciativa = iniciativaService.findById(id);
        if (iniciativa.isPresent()) {
            IniciativaResponseDTO iniciativaResponseDTO = iniciativaMapper.toResponseDTO(iniciativa.get());
            String message = "Iniciativa encontrado";
            return new ResponseEntity<>(new ApiResponseDTO<>(true, message, iniciativaResponseDTO), HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(new ApiResponseDTO<>(false, "Iniciativa no encontrada", null), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/getUserIniciativas/{id}")
    @Operation(summary = "Se devuelven las iniciativas del usuario")
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getUserIniciativas(@PathVariable @Valid Long id) {
        List<IniciativaResponseDTO> iniciativas = iniciativaService.getUserIniciativas(id);
        String message = "Iniciativas Encontradas";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, iniciativas), HttpStatus.OK);
    }

//    @GetMapping("/search")
//    @Operation(summary = "Busca iniciativas dinámicamente por nombre")
//    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> searchIniciativas(@RequestParam String query) {
//        List<IniciativaResponseDTO> iniciativas = iniciativaService.searchIniciativasByNombre(query);
//        String message = iniciativas.isEmpty() ? "No se encontraron iniciativas" : "Iniciativas encontradas";
//        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, iniciativas), HttpStatus.OK);
//    }

//
//    @PutMapping("/like")
//    public ResponseEntity<?> saveLike(@RequestBody LikesRequestDTO likesRequestDTO) {
//        iniciativaService.saveLike(likesRequestDTO);
//        return ResponseEntity.status(HttpStatus.OK).body("Like Guardado");
//    }
//
//    @PutMapping("/share")
//    public ResponseEntity<?> saveShare(@RequestBody SharesRequestDTO sharesRequestDTO) {
//        iniciativaService.saveShare(sharesRequestDTO);
//        return ResponseEntity.status(HttpStatus.OK).body("Share Guardado");
//    }
//
//    @PutMapping("/join")
//    public ResponseEntity<?> saveJoin(@RequestBody JoinedRequestDTO joinedRequestDTO) {
//        iniciativaService.saveJoin(joinedRequestDTO);
//        return ResponseEntity.status(HttpStatus.OK).body("Join Guardado");
//    }

}