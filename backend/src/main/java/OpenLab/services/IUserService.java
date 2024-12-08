package OpenLab.services;

import OpenLab.models.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public interface IUserService extends IGenericService<User, Long>{

    UserDetails loadUserByUsername(String email);

    User findByEmail(String email);
}
