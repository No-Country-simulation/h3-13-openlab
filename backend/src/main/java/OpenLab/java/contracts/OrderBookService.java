package OpenLab.java.contracts;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.protocol.http.HttpService;
import org.web3j.tuples.generated.Tuple3;
import org.web3j.tx.gas.DefaultGasProvider;

import java.math.BigInteger;
import java.util.List;

@Service
public class OrderBookService {

    private final Web3j web3j;               // Instancia de Web3j para interactuar con la blockchain
    private final Credentials credentials;    // Credenciales del usuario para realizar transacciones
    private final OrderBookABI orderBook;     // Instancia del contrato inteligente OrderBookABI
    //private final static BigInteger GAS_LIMIT = BigInteger.valueOf(100_000_000); // Ajusta según el límite de la red
    //private final static BigInteger GAS_PRICE = BigInteger.valueOf(20_000_000_000L); // 20 Gwei

    // Constructor que inicializa Web3j, Credentials y OrderBookABI con los valores configurados
    public OrderBookService(@Value("${web3.rpc.url}") String rpcUrl,
                            @Value("${web3.private.key}") String privateKey,
                            @Value("${contract.orderbook.address}") String contractAddress) {
        this.web3j = Web3j.build(new HttpService(rpcUrl));  // Establece la conexión con la red Ethereum
        this.credentials = Credentials.create(privateKey);  // Crea las credenciales usando la clave privada
        this.orderBook = new OrderBookABI(contractAddress, web3j, credentials, new DefaultGasProvider()); // Inicializa el contrato con la dirección y las credenciales
        //this.orderBook = new OrderBookABI(contractAddress, web3j, credentials, new StaticGasProvider(GAS_PRICE, GAS_LIMIT));
    }

    // Método que obtiene el número de órdenes de compra en el libro de órdenes
    public BigInteger buyCount() throws Exception {
        return orderBook.buyCount().send();
    }

    // Método que envía una transacción para cancelar una orden de compra
    public TransactionReceipt cancelBuy() throws Exception {
        return orderBook.cancelBuy().send();
    }

    // Método que envía una transacción para cancelar una orden de venta
    public TransactionReceipt cancelSell() throws Exception {
        return orderBook.cancelSell().send();
    }

    // Método que obtiene los detalles de las órdenes de compra en el libro de órdenes
    // Devuelve una tupla con tres listas: compradores, precios y cantidades
    public Tuple3<List<String>, List<BigInteger>, List<BigInteger>> getBuySide() throws Exception {
        return orderBook.getBuySide().send();
    }

    // Método que obtiene los detalles de las órdenes de venta en el libro de órdenes
    // Devuelve una tupla con tres listas: vendedores, precios y cantidades
    public Tuple3<List<String>, List<BigInteger>, List<BigInteger>> getSellSide() throws Exception {
        return orderBook.getSellSide().send();
    }

    // Método que obtiene el "spread" o la diferencia de precios entre la mejor orden de compra y venta
    public BigInteger getSpread() throws Exception {
        return orderBook.getSpread().send();
    }

    // Método que envía una transacción para colocar una orden de compra
    public TransactionReceipt placeBuy(BigInteger price, BigInteger quantity) throws Exception {
        return orderBook.placeBuy(price, quantity).send();
    }

    // Método que envía una transacción para colocar una orden de venta
    public TransactionReceipt placeSell(BigInteger price, BigInteger quantity) throws Exception {
        return orderBook.placeSell(price, quantity).send();
    }

    // Método que obtiene el número de órdenes de venta en el libro de órdenes
    public BigInteger sellCount() throws Exception {
        return orderBook.sellCount().send();
    }

    // Método que escucha los eventos de "BuyOrderPlaced" (orden de compra colocada) en la blockchain
    // Imprime los detalles del evento cuando una orden de compra es colocada
    public void listenToBuyOrderPlacedEvents() {
        orderBook.buyOrderPlacedEventFlowable(new EthFilter())
                .subscribe(event -> System.out.println("Buy order placed by: " + event.buyer + " Price: " + event.price + " Quantity: " + event.quantity),
                        error -> System.err.println("Error listening to BuyOrderPlaced events: " + error.getMessage()));
    }

    // Método que procesa los eventos de "BuyOrderPlaced" desde el recibo de una transacción
    public List<OrderBookABI.BuyOrderPlacedEventResponse> processBuyOrderPlacedEvents(TransactionReceipt receipt) {
        return orderBook.getBuyOrderPlacedEvents(receipt);
    }

    // Método que escucha los eventos de "CancelBuyOrder" (orden de compra cancelada) en la blockchain
    // Imprime los detalles del evento cuando una orden de compra es cancelada
    public void listenToCancelBuyOrderEvents() {
        orderBook.cancelBuyOrderEventFlowable(new EthFilter())
                .subscribe(event -> System.out.println("Cancel Buy Order by: " + event.buyer),
                        error -> System.err.println("Error listening to CancelBuyOrder events: " + error.getMessage()));
    }

    // Método que procesa los eventos de "CancelBuyOrder" desde el recibo de una transacción
    public List<OrderBookABI.CancelBuyOrderEventResponse> processCancelBuyOrderEvents(TransactionReceipt receipt) {
        return orderBook.getCancelBuyOrderEvents(receipt);
    }

    // Método que escucha los eventos de "CancelSellOrder" (orden de venta cancelada) en la blockchain
    // Imprime los detalles del evento cuando una orden de venta es cancelada
    public void listenToCancelSellOrderEvents() {
        orderBook.cancelSellOrderEventFlowable(new EthFilter())
                .subscribe(event -> System.out.println("Cancel Sell Order by: " + event.seller),
                        error -> System.err.println("Error listening to CancelSellOrder events: " + error.getMessage()));
    }

    // Método que procesa los eventos de "CancelSellOrder" desde el recibo de una transacción
    public List<OrderBookABI.CancelSellOrderEventResponse> processCancelSellOrderEvents(TransactionReceipt receipt) {
        return orderBook.getCancelSellOrderEvents(receipt);
    }

    // Método que escucha los eventos de "SellOrderPlaced" (orden de venta colocada) en la blockchain
    // Imprime los detalles del evento cuando una orden de venta es colocada
    public void listenToSellOrderPlacedEvents() {
        orderBook.sellOrderPlacedEventFlowable(new EthFilter())
                .subscribe(event -> System.out.println("Sell order placed by: " + event.seller + " Price: " + event.price + " Quantity: " + event.quantity),
                        error -> System.err.println("Error listening to SellOrderPlaced events: " + error.getMessage()));
    }

    // Método que procesa los eventos de "SellOrderPlaced" desde el recibo de una transacción
    public List<OrderBookABI.SellOrderPlacedEventResponse> processSellOrderPlacedEvents(TransactionReceipt receipt) {
        return orderBook.getSellOrderPlacedEvents(receipt);
    }
}
