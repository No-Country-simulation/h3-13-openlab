package OpenLab.mappers;

import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.models.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    User toEntity(DatosAutenticacionUsuario usuario);

    DatosAutenticacionUsuario toDTO(User usuario);
}
