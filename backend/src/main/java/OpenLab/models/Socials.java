package OpenLab.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "socials")
public class Socials {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean is_liked = false;
    private boolean is_shared = false;
    private boolean is_joined = false;

    @ManyToOne
    @JoinColumn(name = "iniciativa_id", nullable = false)
    private Iniciativa iniciativa;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;

    public Socials(Cliente cliente, Iniciativa iniciativa) {
        this.cliente = cliente;
        this.iniciativa = iniciativa;
    }
}