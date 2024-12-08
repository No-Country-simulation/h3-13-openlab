package OpenLab.services.Impl;

import OpenLab.models.SellOrder;
import OpenLab.repositorys.IGenericRepository;
import OpenLab.repositorys.ISellOrderRepository;
import OpenLab.services.ISellOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SellOrderServiceImpl extends GenericServiceImpl<SellOrder, Long> implements ISellOrderService {

    @Autowired
    private ISellOrderRepository repo;

    @Override
    protected IGenericRepository<SellOrder, Long> getRepo() {
        return repo;
    }
}
