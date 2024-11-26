package OpenLab.repositorys;

import OpenLab.models.Socials;

import java.util.Optional;

public interface ISocialRepository extends IGenericRepository<Socials, Long>{
    Optional<Socials> findByClienteIdAndIniciativaId(Long clienteId, Long iniciativaId);
}
