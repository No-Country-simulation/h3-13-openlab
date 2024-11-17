package OpenLab.services.Impl;

import OpenLab.repositorys.IGenericRepository;
import OpenLab.services.IGenericService;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

public abstract class GenericServiceImpl<T, ID> implements IGenericService<T, ID> {

    protected abstract IGenericRepository<T, ID> getRepo();

    @Transactional
    @Override
    public T save(T t) {return getRepo().save(t);}

    @Transactional
    @Override
    public T update(T t) {return getRepo().save(t);}

    @Override
    public Optional<T> findById(ID id) {return getRepo().findById(id);}

    @Override
    public List<T> findAll() {return getRepo().findAll();}

    @Transactional
    @Override
    public void delete(ID id) {getRepo().deleteById(id);}
}
