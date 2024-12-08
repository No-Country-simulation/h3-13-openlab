package OpenLab.services;

import OpenLab.dtos.EstadisticasDTO.EstadisticasResponseDTO;
import OpenLab.models.Estadisticas;

public interface IEstadisticasService extends IGenericService<Estadisticas, Long> {
    EstadisticasResponseDTO calcularEstadisticas(Long id);
}
