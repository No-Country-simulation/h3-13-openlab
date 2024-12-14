package OpenLab.services.Impl;

import OpenLab.dtos.BuyOrderDTO.BuyOrderRequestDTO;
import OpenLab.dtos.BuyOrderDTO.BuyOrderResponseDTO;
import OpenLab.mappers.BuyOrderMapper;
import OpenLab.models.BuyOrder;
import OpenLab.repositorys.IBuyOrderRepository;
import OpenLab.repositorys.IGenericRepository;
import OpenLab.services.IBuyOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class BuyOrderServiceImpl extends GenericServiceImpl<BuyOrder, Long> implements IBuyOrderService {

    @Autowired
    private IBuyOrderRepository repo;

    private final BuyOrderMapper buyOrderMapper;

    public BuyOrderServiceImpl(BuyOrderMapper buyOrderMapper) {
        this.buyOrderMapper = buyOrderMapper;
    }

    @Override
    protected IGenericRepository<BuyOrder, Long> getRepo() {
        return repo;
    }

    @Override
    public BuyOrderResponseDTO saveBuyOrder(BuyOrderRequestDTO buyOrderRequestDTO) {
        BuyOrder buyOrder = buyOrderMapper.toEntity(buyOrderRequestDTO);
        repo.save(buyOrder);
        BuyOrderResponseDTO buyOrderResponseDTO = buyOrderMapper.toResponseDTO(buyOrder);
        return buyOrderResponseDTO;
    }
}
