package OpenLab.services;

import OpenLab.dtos.SocialsDTO.SocialsRequestDTO;
import OpenLab.models.Socials;

public interface ISocialService extends IGenericService<Socials, Long> {
    void saveSocials(SocialsRequestDTO socialsRequestDTO);
}
