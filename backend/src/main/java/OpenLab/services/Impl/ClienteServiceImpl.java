package OpenLab.services.Impl;

import OpenLab.exceptions.ApplicationException;
import OpenLab.models.Cliente;
import OpenLab.repositorys.*;
import OpenLab.services.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteServiceImpl extends GenericServiceImpl<Cliente, Long> implements IClienteService {

    @Autowired
    private IClienteRepository repo;

    private final IUserRepository userRepo;

    @Autowired
    public ClienteServiceImpl(IUserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    protected IGenericRepository<Cliente, Long> getRepo() {
        return repo;
    }


    @Override
    public Optional<Cliente> findByEmail(String correo) {
        Optional<Cliente> existingEntityOpt = repo.findByUsuarioEmail(correo);
        return existingEntityOpt;
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
