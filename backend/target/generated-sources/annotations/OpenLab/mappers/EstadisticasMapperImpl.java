package OpenLab.mappers;

import OpenLab.dtos.EstadisticasDTO.EstadisticasResponseDTO;
import OpenLab.models.Estadisticas;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-12-15T01:50:17-0300",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 22.0.2 (Oracle Corporation)"
)
@Component
public class EstadisticasMapperImpl implements EstadisticasMapper {

    @Override
    public EstadisticasResponseDTO toResponseDTO(Estadisticas estadisticas) {
        if ( estadisticas == null ) {
            return null;
        }

        int createdInitiatives = 0;
        int sharedInitiatives = 0;
        int joinedInitiatives = 0;
        int solvedMissions = 0;
        int validatedMissions = 0;
        int initiativeLikes = 0;
        int generatedTokens = 0;

        createdInitiatives = estadisticas.getCreatedInitiatives();
        sharedInitiatives = estadisticas.getSharedInitiatives();
        joinedInitiatives = estadisticas.getJoinedInitiatives();
        solvedMissions = estadisticas.getSolvedMissions();
        validatedMissions = estadisticas.getValidatedMissions();
        initiativeLikes = estadisticas.getInitiativeLikes();
        generatedTokens = estadisticas.getGeneratedTokens();

        EstadisticasResponseDTO estadisticasResponseDTO = new EstadisticasResponseDTO( createdInitiatives, sharedInitiatives, joinedInitiatives, solvedMissions, validatedMissions, initiativeLikes, generatedTokens );

        return estadisticasResponseDTO;
    }
}
