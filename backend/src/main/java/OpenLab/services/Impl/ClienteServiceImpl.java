package OpenLab.services.Impl;

import OpenLab.dtos.ClienteDTO.ClienteUpdateDTO;
import OpenLab.enums.Roles;
import OpenLab.exceptions.ApplicationException;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import OpenLab.repositorys.*;
import OpenLab.services.IClienteService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteServiceImpl extends GenericServiceImpl<Cliente, Long> implements IClienteService {

    @Autowired
    private IClienteRepository repo;

    private final IUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ClienteServiceImpl(IUserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected IGenericRepository<Cliente, Long> getRepo() {
        return repo;
    }

    @Override
    public Cliente save(Cliente cliente) {
        try {
            if (userRepo.existsByEmail(cliente.getUsuario().getUsername())) {
                throw new ApplicationException("Usuario ya existente: " + cliente.getUsuario().getUsername());
            }
            String encodedPassword = passwordEncoder.encode(cliente.getUsuario().getPassword());
            cliente.getUsuario().setPassword(encodedPassword);
            cliente.getUsuario().setRol(Roles.CLIENTE);
            User savedUser = userRepo.save(cliente.getUsuario());
            cliente.setUsuario(savedUser);
            return repo.save(cliente);
        } catch (ApplicationException e) {
            throw new ApplicationException("Error al guardar el usuario: " + e.getMessage());
        }
    }

    @Override
    public Cliente update(Cliente cliente) {
        Optional<Cliente> existingEntityOpt = repo.findById(cliente.getId());
        if (existingEntityOpt.isPresent()) {
            Cliente existingEntity = existingEntityOpt.get();
            existingEntity.setNombre(cliente.getNombre());
            existingEntity.setApellido(cliente.getApellido());
            existingEntity.setUsuario(existingEntity.getUsuario());
            return repo.save(existingEntity);
        } else {
            throw new ApplicationException("La entidad con ese ID no fue encontrado");
        }
    }
}
