package OpenLab.mappers;

import OpenLab.dtos.BuyOrderDTO.BuyOrderRequestDTO;
import OpenLab.dtos.BuyOrderDTO.BuyOrderResponseDTO;
import OpenLab.models.BuyOrder;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {BuyOrderMapper.class})
public interface BuyOrderMapper {

    BuyOrderMapper INSTANCE = Mappers.getMapper(BuyOrderMapper.class);

    BuyOrder toEntity(BuyOrderRequestDTO buyOrderRequestDTO);

    BuyOrderResponseDTO toResponseDTO(BuyOrder buyOrder);
}
