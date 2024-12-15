package OpenLab.dtos.TokenDTO;


import java.io.Serializable;

public record JWTTokenDTO (
        String jwtToken
)  implements Serializable{
}
