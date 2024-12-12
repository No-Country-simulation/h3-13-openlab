package OpenLab.controllers;

import OpenLab.dtos.SocialsDTO.SocialsRequestDTO;
import OpenLab.services.ISocialService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/social")
public class SocialController {

    private final ISocialService socialService;

    public SocialController(ISocialService socialService) {
        this.socialService = socialService;
    }

    @PostMapping("/socials")
    @Operation(summary = "Se manejan los likes, shares y joins")
    public ResponseEntity<String> saveSocials(@RequestBody SocialsRequestDTO socialsRequestDTO) {
        socialService.saveSocials(socialsRequestDTO);
        return ResponseEntity.ok("Acción social guardada exitosamente.");
    }

//    @GetMapping("/getUserLikes/{id}")
//    @Operation(summary = "Se devuelven las iniciativas al que el usuario dio Likes")
//    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getUserLikes(@PathVariable @Valid Long id) {
//        List<IniciativaResponseDTO> socialsLiked = socialService.getUserLikes(id);
//        String message = "Iniciativas Encontradas";
//        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, socialsLiked), HttpStatus.OK);
//    }
//
//    @GetMapping("/getUserJoins/{id}")
//    @Operation(summary = "Se devuelven las iniciativas al que el usuario se unio")
//    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getUserJoins(@PathVariable @Valid Long id) {
//        List<IniciativaResponseDTO> socialsJoined = socialService.getUserJoins(id);
//        String message = "Iniciativas Encontradas";
//        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, socialsJoined), HttpStatus.OK);
//    }
//
//    @GetMapping("/getUserShares/{id}")
//    @Operation(summary = "Se devuelven las iniciativas que el usuario compartio")
//    public ResponseEntity<ApiResponseDTO<IniciativaResponseDTO>> getUserShares(@PathVariable @Valid Long id) {
//        List<IniciativaResponseDTO> socialsShares = socialService.getUserShares(id);
//        String message = "Iniciativas Encontradas";
//        return new ResponseEntity<>(new ApiResponseDTO<>(true, message, socialsShares), HttpStatus.OK);
//    }

}
