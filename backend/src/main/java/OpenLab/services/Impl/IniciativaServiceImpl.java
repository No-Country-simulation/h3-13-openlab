package OpenLab.services.Impl;

import OpenLab.dtos.IiniciativaDTO.IniciativaRequestDTO;
import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.mappers.IniciativaMapper;
import OpenLab.models.Cliente;
import OpenLab.models.Iniciativa;
import OpenLab.repositorys.IClienteRepository;
import OpenLab.repositorys.IGenericRepository;
import OpenLab.repositorys.IniciativaRepository;
import OpenLab.services.IniciativaService;
import org.springframework.stereotype.Service;

@Service
public class IniciativaServiceImpl extends GenericServiceImpl<Iniciativa, Long> implements IniciativaService {

    private final IniciativaRepository iniciativaRepository;
    private final IClienteRepository clienteRepository;
    private final IniciativaMapper iniciativaMapper;

    public IniciativaServiceImpl(IniciativaRepository iniciativaRepository, IniciativaMapper iniciativaMapper, IClienteRepository clienteRepository) {
        this.iniciativaRepository = iniciativaRepository;
        this.iniciativaMapper = iniciativaMapper;
        this.clienteRepository = clienteRepository;
    }

    @Override
    protected IGenericRepository<Iniciativa, Long> getRepo() {return iniciativaRepository;}

    @Override
    public IniciativaResponseDTO saveIniciativa(IniciativaRequestDTO iniciativa){
        Cliente existingCliente = clienteRepository.findById(iniciativa.clienteId())
                .orElseThrow(()-> new IllegalArgumentException("Cliente no encontrado con ID: " + iniciativa.clienteId()));
        Iniciativa nuevaIniciativa = iniciativaMapper.toEntity(iniciativa);
        nuevaIniciativa.setCliente(existingCliente);
        iniciativaRepository.save(nuevaIniciativa);
        IniciativaResponseDTO iniciativaResponseDTO = iniciativaMapper.toResponseDTO(nuevaIniciativa);
        return iniciativaResponseDTO;
    }
}
