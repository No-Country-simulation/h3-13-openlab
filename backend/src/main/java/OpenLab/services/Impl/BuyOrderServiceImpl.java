package OpenLab.services.Impl;

import OpenLab.dtos.BuyOrderDTO.*;
import OpenLab.mappers.BuyOrderMapper;
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

    public BuyOrderResponseDTO updateBuyOrder(BuyOrderUpdateDTO buyOrderUpdateDTO) {
        BuyOrder existingBuyOrder = repo.findById(buyOrderUpdateDTO.id())
                .orElseThrow(() -> new IllegalArgumentException("Buy Order no encontrado"));
        if (buyOrderUpdateDTO.logo() != null) {
            existingBuyOrder.setLogo(buyOrderUpdateDTO.logo());
        }
        if (buyOrderUpdateDTO.name() != null) {
            existingBuyOrder.setName(buyOrderUpdateDTO.name());
        }
        if (buyOrderUpdateDTO.tokens() != 0) {
            existingBuyOrder.setTokens(buyOrderUpdateDTO.tokens());
        }
        if (buyOrderUpdateDTO.price() != 0.0) {
            existingBuyOrder.setPrice(buyOrderUpdateDTO.price());
        }
        repo.save(existingBuyOrder);
        BuyOrderResponseDTO buyOrder = buyOrderMapper.toResponseDTO(existingBuyOrder);
        return buyOrder;
    }
}
