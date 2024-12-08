package OpenLab.mappers;

import OpenLab.dtos.EstadisticasDTO.EstadisticasResponseDTO;
import OpenLab.models.Estadisticas;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {EstadisticasMapper.class})
public interface EstadisticasMapper {

    EstadisticasMapper INSTANCE = Mappers.getMapper(EstadisticasMapper.class);

    EstadisticasResponseDTO toResponseDTO(Estadisticas estadisticas);
}
