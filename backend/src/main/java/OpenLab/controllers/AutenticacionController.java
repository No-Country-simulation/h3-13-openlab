package OpenLab.controllers;

import OpenLab.dtos.TokenDTO.JWTTokenDTO;
import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.dtos.UserDTO.GoogleUserInfoCompleta;
import OpenLab.services.IAutenticacionService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/login")
public class AutenticacionController {

    private final IAutenticacionService autenticacionService;

    public AutenticacionController(IAutenticacionService autenticacionService) {
        this.autenticacionService = autenticacionService;
    }

    @PostMapping
    public ResponseEntity<JWTTokenDTO> autenticar(@RequestBody @Valid DatosAutenticacionUsuario datosAutenticacionUsuario) {
        JWTTokenDTO jwtTokenDTO = autenticacionService.autenticar(datosAutenticacionUsuario);
        return ResponseEntity.ok(jwtTokenDTO);
    }

    @PostMapping("/googlePersonalizado")
    public ResponseEntity<JWTTokenDTO> autenticarConGooglePersonalizado(@RequestBody GoogleUserInfoCompleta googleUserInfoCompleta) {
        JWTTokenDTO jwtTokenDTO = autenticacionService.autenticarConGooglePersonalizado(googleUserInfoCompleta);
        return ResponseEntity.ok(jwtTokenDTO);
    }
}
