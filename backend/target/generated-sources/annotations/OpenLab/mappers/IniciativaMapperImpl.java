package OpenLab.mappers;

import OpenLab.dtos.IiniciativaDTO.IniciativaRequestDTO;
import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.models.Iniciativa;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-13T22:51:13-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22 (Oracle Corporation)"
)
@Component
public class IniciativaMapperImpl implements IniciativaMapper {

    @Override
    public Iniciativa toEntity(IniciativaRequestDTO iniciativaRequestDTO) {
        if ( iniciativaRequestDTO == null ) {
            return null;
        }

        Iniciativa iniciativa = new Iniciativa();

        iniciativa.setImagen( iniciativaRequestDTO.imagen() );
        iniciativa.setBilletera( iniciativaRequestDTO.billetera() );
        iniciativa.setNombre( iniciativaRequestDTO.nombre() );
        iniciativa.setIdea( iniciativaRequestDTO.idea() );
        iniciativa.setProblema( iniciativaRequestDTO.problema() );
        iniciativa.setOportunidad( iniciativaRequestDTO.oportunidad() );
        iniciativa.setSolucion( iniciativaRequestDTO.solucion() );
        iniciativa.setMonto_requerido( iniciativaRequestDTO.monto_requerido() );

        iniciativa.setMonto_actual( 0 );
        iniciativa.setBuy_price( 150 );
        iniciativa.setSell_price( 140 );
        iniciativa.setMisiones_actuales( 0 );
        iniciativa.setMisiones_objetivo( 0 );
        iniciativa.setColaboradores( 0 );
        iniciativa.setLikes( 0 );
        iniciativa.setShares( 0 );

        return iniciativa;
    }

    @Override
    public IniciativaResponseDTO toResponseDTO(Iniciativa iniciativa) {
        if ( iniciativa == null ) {
            return null;
        }

        LocalDate fechaCreacion = null;
        Long id = null;
        String imagen = null;
        String billetera = null;
        String nombre = null;
        String idea = null;
        String problema = null;
        String oportunidad = null;
        String solucion = null;
        int monto_requerido = 0;
        int buy_price = 0;
        int sell_price = 0;
        int misiones_actuales = 0;
        int misiones_objetivo = 0;
        int colaboradores = 0;
        int likes = 0;
        int shares = 0;

        fechaCreacion = iniciativa.getFecha_creacion();
        id = iniciativa.getId();
        imagen = iniciativa.getImagen();
        billetera = iniciativa.getBilletera();
        nombre = iniciativa.getNombre();
        idea = iniciativa.getIdea();
        problema = iniciativa.getProblema();
        oportunidad = iniciativa.getOportunidad();
        solucion = iniciativa.getSolucion();
        monto_requerido = iniciativa.getMonto_requerido();
        buy_price = iniciativa.getBuy_price();
        sell_price = iniciativa.getSell_price();
        misiones_actuales = iniciativa.getMisiones_actuales();
        misiones_objetivo = iniciativa.getMisiones_objetivo();
        colaboradores = iniciativa.getColaboradores();
        likes = iniciativa.getLikes();
        shares = iniciativa.getShares();

        IniciativaResponseDTO iniciativaResponseDTO = new IniciativaResponseDTO( id, imagen, billetera, nombre, idea, problema, oportunidad, solucion, fechaCreacion, monto_requerido, buy_price, sell_price, misiones_actuales, misiones_objetivo, colaboradores, likes, shares );

        return iniciativaResponseDTO;
    }

    @Override
    public List<IniciativaResponseDTO> toListResponseDTO(List<Iniciativa> iniciativa) {
        if ( iniciativa == null ) {
            return null;
        }

        List<IniciativaResponseDTO> list = new ArrayList<IniciativaResponseDTO>( iniciativa.size() );
        for ( Iniciativa iniciativa1 : iniciativa ) {
            list.add( toResponseDTO( iniciativa1 ) );
        }

        return list;
    }
}
