package OpenLab.services.Impl;

import OpenLab.enums.Roles;
import OpenLab.exceptions.ApplicationException;
import OpenLab.models.Admin;
import OpenLab.models.Cliente;
import OpenLab.models.User;
import OpenLab.repositorys.*;
import OpenLab.services.IAdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminServiceImpl extends GenericServiceImpl<Admin, Long> implements IAdminService {

    @Autowired
    private IAdminRepository repo;

    private final IUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AdminServiceImpl(IUserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected IGenericRepository<Admin, Long> getRepo() {
        return repo;
    }

    @Override
    public Admin save(Admin admin) {
        try {
            if (userRepo.existsByEmail(admin.getUsuario().getUsername())) {
                throw new ApplicationException("Admin ya existente: " + admin.getUsuario().getUsername());
            }
            String encodedPassword = passwordEncoder.encode(admin.getUsuario().getPassword());
            admin.getUsuario().setPassword(encodedPassword);
            admin.getUsuario().setRol(Roles.ADMIN);
            User savedUser = userRepo.save(admin.getUsuario());
            admin.setUsuario(savedUser);
            return repo.save(admin);
        } catch (ApplicationException e) {
            throw new ApplicationException("Error al guardar el admin: " + e.getMessage());
        }
    }

    @Override
    public Admin update(Admin admin) {
        Optional<Admin> existingEntityOpt = repo.findById(admin.getId());
        if (existingEntityOpt.isPresent()) {
            Admin existingEntity = existingEntityOpt.get();
            existingEntity.setNombre(admin.getNombre());
            existingEntity.setApellido(admin.getApellido());
            existingEntity.setUsuario(existingEntity.getUsuario());
            return repo.save(existingEntity);
        } else {
            throw new ApplicationException("La entidad con ese ID no fue encontrado");
        }
    }
}
