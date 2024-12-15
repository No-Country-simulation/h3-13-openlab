package OpenLab.services.Impl;

import OpenLab.dtos.SellOrderDTO.SellOrderRequestDTO;
import OpenLab.dtos.SellOrderDTO.SellOrderResponseDTO;
import OpenLab.dtos.SellOrderDTO.SellOrderUpdateDTO;
import OpenLab.mappers.SellOrderMapper;
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

    private final SellOrderMapper sellOrderMapper;

    public SellOrderServiceImpl(SellOrderMapper sellOrderMapper) {
        this.sellOrderMapper = sellOrderMapper;
    }

    @Override
    protected IGenericRepository<SellOrder, Long> getRepo() {
        return repo;
    }

    @Override
    public SellOrderResponseDTO saveSellOrder(SellOrderRequestDTO sellOrderRequestDTO) {
        SellOrder sellOrder = sellOrderMapper.toEntity(sellOrderRequestDTO);
        repo.save(sellOrder);
        SellOrderResponseDTO sellOrderResponseDTO = sellOrderMapper.toResponseDTO(sellOrder);
        return sellOrderResponseDTO;
    }

    @Override
    public SellOrderResponseDTO updateSellOrder(SellOrderUpdateDTO sellOrderUpdateDTO) {
        SellOrder existingSellOrder = repo.findById(sellOrderUpdateDTO.id())
                .orElseThrow(() -> new IllegalArgumentException("Sell Order no encontrado"));
        if (sellOrderUpdateDTO.logo() != null) {
            existingSellOrder.setLogo(sellOrderUpdateDTO.logo());
        }
        if (sellOrderUpdateDTO.name() != null) {
            existingSellOrder.setName(sellOrderUpdateDTO.name());
        }
        if (sellOrderUpdateDTO.tokens() != 0) {
            existingSellOrder.setTokens(sellOrderUpdateDTO.tokens());
        }
        if (sellOrderUpdateDTO.price() != 0.0) {
            existingSellOrder.setPrice(sellOrderUpdateDTO.price());
        }
        repo.save(existingSellOrder);
        SellOrderResponseDTO sellOrder = sellOrderMapper.toResponseDTO(existingSellOrder);
        return sellOrder;
    }
}
