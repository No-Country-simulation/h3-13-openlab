package OpenLab.controllers;

import OpenLab.dtos.ApiResponseDTO;
import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.dtos.SocialsDTO.SocialsRequestDTO;
import OpenLab.models.Socials;
import OpenLab.services.ISocialService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/social")
public class SocialController {

    private final ISocialService socialService;

    public SocialController(ISocialService socialService) {
        this.socialService = socialService;
    }

    @PostMapping("/socials")
    @Operation(summary = "Se manejan los likes, shares y joins")
    public ResponseEntity<?> saveSocials(@RequestBody SocialsRequestDTO socialsRequestDTO) {
        socialService.saveSocials(socialsRequestDTO);
        return ResponseEntity.status(HttpStatus.OK).body("Socials Guardado");
    }

    @GetMapping("/getUserLikes/{id}")
    @Operation(summary = "Se devuelven las iniciativas al que el usuario dio Likes")
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getUserLikes(@PathVariable @Valid Long id) {
        List<IniciativaResponseDTO> socialsLiked = socialService.getUserLikes(id);
        String message = "Iniciativas Encontradas";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, socialsLiked), HttpStatus.OK);
    }

    @GetMapping("/getUserJoins/{id}")
    @Operation(summary = "Se devuelven las iniciativas al que el usuario se unio")
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getUserJoins(@PathVariable @Valid Long id) {
        List<IniciativaResponseDTO> socialsJoined = socialService.getUserJoins(id);
        String message = "Iniciativas Encontradas";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, socialsJoined), HttpStatus.OK);
    }

    @GetMapping("/getUserShares/{id}")
    @Operation(summary = "Se devuelven las iniciativas que el usuario compartio")
    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getUserShares(@PathVariable @Valid Long id) {
        List<IniciativaResponseDTO> socialsShares = socialService.getUserJoins(id);
        String message = "Iniciativas Encontradas";
        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, socialsShares), HttpStatus.OK);
    }
}
