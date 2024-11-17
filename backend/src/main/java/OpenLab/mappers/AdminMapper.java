package OpenLab.mappers;

import OpenLab.dtos.AdminDTO.AdminRequestDTO;
import OpenLab.dtos.AdminDTO.AdminResponseDTO;
import OpenLab.dtos.AdminDTO.AdminUpdateDTO;
import OpenLab.models.Admin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface AdminMapper {

    AdminMapper INSTANCE = Mappers.getMapper(AdminMapper.class);

    @Mapping(source = "usuario", target = "usuario")
    Admin toEntity(AdminRequestDTO adminRequestDTO);

    Admin toEntity(AdminUpdateDTO adminUpdateDTO);

    AdminResponseDTO toResponseDTO(Admin admin);
}
