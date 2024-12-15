package OpenLab.mappers;

import OpenLab.dtos.SellOrderDTO.SellOrderRequestDTO;
import OpenLab.dtos.SellOrderDTO.SellOrderResponseDTO;
import OpenLab.models.SellOrder;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-15T01:50:17-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class SellOrderMapperImpl implements SellOrderMapper {

    @Override
    public SellOrder toEntity(SellOrderRequestDTO sellOrderRequestDTO) {
        if ( sellOrderRequestDTO == null ) {
            return null;
        }

        SellOrder sellOrder = new SellOrder();

        sellOrder.setLogo( sellOrderRequestDTO.logo() );
        sellOrder.setName( sellOrderRequestDTO.name() );
        sellOrder.setTokens( sellOrderRequestDTO.tokens() );
        sellOrder.setPrice( sellOrderRequestDTO.price() );

        return sellOrder;
    }

    @Override
    public SellOrderResponseDTO toResponseDTO(SellOrder buyOrder) {
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

        SellOrderResponseDTO sellOrderResponseDTO = new SellOrderResponseDTO( id, logo, name, tokens, price );

        return sellOrderResponseDTO;
    }
}
