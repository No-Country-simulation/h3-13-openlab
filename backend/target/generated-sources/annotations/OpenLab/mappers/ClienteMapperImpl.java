package OpenLab.mappers;

import OpenLab.dtos.ClienteDTO.ClienteRequestDTO;
import OpenLab.dtos.ClienteDTO.ClienteResponseDTO;
import OpenLab.dtos.ClienteDTO.ClienteUpdateDTO;
import OpenLab.dtos.UserDTO.UserDTO;
import OpenLab.enums.Roles;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-13T22:22:19-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class ClienteMapperImpl implements ClienteMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Cliente toEntity(ClienteRequestDTO clienteRequestDTO) {
        if ( clienteRequestDTO == null ) {
            return null;
        }

        Cliente cliente = new Cliente();

        cliente.setUsuario( userMapper.toEntity( clienteRequestDTO.usuario() ) );
        cliente.setNombre( clienteRequestDTO.nombre() );
        cliente.setApellido( clienteRequestDTO.apellido() );

        return cliente;
    }

    @Override
    public Cliente toEntity(ClienteUpdateDTO clienteUpdateDTO) {
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

        Long id = null;
        String nombre = null;
        String apellido = null;
        String picture = null;
        String nombreCompleto = null;
        UserDTO usuario = null;

        id = cliente.getId();
        nombre = cliente.getNombre();
        apellido = cliente.getApellido();
        picture = cliente.getPicture();
        nombreCompleto = cliente.getNombreCompleto();
        usuario = userToUserDTO( cliente.getUsuario() );

        ClienteResponseDTO clienteResponseDTO = new ClienteResponseDTO( id, nombre, apellido, picture, nombreCompleto, usuario );

        return clienteResponseDTO;
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
}
