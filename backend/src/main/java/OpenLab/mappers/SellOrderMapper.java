package OpenLab.mappers;

import OpenLab.dtos.SellOrderDTO.SellOrderRequestDTO;
import OpenLab.dtos.SellOrderDTO.SellOrderResponseDTO;
import OpenLab.models.SellOrder;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {SellOrderMapper.class})
public interface SellOrderMapper {

    SellOrderMapper INSTANCE = Mappers.getMapper(SellOrderMapper.class);

    SellOrder toEntity(SellOrderRequestDTO sellOrderRequestDTO);

    SellOrderResponseDTO toResponseDTO(SellOrder buyOrder);
}
