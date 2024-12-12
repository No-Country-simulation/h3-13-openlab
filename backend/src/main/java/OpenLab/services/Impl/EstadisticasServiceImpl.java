package OpenLab.services.Impl;

import OpenLab.dtos.EstadisticasDTO.EstadisticasResponseDTO;
import OpenLab.mappers.EstadisticasMapper;
import OpenLab.models.Cliente;
import OpenLab.models.Estadisticas;
import OpenLab.models.Iniciativa;
import OpenLab.models.Socials;
import OpenLab.repositorys.IClienteRepository;
import OpenLab.repositorys.IEstaditicasRepository;
import OpenLab.repositorys.IGenericRepository;
import OpenLab.services.IEstadisticasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EstadisticasServiceImpl extends GenericServiceImpl<Estadisticas, Long> implements IEstadisticasService {

    @Autowired
    private IEstaditicasRepository estaditicasRepository;

    @Autowired
    private IClienteRepository clienteRepository;

    private final EstadisticasMapper estadisticasMapper;

    public EstadisticasServiceImpl(EstadisticasMapper estadisticasMapper) {
        this.estadisticasMapper = estadisticasMapper;
    }
    @Override
    protected IGenericRepository<Estadisticas, Long> getRepo() {
        return estaditicasRepository;
    }

    @Override
    public EstadisticasResponseDTO calcularEstadisticas(Long id) {

        // Buscar al cliente por ID
        Cliente existingCliente = clienteRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado con ID: " + id));

        // Verificar si ya existe una instancia de Estadisticas asociada a este cliente
        Estadisticas estadisticas = estaditicasRepository.findByClienteId(id)
                .orElse(new Estadisticas()); // Si no existe, crear una nueva

        // Total de iniciativas creadas por el cliente
        int createdInitiatives = existingCliente.getIniciativa().size();

        // Total de iniciativas compartidas
        int sharedInitiatives = (int) existingCliente.getSocials().stream()
                .filter(Socials::is_shared)
                .count();

        // Total de iniciativas en las que participa
        int joinedInitiatives = (int) existingCliente.getSocials().stream()
                .filter(Socials::is_joined)
                .count();

        // Total de iniciativas a las que dio Like
        int initiativeLikes = (int) existingCliente.getSocials().stream()
                .filter(Socials::is_liked)
                .count();

        // Valores hardcodeados
        int solvedMissions = 10; // Ejemplo
        int validatedMissions = 5; // Ejemplo
        int generatedTokens = 100; // Ejemplo

        // Actualizar o crear los valores en Estadisticas
        estadisticas.setCliente(existingCliente);
        estadisticas.setCreatedInitiatives(createdInitiatives);
        estadisticas.setSharedInitiatives(sharedInitiatives);
        estadisticas.setJoinedInitiatives(joinedInitiatives);
        estadisticas.setSolvedMissions(solvedMissions);
        estadisticas.setValidatedMissions(validatedMissions);
        estadisticas.setInitiativeLikes(initiativeLikes);
        estadisticas.setGeneratedTokens(generatedTokens);

        // Guardar la entidad en la base de datos
        estaditicasRepository.save(estadisticas);
        EstadisticasResponseDTO estadisticasResponseDTO = estadisticasMapper.toResponseDTO(estadisticas);
        return estadisticasResponseDTO;
    }
}
