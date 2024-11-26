package OpenLab.repositorys;

import OpenLab.models.Cliente;

import java.util.Optional;

public interface IClienteRepository extends IGenericRepository<Cliente, Long>{
    Optional<Cliente> findByUsuarioEmail(String email);
}
