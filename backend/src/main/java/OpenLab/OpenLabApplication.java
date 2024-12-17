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
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/10beY_QFjpwr_ovc__NfWD7zRTmZvZSR-","Bitcoin", 1, 2500.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/1E2JlmZUtuDqfX58lELfImF955dxOO1oL", "Ethereum", 4, 4500.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/189aJByY-3qeq1BZ1PbaT8nmzYrOKC5Ie", "BNB", 10, 2500.00));
				buyOrderRepository.save(new BuyOrder(null,"https://lh3.googleusercontent.com/d/10Gt5WEVSAzMWUHhwpdlqg8Iht5v80Uj3", "Solana", 15, 1300.00));


				System.out.println("Datos iniciales cargados en BuyOrder");
			}
		};
	}

	@Bean
	CommandLineRunner initializeSellOrders(ISellOrderRepository sellOrderRepository) {
		return args -> {
			if (sellOrderRepository.count() == 0) { // Solo insertar si la tabla está vacía
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/10beY_QFjpwr_ovc__NfWD7zRTmZvZSR-","Bitcoin", 1, 2800.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/1E2JlmZUtuDqfX58lELfImF955dxOO1oL","Ethereum", 5, 5200.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/189aJByY-3qeq1BZ1PbaT8nmzYrOKC5Ie","BNB", 12, 2800.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/10Gt5WEVSAzMWUHhwpdlqg8Iht5v80Uj3","Solana", 17, 1500.00));


				System.out.println("Datos iniciales cargados en SellOrder");
			}
		};
	}

}
