package OpenLab.services;

import OpenLab.dtos.IiniciativaDTO.IniciativaRequestDTO;
import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.models.Iniciativa;

import java.util.List;

public interface IniciativaService extends IGenericService<Iniciativa, Long>{
    IniciativaResponseDTO saveIniciativa(IniciativaRequestDTO iniciativa);

    List<IniciativaResponseDTO> getUserIniciativas(Long id);

    List<IniciativaResponseDTO> searchIniciativasByNombre(String prefix);

}
