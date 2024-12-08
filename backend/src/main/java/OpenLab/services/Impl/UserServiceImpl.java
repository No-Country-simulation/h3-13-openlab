package OpenLab.services.Impl;

import OpenLab.models.User;
import OpenLab.repositorys.IGenericRepository;
import OpenLab.repositorys.IUserRepository;
import OpenLab.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends GenericServiceImpl<User, Long> implements IUserService, UserDetailsService {

    @Autowired
    private IUserRepository repo;

    @Override
    protected IGenericRepository<User, Long> getRepo() {
        return repo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) {
        return repo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Override
    public User findByEmail(String email) {
     return   repo.findByEmail(email)
             .orElse(null);
    }
}
