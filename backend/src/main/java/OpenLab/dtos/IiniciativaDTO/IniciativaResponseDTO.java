package OpenLab.dtos.IiniciativaDTO;

public record IniciativaResponseDTO(
        String nombre,
        String idea,
        String problema,
        String oportunidad,
        String solucion,
        int monto_requerido,
        int buy_price,
        int sell_price,
        int misiones_actuales,
        int misiones_objetivo,
        int colaboradores,
        int likes,
        int shares
) {
}
