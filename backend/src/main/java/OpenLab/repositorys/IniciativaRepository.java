package OpenLab.repositorys;

import OpenLab.models.Iniciativa;

import java.util.List;
import java.util.Optional;

public interface IniciativaRepository extends IGenericRepository<Iniciativa, Long>{
    List<Iniciativa> findByClienteId(Long id);

    List<Iniciativa> findByNombreStartingWithIgnoreCase(String prefix);
}
