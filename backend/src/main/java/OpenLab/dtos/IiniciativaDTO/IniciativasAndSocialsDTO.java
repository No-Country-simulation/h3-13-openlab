package OpenLab.dtos.IiniciativaDTO;

import java.time.LocalDate;

public record IniciativasAndSocialsDTO(
        Long id,
        String imagen,
        String billetera,
        String nombre,
        String idea,
        String problema,
        String oportunidad,
        String solucion,
        LocalDate fechaCreacion,
        int monto_requerido,
        int buy_price,
        int sell_price,
        int misiones_actuales,
        int misiones_objetivo,
        int colaboradores,
        int likes,
        int shares,
        boolean isLiked,
        boolean isShared,
        boolean isJoined
) {
}
