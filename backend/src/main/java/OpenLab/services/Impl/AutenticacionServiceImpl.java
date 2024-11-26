package OpenLab.services.Impl;

import OpenLab.dtos.UserDTO.GoogleUserInfoCompleta;
import OpenLab.enums.Roles;
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

    public AutenticacionServiceImpl(IUserRepository userRepository, IClienteRepository clienteRepository) {
        this.userRepository = userRepository;
        this.clienteRepository = clienteRepository;
    }

    @Override
    public String autenticarConGooglePersonalizado(GoogleUserInfoCompleta googleUserInfoCompleta) {
        if (googleUserInfoCompleta == null) {
            throw new RuntimeException("No hay datos");
        }
        Optional<User> existingUser = userRepository.findByEmail(googleUserInfoCompleta.email());
        if (existingUser.isPresent()) {
            return "El usuario con el email ya existe en el sistema";
        }
        createNewUserPersonalizado(googleUserInfoCompleta);
        return "Usuario registrado exitosamente";
    }

    private User createNewUserPersonalizado(GoogleUserInfoCompleta googleUserInfoCompleta) {
        User user = new User();
        user.setEmail(googleUserInfoCompleta.email());
        user.setPassword("");
        user.setRol(Roles.CLIENTE);

        User savedUser = userRepository.save(user);

        Cliente cliente = new Cliente();
        cliente.setUsuario(savedUser);
        cliente.setNombre(googleUserInfoCompleta.given_name());
        cliente.setApellido(googleUserInfoCompleta.family_name());
        cliente.setPicture(googleUserInfoCompleta.picture());
        clienteRepository.save(cliente);

        return savedUser;
    }
}
