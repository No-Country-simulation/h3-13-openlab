package OpenLab.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "iniciativa")
public class Iniciativa {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String idea;
    private String problema;
    private String oportunidad;
    private String solucion;
    private int monto_requerido;
    private int monto_actual;
    private int buy_price;
    private int sell_price;
    private int misiones_actuales;
    private int misiones_objetivo;
    private int colaboradores;
    private int likes;
    private int shares;
    private int joins;
    @ManyToOne
    @JoinColumn(name = "cliente_id",foreignKey = @ForeignKey(name = "FK_CLIENTE"))
    private Cliente cliente;

    public void incrementLikes() {
        this.likes++;
    }

    public void decrementLikes() {
        if (this.likes > 0) {
            this.likes--;
        }
    }

    public void incrementShares() {
        this.shares++;
    }

    public void decrementShares() {
        if (this.shares > 0) {
            this.shares--;
        }
    }

    public void incrementJoins() {
        this.joins++;
    }

    public void decrementJoins() {
        if (this.joins > 0) {
            this.joins--;
        }
    }
}
