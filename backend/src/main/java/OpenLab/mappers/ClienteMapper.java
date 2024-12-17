package OpenLab.mappers;

import OpenLab.dtos.ClienteDTO.ClienteRequestDTO;
import OpenLab.dtos.ClienteDTO.ClienteResponseDTO;
import OpenLab.dtos.ClienteDTO.ClienteUpdateDTO;
import OpenLab.models.Cliente;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ClienteMapper {

    ClienteMapper INSTANCE = Mappers.getMapper(ClienteMapper.class);

    @Mapping(source = "usuario", target = "usuario")
    Cliente toEntity(ClienteRequestDTO clienteRequestDTO);

    Cliente toEntity(ClienteUpdateDTO clienteUpdateDTO);

    ClienteResponseDTO toResponseDTO(Cliente cliente);

}