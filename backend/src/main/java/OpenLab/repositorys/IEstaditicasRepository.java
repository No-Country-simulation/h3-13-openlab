package OpenLab.repositorys;

import OpenLab.models.Estadisticas;

import java.util.Optional;

public interface IEstaditicasRepository extends IGenericRepository<Estadisticas, Long>{
    Optional<Estadisticas> findByClienteId(Long clienteId);
}
