package OpenLab.services;

import OpenLab.models.User;
import org.springframework.stereotype.Service;

@Service
public interface IUserService extends IGenericService<User, Long>{
}
