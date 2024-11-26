package OpenLab.controllers;

import OpenLab.dtos.SocialsDTO.SocialsRequestDTO;
import OpenLab.models.Socials;
import OpenLab.services.ISocialService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
