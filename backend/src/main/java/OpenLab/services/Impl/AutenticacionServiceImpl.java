package OpenLab.services.Impl;

import OpenLab.dtos.ClienteDTO.ClienteResponseDTO;
import OpenLab.dtos.UserDTO.GoogleUserInfoCompleta;
import OpenLab.enums.Roles;
import OpenLab.mappers.ClienteMapper;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import OpenLab.repositorys.IClienteRepository;
import OpenLab.repositorys.IUserRepository;
import OpenLab.services.IAutenticacionService;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AutenticacionServiceImpl implements IAutenticacionService {

    private final IUserRepository userRepository;
    private final IClienteRepository clienteRepository;
    private final ClienteMapper clienteMapper;

    public AutenticacionServiceImpl(IUserRepository userRepository, IClienteRepository clienteRepository, ClienteMapper clienteMapper) {
        this.userRepository = userRepository;
        this.clienteRepository = clienteRepository;
        this.clienteMapper = clienteMapper;
    }

//    @Override
//    public String autenticarConGooglePersonalizado(GoogleUserInfoCompleta googleUserInfoCompleta) {
//        if (googleUserInfoCompleta == null) {
//            throw new RuntimeException("No hay datos");
//        }
//        Optional<User> existingUser = userRepository.findByEmail(googleUserInfoCompleta.email());
//        if (existingUser.isPresent()) {
//            return "El usuario con el email ya existe en el sistema";
//        }
//        createNewUserPersonalizado(googleUserInfoCompleta);
//        return "Usuario registrado exitosamente";
//    }

    @Override
    public ClienteResponseDTO autenticarConGooglePersonalizado(GoogleUserInfoCompleta googleUserInfoCompleta) {

        if (googleUserInfoCompleta == null) {
            throw new RuntimeException("No hay datos");
        }
        // Obtiene el cliente existente o lo crea si no existe
        Cliente cliente = clienteRepository.findByUsuarioEmail(googleUserInfoCompleta.email())
                .orElseGet(() -> createNewUserPersonalizado(googleUserInfoCompleta));
        // Mapea el cliente a DTO y lo retorna
        return clienteMapper.toResponseDTO(cliente);
    }

    private Cliente createNewUserPersonalizado(GoogleUserInfoCompleta googleUserInfoCompleta) {
        User user = new User();
        user.setEmail(googleUserInfoCompleta.email());
        user.setPassword("");
//        if(googleUserInfoCompleta.roles().contains("Cliente")) {
//            user.setRol(Roles.CLIENTE);
//        } else {
//            user.setRol(Roles.ADMIN);
//        }
        user.setRol(Roles.CLIENTE);
        User savedUser = userRepository.save(user);

        Cliente cliente = new Cliente();
        cliente.setUsuario(savedUser);
        cliente.setNombre(googleUserInfoCompleta.given_name());
        cliente.setApellido(googleUserInfoCompleta.family_name());
        cliente.setNombreCompleto(googleUserInfoCompleta.name());
        cliente.setPicture(googleUserInfoCompleta.picture());
        clienteRepository.save(cliente);

        return cliente;
    }
}
