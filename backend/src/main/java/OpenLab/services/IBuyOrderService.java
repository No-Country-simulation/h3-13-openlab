package OpenLab.services;

import OpenLab.dtos.BuyOrderDTO.BuyOrderRequestDTO;
import OpenLab.dtos.BuyOrderDTO.BuyOrderResponseDTO;
import OpenLab.models.BuyOrder;

public interface IBuyOrderService extends IGenericService<BuyOrder, Long>{

    BuyOrderResponseDTO saveBuyOrder(BuyOrderRequestDTO buyOrderRequestDTO);
}
