package OpenLab.services;

import java.util.List;
import java.util.Optional;

public interface IGenericService<T, ID> {
    T save(T t);
    T update(T t);
    Optional<T> findById(ID id);
    List<T> findAll();
    void delete(ID id);
}