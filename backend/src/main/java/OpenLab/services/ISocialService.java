package OpenLab.services;

import OpenLab.dtos.IiniciativaDTO.IniciativaResponseDTO;
import OpenLab.dtos.SocialsDTO.JoinRequestDTO;
import OpenLab.dtos.SocialsDTO.LikeRequestDTO;
import OpenLab.dtos.SocialsDTO.ShareRequestDTO;
import OpenLab.dtos.SocialsDTO.SocialsRequestDTO;
import OpenLab.models.Socials;

import java.util.List;

public interface ISocialService extends IGenericService<Socials, Long> {
//    void saveSocials(SocialsRequestDTO socialsRequestDTO);

    List<IniciativaResponseDTO> getUserLikes(Long id);

    List<IniciativaResponseDTO> getUserJoins(Long id);

    List<IniciativaResponseDTO> getUserShares(Long id);

    List<Socials> findByClienteId(Long clienteId);

    void saveLike(LikeRequestDTO likeRequestDTO);

    void saveShare(ShareRequestDTO shareRequestDTO);

    void saveJoin(JoinRequestDTO joinRequestDTO);

}
