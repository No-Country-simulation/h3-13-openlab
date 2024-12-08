package OpenLab.dtos.EstadisticasDTO;

public record EstadisticasResponseDTO(
        int createdInitiatives,
        int sharedInitiatives,
        int joinedInitiatives,
        int solvedMissions,
        int validatedMissions,
        int initiativeLikes,
        int generatedTokens
) {
}
