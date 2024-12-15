package OpenLab.mappers;

import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.dtos.UserDTO.UserDTO;
import OpenLab.enums.Roles;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-15T01:50:17-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public User toEntity(DatosAutenticacionUsuario usuario) {
        if ( usuario == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( usuario.getEmail() );
        user.setPassword( usuario.getPassword() );

        return user;
    }

    @Override
    public UserDTO toResponseDTO(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }

        String email = null;
        Roles rol = null;

        UserDTO userDTO = new UserDTO( email, rol );

        return userDTO;
    }

    @Override
    public DatosAutenticacionUsuario toDTO(User usuario) {
        if ( usuario == null ) {
            return null;
        }

        String email = null;
        String password = null;

        email = usuario.getEmail();
        password = usuario.getPassword();

        DatosAutenticacionUsuario datosAutenticacionUsuario = new DatosAutenticacionUsuario( email, password );

        return datosAutenticacionUsuario;
    }
}
