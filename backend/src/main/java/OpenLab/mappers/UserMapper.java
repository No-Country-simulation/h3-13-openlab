package OpenLab.mappers;

import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.dtos.UserDTO.UserDTO;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toEntity(DatosAutenticacionUsuario usuario);

    UserDTO toResponseDTO(Cliente cliente);

    DatosAutenticacionUsuario toDTO(User usuario);
}
