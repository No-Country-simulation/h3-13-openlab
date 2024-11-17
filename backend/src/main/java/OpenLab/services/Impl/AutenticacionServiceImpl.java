package OpenLab.services.Impl;

import OpenLab.dtos.TokenDTO.JWTTokenDTO;
import OpenLab.dtos.UserDTO.DatosAutenticacionUsuario;
import OpenLab.dtos.UserDTO.GoogleUserInfoCompleta;
import OpenLab.enums.Roles;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import OpenLab.repositorys.IClienteRepository;
import OpenLab.repositorys.IUserRepository;
import OpenLab.services.IAutenticacionService;
import OpenLab.services.ITokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class AutenticacionServiceImpl implements IAutenticacionService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IClienteRepository clienteRepository;

    private final AuthenticationManager authenticationManager;
    private final ITokenService tokenService;

    public AutenticacionServiceImpl(AuthenticationManager authenticationManager, ITokenService tokenService) {
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    @Override
    public JWTTokenDTO autenticar(DatosAutenticacionUsuario datosAutenticacionUsuario) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(datosAutenticacionUsuario.getEmail(), datosAutenticacionUsuario.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        User user = (User) authentication.getPrincipal();
        String token = tokenService.generateToken(user);
        return new JWTTokenDTO(token);
    }


    @Override
    public JWTTokenDTO autenticarConGooglePersonalizado(GoogleUserInfoCompleta googleUserInfoCompleta) {

        if (googleUserInfoCompleta == null) {
            throw new RuntimeException("No hay datos");
        }

        User user = userRepository.findByEmail(googleUserInfoCompleta.email())
                .orElseGet(() -> createNewUserPersonalizado(googleUserInfoCompleta));

        String jwt = tokenService.generateToken(user);
        return new JWTTokenDTO(jwt);
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
        clienteRepository.save((cliente));

        return savedUser;
    }
}
