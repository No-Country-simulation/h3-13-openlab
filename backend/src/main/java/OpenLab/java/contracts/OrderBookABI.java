package OpenLab.java.contracts;

import io.reactivex.Flowable;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.Callable;
import org.web3j.abi.EventEncoder;
import org.web3j.abi.TypeReference;
import org.web3j.abi.datatypes.Address;
import org.web3j.abi.datatypes.DynamicArray;
import org.web3j.abi.datatypes.Event;
import org.web3j.abi.datatypes.Function;
import org.web3j.abi.datatypes.Type;
import org.web3j.abi.datatypes.generated.Uint256;
import org.web3j.crypto.Credentials;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.DefaultBlockParameter;
import org.web3j.protocol.core.RemoteFunctionCall;
import org.web3j.protocol.core.methods.request.EthFilter;
import org.web3j.protocol.core.methods.response.BaseEventResponse;
import org.web3j.protocol.core.methods.response.Log;
import org.web3j.protocol.core.methods.response.TransactionReceipt;
import org.web3j.tuples.generated.Tuple3;
import org.web3j.tx.Contract;
import org.web3j.tx.TransactionManager;
import org.web3j.tx.gas.ContractGasProvider;

@SuppressWarnings("rawtypes")
public class OrderBookABI extends Contract {
    public static final String BINARY = "Bin file was not provided";
    public static final String FUNC_BUYCOUNT = "buyCount";
    public static final String FUNC_CANCELBUY = "cancelBuy";
    public static final String FUNC_CANCELSELL = "cancelSell";
    public static final String FUNC_GETBUYSIDE = "getBuySide";
    public static final String FUNC_GETSELLSIDE = "getSellSide";
    public static final String FUNC_GETSPREAD = "getSpread";
    public static final String FUNC_PLACEBUY = "placeBuy";
    public static final String FUNC_PLACESELL = "placeSell";
    public static final String FUNC_SELLCOUNT = "sellCount";

