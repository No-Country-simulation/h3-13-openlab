package OpenLab.mappers;

import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.dtos.UserDTO.UserDTO;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import OpenLab.models.UserInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toEntity(DatosAutenticacionUsuario usuario);

    UserDTO toResponseDTO(Cliente cliente);

    @Mapping(target = "auth0Id", source = "sub")
    @Mapping(target = "email", source = "email")
    @Mapping(target = "name", source = "name")
    User toEntitySave(UserInfo userinfo);

    DatosAutenticacionUsuario toDTO(User usuario);
}
