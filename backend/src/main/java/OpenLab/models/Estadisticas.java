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
public class Estadisticas {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int createdInitiatives;
    private int sharedInitiatives;
    private int joinedInitiatives;
    private int solvedMissions;
    private int validatedMissions;
    private int initiativeLikes;
    private int generatedTokens;
    @OneToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente;
}
