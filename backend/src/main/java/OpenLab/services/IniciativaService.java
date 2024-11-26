package OpenLab.services;

import OpenLab.dtos.IiniciativaDTO.IniciativaRequestDTO;
import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.models.Iniciativa;

public interface IniciativaService extends IGenericService<Iniciativa, Long>{
    IniciativaResponseDTO saveIniciativa(IniciativaRequestDTO iniciativa);
}
