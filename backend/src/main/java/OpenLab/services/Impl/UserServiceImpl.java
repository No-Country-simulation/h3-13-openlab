package OpenLab.services.Impl;

import OpenLab.models.User;
import OpenLab.repositorys.IGenericRepository;
import OpenLab.repositorys.IUserRepository;
import OpenLab.services.IUserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, Long> implements IUserService {

    private IUserRepository repo;

    @Override
    protected IGenericRepository<User, Long> getRepo() {
        return repo;
    }

}
