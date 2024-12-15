package OpenLab;

import OpenLab.models.BuyOrder;
import OpenLab.models.SellOrder;
import OpenLab.repositorys.IBuyOrderRepository;
import OpenLab.repositorys.ISellOrderRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class OpenLabApplication {

	public static void main(String[] args) {
		SpringApplication.run(OpenLabApplication.class, args);
	}

	@Bean
	CommandLineRunner initializeBuyOrders(IBuyOrderRepository buyOrderRepository) {
		return args -> {
			if (buyOrderRepository.count() == 0) { // Solo insertar si la tabla está vacía
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ", "Fractal", 5, 1000.00));
				buyOrderRepository.save(new BuyOrder(null,"https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ", "Fractal", 10, 2000.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ", "Rayito de Sol", 17, 2400.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Ayudemos todos", 22, 2800.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Cosechando sonrisas", 28, 3000.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Por los animalitos", 32, 4000.00));
				System.out.println("Datos iniciales cargados en BuyOrder");
			}
		};
	}

	@Bean
	CommandLineRunner initializeSellOrders(ISellOrderRepository sellOrderRepository) {
		return args -> {
			if (sellOrderRepository.count() == 0) { // Solo insertar si la tabla está vacía
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Solar", 12, 500.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Lopez Inc.", 15, 1600.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Mascotitas", 27, 2100.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Rosseta", 36, 2500.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Ayudar al planeta", 38, 3200.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/16uWP8ssncZu3I9CkSm4c_D0NhlLlEMjJ","Estudiemos juntos", 42, 3800.00));
				System.out.println("Datos iniciales cargados en SellOrder");
			}
		};
	}

}
