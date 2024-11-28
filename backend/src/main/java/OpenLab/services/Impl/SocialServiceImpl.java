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

    public SocialServiceImpl(IniciativaRepository iniciativaRepository, IClienteRepository clienteRepository, IniciativaMapper iniciativaMapper) {
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
        Iniciativa existingIniciativa = iniciativaRepository.findById(socialsRequestDTO.idIniciativa())
                .orElseThrow(() -> new IllegalArgumentException("Iniciativa no encontrada con ID: " + socialsRequestDTO.idIniciativa()));

        Cliente existingCliente = clienteRepository.findById(socialsRequestDTO.idCliente())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado con ID: " + socialsRequestDTO.idCliente()));

        Socials existingSocials = repo.findByClienteIdAndIniciativaId(socialsRequestDTO.idCliente(), socialsRequestDTO.idIniciativa())
                .orElse(null);

        if (socialsRequestDTO.like()) {
            existingIniciativa.incrementLikes();
        } else {
            existingIniciativa.decrementLikes();
        }

        if (socialsRequestDTO.share()) {
            existingIniciativa.incrementShares();
        } else {
            existingIniciativa.decrementShares();
        }

        if (socialsRequestDTO.join()) {
            existingIniciativa.incrementColaboradores();
        } else {
            existingIniciativa.decrementColaboradores();
        }

        if (existingSocials != null) {
            existingSocials.set_liked(socialsRequestDTO.like());
            existingSocials.set_shared(socialsRequestDTO.share());
            existingSocials.set_joined(socialsRequestDTO.join());
            repo.save(existingSocials);
        } else {
            // Si no existe, crear uno nuevo
            Socials newSocial = new Socials();
            newSocial.set_liked(socialsRequestDTO.like());
            newSocial.set_shared(socialsRequestDTO.share());
            newSocial.set_joined(socialsRequestDTO.join());
            newSocial.setIniciativa(existingIniciativa);
            newSocial.setCliente(existingCliente);
            repo.save(newSocial);
        }
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
}
