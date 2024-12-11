package OpenLab.mappers;

import OpenLab.dtos.AdminDTO.AdminRequestDTO;
import OpenLab.dtos.AdminDTO.AdminResponseDTO;
import OpenLab.dtos.AdminDTO.AdminUpdateDTO;
import OpenLab.models.Admin;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-11T01:39:41-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class AdminMapperImpl implements AdminMapper {

    @Autowired
    private UserMapper userMapper;

    @Override
    public Admin toEntity(AdminRequestDTO adminRequestDTO) {
        if ( adminRequestDTO == null ) {
            return null;
        }

        Admin admin = new Admin();

        admin.setUsuario( userMapper.toEntity( adminRequestDTO.usuario() ) );
        admin.setNombre( adminRequestDTO.nombre() );
        admin.setApellido( adminRequestDTO.apellido() );

        return admin;
    }

    @Override
    public Admin toEntity(AdminUpdateDTO adminUpdateDTO) {
        if ( adminUpdateDTO == null ) {
            return null;
        }

        Admin admin = new Admin();

        admin.setId( adminUpdateDTO.id() );
        admin.setNombre( adminUpdateDTO.nombre() );
        admin.setApellido( adminUpdateDTO.apellido() );

        return admin;
    }

    @Override
    public AdminResponseDTO toResponseDTO(Admin admin) {
        if ( admin == null ) {
            return null;
        }

        String nombre = null;
        String apellido = null;

        nombre = admin.getNombre();
        apellido = admin.getApellido();

        AdminResponseDTO adminResponseDTO = new AdminResponseDTO( nombre, apellido );

        return adminResponseDTO;
    }
}
