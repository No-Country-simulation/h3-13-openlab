package OpenLab.mappers;

import OpenLab.dtos.ClienteDTO.ClienteRequestDTO;
import OpenLab.dtos.ClienteDTO.ClienteResponseDTO;
import OpenLab.dtos.ClienteDTO.ClienteUpdateDTO;
import OpenLab.models.Cliente;
import OpenLab.models.Iniciativa;
import OpenLab.repositorys.IClienteRepository;
import OpenLab.repositorys.IniciativaRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Collections;
import java.util.List;

@Mapper(componentModel = "spring")//, uses = {UserMapper.class, IniciativaRepository.class})
public abstract class ClienteMapper {

@Autowired
    private IniciativaRepository iniciativaRepository;


    @Mapping(source = "usuario", target = "usuario")
    abstract Cliente toEntity(ClienteRequestDTO clienteRequestDTO);

    abstract Cliente toEntity(ClienteUpdateDTO clienteUpdateDTO);


    @Mapping(source="iniciativa", target = "idIniciativas", qualifiedByName = "toIdIniciativas")
    public abstract ClienteResponseDTO toResponseDTO(Cliente cliente);

    @Mapping(source = "idIniciativas", target = "iniciativa", qualifiedByName = "toIniciativas")
    abstract  Cliente toEntity(ClienteResponseDTO clienteResponseDTO);


    @Named("toIdIniciativas")
     List<Long> toIdIniciativas(List<Iniciativa> iniciativas) {
        return iniciativas.stream().map(Iniciativa::getId).toList();
    }

@Named("toIniciativas")
    List<Iniciativa> toIniciativas(List<Long> idIniciativas){
    if (idIniciativas == null || idIniciativas.isEmpty()) {
        return Collections.emptyList(); // Retorna una lista vacía si no hay IDs
    }
    return iniciativaRepository.findAllById(idIniciativas);
}


}