    public static final Event BUYORDERPLACED_EVENT = new Event("BuyOrderPlaced", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Address>(true) {}));
    ;

    public static final Event CANCELBUYORDER_EVENT = new Event("CancelBuyOrder", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}));
    ;

    public static final Event CANCELSELLORDER_EVENT = new Event("CancelSellOrder", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Address>(true) {}));
    ;

    public static final Event SELLORDERPLACED_EVENT = new Event("SellOrderPlaced", 
            Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>(true) {}, new TypeReference<Uint256>() {}, new TypeReference<Address>(true) {}));
    ;

    @Deprecated
    protected OrderBookABI(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    protected OrderBookABI(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, credentials, contractGasProvider);
    }

    @Deprecated
    protected OrderBookABI(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        super(BINARY, contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    protected OrderBookABI(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        super(BINARY, contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static List<BuyOrderPlacedEventResponse> getBuyOrderPlacedEvents(TransactionReceipt transactionReceipt) {
        List<Log> logs = transactionReceipt.getLogs();
        List<BuyOrderPlacedEventResponse> responses = new ArrayList<>();
        for (Log log : logs) {
            Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(BUYORDERPLACED_EVENT, log);
            if (eventValues != null) { // Verifica que el log corresponda al evento esperado
                BuyOrderPlacedEventResponse response = new BuyOrderPlacedEventResponse();
                response.log = eventValues.getLog();
                response.price = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
                response.buyer = (String) eventValues.getIndexedValues().get(1).getValue();
                response.quantity = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                responses.add(response);
            }
        }
        return responses;
    }

    public static BuyOrderPlacedEventResponse getBuyOrderPlacedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(BUYORDERPLACED_EVENT, log);
        BuyOrderPlacedEventResponse typedResponse = new BuyOrderPlacedEventResponse();
        typedResponse.log = log;
        typedResponse.price = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.buyer = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.quantity = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<BuyOrderPlacedEventResponse> buyOrderPlacedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getBuyOrderPlacedEventFromLog(log));
    }

    public Flowable<BuyOrderPlacedEventResponse> buyOrderPlacedEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(BUYORDERPLACED_EVENT));
        return buyOrderPlacedEventFlowable(filter);
    }

    public static List<CancelBuyOrderEventResponse> getCancelBuyOrderEvents(
            TransactionReceipt transactionReceipt) {
        List<Log> logs = transactionReceipt.getLogs();
        List<CancelBuyOrderEventResponse> responses = new ArrayList<>();
        for (Log log : logs) {
            Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(CANCELBUYORDER_EVENT, log);
            if (eventValues != null) {
                CancelBuyOrderEventResponse typedResponse = new CancelBuyOrderEventResponse();
                typedResponse.log = eventValues.getLog();
                typedResponse.buyer = (String) eventValues.getIndexedValues().get(0).getValue();
                responses.add(typedResponse);
            }
        }
        return responses;
    }

    public static CancelBuyOrderEventResponse getCancelBuyOrderEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(CANCELBUYORDER_EVENT, log);
        CancelBuyOrderEventResponse typedResponse = new CancelBuyOrderEventResponse();
        typedResponse.log = log;
        typedResponse.buyer = (String) eventValues.getIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<CancelBuyOrderEventResponse> cancelBuyOrderEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getCancelBuyOrderEventFromLog(log));
    }

    public Flowable<CancelBuyOrderEventResponse> cancelBuyOrderEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(CANCELBUYORDER_EVENT));
        return cancelBuyOrderEventFlowable(filter);
    }

    public static List<CancelSellOrderEventResponse> getCancelSellOrderEvents(
            TransactionReceipt transactionReceipt) {
        List<Log> logs = transactionReceipt.getLogs();
        List<CancelSellOrderEventResponse> responses = new ArrayList<>();
        for (Log log : logs) {
            Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(CANCELSELLORDER_EVENT, log);
            if (eventValues != null) {
                CancelSellOrderEventResponse typedResponse = new CancelSellOrderEventResponse();
                typedResponse.log = eventValues.getLog();
                typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
                responses.add(typedResponse);
            }
        }
        return responses;
    }

    public static CancelSellOrderEventResponse getCancelSellOrderEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(CANCELSELLORDER_EVENT, log);
        CancelSellOrderEventResponse typedResponse = new CancelSellOrderEventResponse();
        typedResponse.log = log;
        typedResponse.seller = (String) eventValues.getIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<CancelSellOrderEventResponse> cancelSellOrderEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getCancelSellOrderEventFromLog(log));
    }

    public Flowable<CancelSellOrderEventResponse> cancelSellOrderEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(CANCELSELLORDER_EVENT));
        return cancelSellOrderEventFlowable(filter);
    }

    public static List<SellOrderPlacedEventResponse> getSellOrderPlacedEvents(
            TransactionReceipt transactionReceipt) {
        List<Log> logs = transactionReceipt.getLogs();
        List<SellOrderPlacedEventResponse> responses = new ArrayList<>();
        for (Log log : logs) {
            Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(SELLORDERPLACED_EVENT, log);
            if (eventValues != null) {
                SellOrderPlacedEventResponse typedResponse = new SellOrderPlacedEventResponse();
                typedResponse.log = eventValues.getLog();
                typedResponse.price = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
                typedResponse.seller = (String) eventValues.getIndexedValues().get(1).getValue();
                typedResponse.quantity = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
                responses.add(typedResponse);
            }
        }
        return responses;
    }

    public static SellOrderPlacedEventResponse getSellOrderPlacedEventFromLog(Log log) {
        Contract.EventValuesWithLog eventValues = staticExtractEventParametersWithLog(SELLORDERPLACED_EVENT, log);
        SellOrderPlacedEventResponse typedResponse = new SellOrderPlacedEventResponse();
        typedResponse.log = log;
        typedResponse.price = (BigInteger) eventValues.getIndexedValues().get(0).getValue();
        typedResponse.seller = (String) eventValues.getIndexedValues().get(1).getValue();
        typedResponse.quantity = (BigInteger) eventValues.getNonIndexedValues().get(0).getValue();
        return typedResponse;
    }

    public Flowable<SellOrderPlacedEventResponse> sellOrderPlacedEventFlowable(EthFilter filter) {
        return web3j.ethLogFlowable(filter).map(log -> getSellOrderPlacedEventFromLog(log));
    }

    public Flowable<SellOrderPlacedEventResponse> sellOrderPlacedEventFlowable(
            DefaultBlockParameter startBlock, DefaultBlockParameter endBlock) {
        EthFilter filter = new EthFilter(startBlock, endBlock, getContractAddress());
        filter.addSingleTopic(EventEncoder.encode(SELLORDERPLACED_EVENT));
        return sellOrderPlacedEventFlowable(filter);
    }

    public RemoteFunctionCall<BigInteger> buyCount() {
        final Function function = new Function(FUNC_BUYCOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> cancelBuy() {
        final Function function = new Function(
                FUNC_CANCELBUY, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> cancelSell() {
        final Function function = new Function(
                FUNC_CANCELSELL, 
                Arrays.<Type>asList(), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>> getBuySide(
            ) {
        final Function function = new Function(FUNC_GETBUYSIDE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Address>>() {}, new TypeReference<DynamicArray<Uint256>>() {}, new TypeReference<DynamicArray<Uint256>>() {}));
        return new RemoteFunctionCall<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>>(function,
                new Callable<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>>() {
                    @Override
                    public Tuple3<List<String>, List<BigInteger>, List<BigInteger>> call() throws
                            Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<List<String>, List<BigInteger>, List<BigInteger>>(
                                convertToNative((List<Address>) results.get(0).getValue()), 
                                convertToNative((List<Uint256>) results.get(1).getValue()), 
                                convertToNative((List<Uint256>) results.get(2).getValue()));
                    }
                });
    }

    public RemoteFunctionCall<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>> getSellSide(
            ) {
        final Function function = new Function(FUNC_GETSELLSIDE, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<DynamicArray<Address>>() {}, new TypeReference<DynamicArray<Uint256>>() {}, new TypeReference<DynamicArray<Uint256>>() {}));
        return new RemoteFunctionCall<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>>(function,
                new Callable<Tuple3<List<String>, List<BigInteger>, List<BigInteger>>>() {
                    @Override
                    public Tuple3<List<String>, List<BigInteger>, List<BigInteger>> call() throws
                            Exception {
                        List<Type> results = executeCallMultipleValueReturn(function);
                        return new Tuple3<List<String>, List<BigInteger>, List<BigInteger>>(
                                convertToNative((List<Address>) results.get(0).getValue()), 
                                convertToNative((List<Uint256>) results.get(1).getValue()), 
                                convertToNative((List<Uint256>) results.get(2).getValue()));
                    }
                });
    }

    public RemoteFunctionCall<BigInteger> getSpread() {
        final Function function = new Function(FUNC_GETSPREAD, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    public RemoteFunctionCall<TransactionReceipt> placeBuy(BigInteger _price,
            BigInteger _quantity) {
        final Function function = new Function(
                FUNC_PLACEBUY, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_price), 
                new org.web3j.abi.datatypes.generated.Uint256(_quantity)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<TransactionReceipt> placeSell(BigInteger _price,
            BigInteger _quantity) {
        final Function function = new Function(
                FUNC_PLACESELL, 
                Arrays.<Type>asList(new org.web3j.abi.datatypes.generated.Uint256(_price), 
                new org.web3j.abi.datatypes.generated.Uint256(_quantity)), 
                Collections.<TypeReference<?>>emptyList());
        return executeRemoteCallTransaction(function);
    }

    public RemoteFunctionCall<BigInteger> sellCount() {
        final Function function = new Function(FUNC_SELLCOUNT, 
                Arrays.<Type>asList(), 
                Arrays.<TypeReference<?>>asList(new TypeReference<Uint256>() {}));
        return executeRemoteCallSingleValueReturn(function, BigInteger.class);
    }

    @Deprecated
    public static OrderBookABI load(String contractAddress, Web3j web3j, Credentials credentials,
            BigInteger gasPrice, BigInteger gasLimit) {
        return new OrderBookABI(contractAddress, web3j, credentials, gasPrice, gasLimit);
    }

    @Deprecated
    public static OrderBookABI load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, BigInteger gasPrice, BigInteger gasLimit) {
        return new OrderBookABI(contractAddress, web3j, transactionManager, gasPrice, gasLimit);
    }

    public static OrderBookABI load(String contractAddress, Web3j web3j, Credentials credentials,
            ContractGasProvider contractGasProvider) {
        return new OrderBookABI(contractAddress, web3j, credentials, contractGasProvider);
    }

    public static OrderBookABI load(String contractAddress, Web3j web3j,
            TransactionManager transactionManager, ContractGasProvider contractGasProvider) {
        return new OrderBookABI(contractAddress, web3j, transactionManager, contractGasProvider);
    }

    public static class BuyOrderPlacedEventResponse extends BaseEventResponse {
        public BigInteger price;
        public String buyer;
        public BigInteger quantity;
    }

    public static class CancelBuyOrderEventResponse extends BaseEventResponse {
        public String buyer;
    }

    public static class CancelSellOrderEventResponse extends BaseEventResponse {
        public String seller;
    }

    public static class SellOrderPlacedEventResponse extends BaseEventResponse {
        public BigInteger price;
        public String seller;
        public BigInteger quantity;
    }
}
