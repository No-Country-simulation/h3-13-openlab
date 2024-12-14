package OpenLab.services;

import OpenLab.dtos.SellOrderDTO.SellOrderRequestDTO;
import OpenLab.dtos.SellOrderDTO.SellOrderResponseDTO;
import OpenLab.models.SellOrder;

public interface ISellOrderService extends IGenericService<SellOrder, Long>{

    SellOrderResponseDTO saveSellOrder(SellOrderRequestDTO sellOrderRequestDTO);
}
