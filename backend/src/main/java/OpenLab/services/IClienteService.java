package OpenLab.services;


import OpenLab.models.Cliente;

import java.util.Optional;

public interface IClienteService extends IGenericService<Cliente, Long>{
    Optional<Cliente> findByEmail(String correo);
}
