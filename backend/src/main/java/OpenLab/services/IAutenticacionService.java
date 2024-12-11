package OpenLab.services;


import OpenLab.dtos.ClienteDTO.ClienteResponseDTO;
import OpenLab.dtos.TokenDTO.JWTTokenDTO;
import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.dtos.UserDTO.GoogleUserInfoCompleta;

public interface IAutenticacionService {

    ClienteResponseDTO autenticarConGooglePersonalizado(GoogleUserInfoCompleta googleUserInfoCompleta);

}
