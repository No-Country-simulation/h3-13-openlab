package OpenLab.mappers;

import OpenLab.dtos.ClienteDTO.ClienteRequestDTO;
import OpenLab.dtos.ClienteDTO.ClienteResponseDTO;
import OpenLab.dtos.ClienteDTO.ClienteUpdateDTO;
import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.dtos.UserDTO.UserDTO;
import OpenLab.enums.Roles;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-09T18:56:21-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22 (Oracle Corporation)"
)
@Component
public class ClienteMapperImpl extends ClienteMapper {

    @Override
    Cliente toEntity(ClienteRequestDTO clienteRequestDTO) {
        if ( clienteRequestDTO == null ) {
            return null;
        }

        Cliente cliente = new Cliente();

        cliente.setUsuario( datosAutenticacionUsuarioToUser( clienteRequestDTO.usuario() ) );
        cliente.setNombre( clienteRequestDTO.nombre() );
        cliente.setApellido( clienteRequestDTO.apellido() );

        return cliente;
    }

    @Override
    Cliente toEntity(ClienteUpdateDTO clienteUpdateDTO) {
        if ( clienteUpdateDTO == null ) {
            return null;
        }

        Cliente cliente = new Cliente();

        cliente.setId( clienteUpdateDTO.id() );
        cliente.setNombre( clienteUpdateDTO.nombre() );
        cliente.setApellido( clienteUpdateDTO.apellido() );

        return cliente;
    }

    @Override
    public ClienteResponseDTO toResponseDTO(Cliente cliente) {
        if ( cliente == null ) {
            return null;
        }

        List<Long> idIniciativas = null;
        Long id = null;
        String nombre = null;
        String apellido = null;
        String picture = null;
        String nombreCompleto = null;
        UserDTO usuario = null;

        idIniciativas = toIdIniciativas( cliente.getIniciativa() );
        id = cliente.getId();
        nombre = cliente.getNombre();
        apellido = cliente.getApellido();
        picture = cliente.getPicture();
        nombreCompleto = cliente.getNombreCompleto();
        usuario = userToUserDTO( cliente.getUsuario() );

        ClienteResponseDTO clienteResponseDTO = new ClienteResponseDTO( id, nombre, apellido, picture, nombreCompleto, usuario, idIniciativas );

        return clienteResponseDTO;
    }

    @Override
    Cliente toEntity(ClienteResponseDTO clienteResponseDTO) {
        if ( clienteResponseDTO == null ) {
            return null;
        }

        Cliente cliente = new Cliente();

        cliente.setIniciativa( toIniciativas( clienteResponseDTO.idIniciativas() ) );
        cliente.setId( clienteResponseDTO.id() );
        cliente.setNombre( clienteResponseDTO.nombre() );
        cliente.setApellido( clienteResponseDTO.apellido() );
        cliente.setNombreCompleto( clienteResponseDTO.nombreCompleto() );
        cliente.setPicture( clienteResponseDTO.picture() );
        cliente.setUsuario( userDTOToUser( clienteResponseDTO.usuario() ) );

        return cliente;
    }

    protected User datosAutenticacionUsuarioToUser(DatosAutenticacionUsuario datosAutenticacionUsuario) {
        if ( datosAutenticacionUsuario == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( datosAutenticacionUsuario.getEmail() );
        user.setPassword( datosAutenticacionUsuario.getPassword() );

        return user;
    }

    protected UserDTO userToUserDTO(User user) {
        if ( user == null ) {
            return null;
        }

        String email = null;
        Roles rol = null;

        email = user.getEmail();
        rol = user.getRol();

        UserDTO userDTO = new UserDTO( email, rol );

        return userDTO;
    }

    protected User userDTOToUser(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setEmail( userDTO.email() );
        user.setRol( userDTO.rol() );

        return user;
    }
}
