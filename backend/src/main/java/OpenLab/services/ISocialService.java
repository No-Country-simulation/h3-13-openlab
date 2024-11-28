package OpenLab.services;

import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.dtos.SocialsDTO.SocialsRequestDTO;
import OpenLab.models.Socials;

import java.util.List;

public interface ISocialService extends IGenericService<Socials, Long> {
    void saveSocials(SocialsRequestDTO socialsRequestDTO);

    List<IniciativaResponseDTO> getUserLikes(Long id);

    List<IniciativaResponseDTO> getUserJoins(Long id);

    List<IniciativaResponseDTO> getUserShares(Long id);
}
