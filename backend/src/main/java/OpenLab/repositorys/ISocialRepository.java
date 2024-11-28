package OpenLab.repositorys;

import OpenLab.models.Socials;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ISocialRepository extends IGenericRepository<Socials, Long>{
    Optional<Socials> findByClienteIdAndIniciativaId(Long clienteId, Long iniciativaId);

    @Query("SELECT s FROM Socials s WHERE s.cliente.id = :clienteId AND s.is_liked = true")
    List<Socials> findLikesByClienteId(Long clienteId);

    @Query("SELECT s FROM Socials s WHERE s.cliente.id = :clienteId AND s.is_joined = true")
    List<Socials> findJoinsByClienteId(Long clienteId);

    @Query("SELECT s FROM Socials s WHERE s.cliente.id = :clienteId AND s.is_shared = true")
    List<Socials> findSharesByClienteId(Long clienteId);
}
