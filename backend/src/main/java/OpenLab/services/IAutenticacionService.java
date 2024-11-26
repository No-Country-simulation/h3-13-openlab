package OpenLab.services;


import OpenLab.dtos.TokenDTO.JWTTokenDTO;
import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.dtos.UserDTO.GoogleUserInfoCompleta;

public interface IAutenticacionService {

    String autenticarConGooglePersonalizado(GoogleUserInfoCompleta googleUserInfoCompleta);

}
