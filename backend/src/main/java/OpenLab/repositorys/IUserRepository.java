package OpenLab.repositorys;

import OpenLab.models.User;

import java.util.Optional;

public interface IUserRepository extends IGenericRepository<User, Long>{

    boolean existsByEmail(String email);

    Optional<User> findByEmail(String email);
}
