package OpenLab.services.Impl;

import OpenLab.models.BuyOrder;
import OpenLab.repositorys.IBuyOrderRepository;
import OpenLab.repositorys.IGenericRepository;
import OpenLab.services.IBuyOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BuyOrderServiceImpl extends GenericServiceImpl<BuyOrder, Long> implements IBuyOrderService {

    @Autowired
    private IBuyOrderRepository repo;

    @Override
    protected IGenericRepository<BuyOrder, Long> getRepo() {
        return repo;
    }
}
