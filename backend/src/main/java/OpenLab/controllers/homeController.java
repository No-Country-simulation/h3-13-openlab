package OpenLab.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

public class homeController {

    @GetMapping("/")
    public String home(){

        return "hola estoy en el home, acabo de hacer logout";
    }


}
