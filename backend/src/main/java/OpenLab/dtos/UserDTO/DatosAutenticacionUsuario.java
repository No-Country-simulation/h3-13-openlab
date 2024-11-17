package OpenLab.dtos.UserDTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class DatosAutenticacionUsuario {

    @NotBlank(message = "El email es obligatorio")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String password;

    public DatosAutenticacionUsuario(String email, String password) {
        validateEmail(email);  // Método que valida el formato del email
        this.email = email;
        this.password = password;
    }

    private void validateEmail(String email) {
        if (email == null) {
            throw new IllegalArgumentException("El email es obligatorio");
        }

        String regex = "^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\\.com$";
        if (!email.matches(regex)) {
            throw new IllegalArgumentException("Formato de email inválido. Solo se permite gmail.com, hotmail.com y outlook.com.");
        }
    }
}
