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
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS", "Fractal", 5, 1000.00));
				buyOrderRepository.save(new BuyOrder(null,"https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS", "Fractal", 10, 2000.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS", "Rayito de Sol", 17, 2400.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Ayudemos todos", 22, 2800.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Cosechando sonrisas", 28, 3000.00));
				buyOrderRepository.save(new BuyOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Por los animalitos", 32, 4000.00));
				System.out.println("Datos iniciales cargados en BuyOrder");
			}
		};
	}

	@Bean
	CommandLineRunner initializeSellOrders(ISellOrderRepository sellOrderRepository) {
		return args -> {
			if (sellOrderRepository.count() == 0) { // Solo insertar si la tabla está vacía
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Fractal", 5, 1000.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Fractal", 10, 2000.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Rayito de Sol", 17, 2400.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Ayudemos todos", 22, 2800.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Cosechando sonrisas", 28, 3000.00));
				sellOrderRepository.save(new SellOrder(null, "https://lh3.googleusercontent.com/d/1KZKKW_1HAY1wF_oLqKzclN1QO35OLnvS","Por los animalitos", 32, 4000.00));
				System.out.println("Datos iniciales cargados en SellOrder");
			}
		};
	}

}
