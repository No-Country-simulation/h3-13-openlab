package OpenLab.mappers;

import OpenLab.dtos.BuyOrderDTO.BuyOrderRequestDTO;
import OpenLab.dtos.BuyOrderDTO.BuyOrderResponseDTO;
import OpenLab.models.BuyOrder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-15T00:15:55-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class BuyOrderMapperImpl implements BuyOrderMapper {

    @Override
    public BuyOrder toEntity(BuyOrderRequestDTO buyOrderRequestDTO) {
        if ( buyOrderRequestDTO == null ) {
            return null;
        }

        BuyOrder buyOrder = new BuyOrder();

        buyOrder.setLogo( buyOrderRequestDTO.logo() );
        buyOrder.setName( buyOrderRequestDTO.name() );
        buyOrder.setTokens( buyOrderRequestDTO.tokens() );
        buyOrder.setPrice( buyOrderRequestDTO.price() );

        return buyOrder;
    }

    @Override
    public BuyOrderResponseDTO toResponseDTO(BuyOrder buyOrder) {
        if ( buyOrder == null ) {
            return null;
        }

        Long id = null;
        String logo = null;
        String name = null;
        int tokens = 0;
        double price = 0.0d;

        id = buyOrder.getId();
        logo = buyOrder.getLogo();
        name = buyOrder.getName();
        tokens = buyOrder.getTokens();
        price = buyOrder.getPrice();

        BuyOrderResponseDTO buyOrderResponseDTO = new BuyOrderResponseDTO( id, logo, name, tokens, price );

        return buyOrderResponseDTO;
    }
}
