package OpenLab.services.Impl;

import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.dtos.SocialsDTO.SocialsRequestDTO;
import OpenLab.mappers.IniciativaMapper;
import OpenLab.models.Cliente;
import OpenLab.models.Iniciativa;

import OpenLab.models.Socials;
import OpenLab.repositorys.IClienteRepository;
import OpenLab.repositorys.IGenericRepository;
import OpenLab.repositorys.ISocialRepository;
import OpenLab.repositorys.IniciativaRepository;
import OpenLab.services.ISocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SocialServiceImpl extends GenericServiceImpl<Socials, Long> implements ISocialService {

    @Autowired
    private ISocialRepository repo;

    private final IniciativaRepository iniciativaRepository;
    private final IClienteRepository clienteRepository;
    private final IniciativaMapper iniciativaMapper;

    public SocialServiceImpl(IniciativaRepository iniciativaRepository, IClienteRepository clienteRepository, ISocialRepository socialRepository, IniciativaMapper iniciativaMapper) {
        this.iniciativaRepository = iniciativaRepository;
        this.clienteRepository = clienteRepository;
        this.iniciativaMapper = iniciativaMapper;
    }

    @Override
    protected IGenericRepository<Socials, Long> getRepo() {
        return repo;
    }

    @Override
    public void saveSocials(SocialsRequestDTO socialsRequestDTO) {
        Iniciativa iniciativa = iniciativaRepository.findById(socialsRequestDTO.idIniciativa())
                .orElseThrow(() -> new IllegalArgumentException("Iniciativa no encontrada con ID: " + socialsRequestDTO.idIniciativa()));

        Cliente cliente = clienteRepository.findById(socialsRequestDTO.idCliente())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado con ID: " + socialsRequestDTO.idCliente()));

        Socials socials = repo.findByClienteIdAndIniciativaId(cliente.getId(), iniciativa.getId())
                .orElseGet(() -> new Socials(cliente, iniciativa)); // Crea una nueva si no existe

        handleLikes(iniciativa, socials, socialsRequestDTO.like());
        handleShares(iniciativa, socials, socialsRequestDTO.share());
        handleJoins(iniciativa, socials, socialsRequestDTO.join());

        repo.save(socials);
        iniciativaRepository.save(iniciativa);
    }

    private void handleLikes(Iniciativa iniciativa, Socials socials, boolean like) {
        if (like != socials.is_liked()) {
            if (like) iniciativa.incrementLikes();
            else iniciativa.decrementLikes();
            socials.set_liked(like);
        }
    }

    private void handleShares(Iniciativa iniciativa, Socials socials, boolean share) {
        if (share != socials.is_shared()) {
            if (share) iniciativa.incrementShares();
            else iniciativa.decrementShares();
            socials.set_shared(share);
        }
    }

    private void handleJoins(Iniciativa iniciativa, Socials socials, boolean join) {
        if (join != socials.is_joined()) {
            if (join) iniciativa.incrementColaboradores();
            else iniciativa.decrementColaboradores();
            socials.set_joined(join);
        }
    }

    @Override
    public List<Socials> findByClienteId(Long clienteId) {
        return repo.findByClienteId(clienteId);
    }

    @Override
    public List<IniciativaResponseDTO> getUserLikes(Long id){
        List<Socials> socials = repo.findLikesByClienteId(id);
        List<Iniciativa> iniciativas = socials.stream()
                .map(Socials::getIniciativa).collect(Collectors.toList());
        List<IniciativaResponseDTO> iniciativaResponseDTOS = iniciativaMapper.toListResponseDTO(iniciativas);
        return iniciativaResponseDTOS;
    }

    @Override
    public List<IniciativaResponseDTO> getUserJoins(Long id){
        List<Socials> socials = repo.findJoinsByClienteId(id);
        List<Iniciativa> iniciativas = socials.stream()
                .map(Socials::getIniciativa).collect(Collectors.toList());
        List<IniciativaResponseDTO> iniciativaResponseDTOS = iniciativaMapper.toListResponseDTO(iniciativas);
        return iniciativaResponseDTOS;
    }

    @Override
    public List<IniciativaResponseDTO> getUserShares(Long id){
        List<Socials> socials = repo.findSharesByClienteId(id);
        List<Iniciativa> iniciativas = socials.stream()
                .map(Socials::getIniciativa).collect(Collectors.toList());
        List<IniciativaResponseDTO> iniciativaResponseDTOS = iniciativaMapper.toListResponseDTO(iniciativas);
        return iniciativaResponseDTOS;
    }

//    private Socials obtenerOSocials(Long idCliente, Long idIniciativa) {
//        Cliente cliente = clienteRepository.findById(idCliente)
//                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
//        Iniciativa iniciativa = iniciativaRepository.findById(idIniciativa)
//                .orElseThrow(() -> new RuntimeException("Iniciativa no encontrada"));
//
//        return socialRepository.findByClienteAndIniciativa(cliente, iniciativa)
//                .orElse(new Socials(null, false, false, false, iniciativa, cliente));
//    }
}
