import { useAppKitAccount } from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { sumIcon } from "../../assets";
import {
  useAddBuyOrderMutation,
  useAddSellOrderMutation,
} from "../../store/api/apiSlice";
import {
  selectOrderbook,
  setOrderbookData,
} from "../../store/orderbooks/orderbookSlice";
import { addPair } from "../../utils/contracts/contractServices";
import { fetchCryptoData } from "../../utils/fetchCryptoData";

const SaleOrder = () => {
  const MySwal = withReactContent(Swal);
  const { address } = useAppKitAccount();
  const dispatch = useDispatch();
  const orderbook = useSelector(selectOrderbook);
  const [active, setActive] = useState<"Sells" | "Buys">("Buys");
  const handleButtonClick = (button: "Sells" | "Buys") => {
    setActive(button);
  };
  const [cryptosData, setCryptosData] = useState<any>();
  const [quantity, setQuantity] = useState<any>(null);
  const [price, setPrice] = useState<any>(null);
  const [selectedToken1, setSelectedToken1] = useState<any>(null);
  const [selectedToken2, setSelectedToken2] = useState<any>(null);
  const [selectedOrderbook, setSelectedOrderbook] = useState<any>(null);
  const [addBuyOrder, { isSuccess, isError, error }] = useAddBuyOrderMutation();
  const [addSellOrder] = useAddSellOrderMutation();

  const handleAddPair = async (e: any) => {
    e.preventDefault();
    console.log(address);

    const newOrderbook = await addPair(
      "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
      "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
      address
    );
    console.log(newOrderbook);
    const orderbook = {
      identifier:
        newOrderbook?.identifier ||
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      address:
        newOrderbook?.orderbookAddress ||
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
      token1: selectedToken1,
      token2: selectedToken2,
    };
    dispatch(setOrderbookData(orderbook));
    toast.success("Pair created successfully!", {
      style: { backgroundColor: "#1e8736", color: "#fff" },
    });
  };

  const handleBuyOrder = async () => {
    //const orderbookAddress = selectedOrderbook?.address;
    const orderbookLogo = selectedOrderbook?.token1.image;
    const orderbookName = selectedOrderbook?.token1.label;

    const order = {
      logo: orderbookLogo,
      name: orderbookName,
      tokens: quantity,
      price,
    };

    if (active === "Buys") {
      addBuyOrder(order);
    } else {
      addSellOrder(order);
    }

    if (!quantity || !selectedOrderbook) {
      toast.error("All fields are required!");
      return;
    }

    /* try {
      await approveTokens(
        address,
        orderbookAddress,
        "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
        parseInt(price)
      );

      await placeBuy(
        parseInt(price),
        parseInt(quantity),
        orderbookAddress,
        address
      );
    } catch (error) {
      console.error("Error placing buy order:", error);
      alert("Failed to place buy order.");
    } */
  };

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setQuantity(value);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setPrice(value);
  };

  const handleOrderbook = async (e: any) => {
    console.log(e);
    setSelectedOrderbook(e);
  };

  const handleToken1 = async (e: any) => {
    console.log(e);
    setSelectedToken1(e);
  };
  const handleToken2 = async (e: any) => {
    console.log(e);
    setSelectedToken2(e);
  };

  // Estilo personalizado para incluir las imágenes
  const customStyles = {
    control: (base: any) => ({
      ...base,
      backgroundColor: "#eff6ff", // Fondo transparente
      border: "none", // Sin bordes
      boxShadow: "none", // Sin sombra
      marginTop: "10px",
      marginBottom: "10px",
    }),
    valueContainer: (base: any) => ({
      ...base,
      display: "flex", // Evita que se herede el diseño grid
      alignItems: "center",
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: "#eff6ff",
      boxShadow: "none", // Sin sombra
      border: "none", // Sin bordes
      width: "100%",
    }),
    singleValue: (base: any) => ({
      ...base,
      margin: "0", // Asegura que el texto esté alineado
    }),
  };

  // Componente personalizado para opciones
  const customSingleValue = ({ data }: any) => (
    <div className="flex items-center gap-3">
      <img src={data.image} alt="" className="w-8 h-8 rounded-full" />
      <p className="font-semibold text-color-2">{data.label}</p>
    </div>
  );

  const customSingleValueOrderbook = ({ data }: any) => (
    <div className="flex items-center gap-3">
      <p className="font-semibold text-color-2">{data.address}</p>
    </div>
  );

  const customOption = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center gap-5 p-1 ml-2"
      >
        <img src={data.image} alt="" className="w-8 h-8 rounded-full" />
        <p className="font-semibold text-color-2">{data.label}</p>
      </div>
    );
  };

  const customOptionOrderbook = (props: any) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className="flex items-center gap-5 p-1 ml-2"
      >
        <p className="font-semibold text-color-2">{data.address}</p>
      </div>
    );
  };

  useEffect(() => {
    const init = async () => {
      const data = await fetchCryptoData();
      const formattedOptions = data.map((item: any) => ({
        value: item.id,
        label: `${item.symbol.toUpperCase()} - ${item.name}`,
        image: item.image, // URL de la imagen
      }));
      setCryptosData(formattedOptions);
    };

    init();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Order placed successfully!", {
        style: { backgroundColor: "#1e8736", color: "#fff" },
      });

      MySwal.close();
    } else if (isError) {
      toast.error(
        "There was an error creating the initiative. Please try again.",
        {
          style: { backgroundColor: "#991e2a", color: "#fff" },
        }
      );
      console.error("Error:", error);
    }
  }, [isSuccess, isError]);

  return (
    <div className="flex flex-col items-center justify-evenly h-auto bg-white shadow-lg w-[340px] rounded-xl">
      {/* Place tokens pairs */}
      <div className="flex flex-col items-center w-full gap-4 p-4">
        <p className="self-start text-xl font-semibold">Select Tokens</p>
        {/* Seleccion de Tokens */}
        <div className="flex flex-col w-full gap-4">
          <div className="w-full rounded-lg bg-blue-50">
            <Select
              options={cryptosData}
              styles={customStyles}
              components={{
                SingleValue: customSingleValue,
                Option: customOption,
              }}
              placeholder="Selecciona una opción"
              className="w-full"
              isSearchable={false}
              onChange={handleToken1}
            />
          </div>

          <div className="w-full rounded-lg bg-blue-50">
            <Select
              options={cryptosData}
              styles={customStyles}
              components={{
                SingleValue: customSingleValue,
                Option: customOption,
              }}
              placeholder="Selecciona una opción"
              className="w-full"
              isSearchable={false}
              onChange={handleToken2}
            />
          </div>
          {/* Botón de acción */}
          <button
            className="flex items-center justify-center w-full gap-4 p-3 font-semibold text-white rounded-lg bg-color-5"
            onClick={handleAddPair}
          >
            <img src={sumIcon} />
            Create Pair
          </button>
        </div>
        {/* Linea divisoria */}
        <div className="w-full pb-2 border-b border-gray-200">{}</div>
      </div>
      {/* Place Orders */}
      <div className="flex flex-col items-start w-full gap-2 px-4">
        {/* Botones "Buy" y "Sell" */}
        <div className="flex items-center gap-4">
          <button
            className={`text-sm font-semibold p-3 w-[116px]  ${
              active === "Buys"
                ? "text-color-1 shadow border border-color-1 rounded-lg"
                : "text-black"
            }`}
            onClick={() => handleButtonClick("Buys")}
          >
            Buys
          </button>
          <button
            className={`text-sm font-semibold w-[116px] p-3 ${
              active === "Sells"
                ? "text-color-1 shadow border border-color-1 rounded-lg"
                : "text-black"
            }`}
            onClick={() => handleButtonClick("Sells")}
          >
            Sells
          </button>
        </div>
        {/* Linea divisoria */}
        <div className="w-full pb-2 border-b border-gray-200">{}</div>
        <p className="self-start text-xl font-semibold">Select Orderbook</p>
        <Select
          options={orderbook}
          styles={customStyles}
          components={{
            SingleValue: customSingleValueOrderbook,
            Option: customOptionOrderbook,
          }}
          placeholder="Selecciona una opción"
          className="w-full"
          isSearchable={false}
          onChange={handleOrderbook}
        />
        <div className="flex items-center justify-around w-full">
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <label htmlFor="quantity" className="font-semibold">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-2/3 h-8 text-center border rounded-lg shadow"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full gap-2">
            <label htmlFor="price" className="font-semibold">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              min="1"
              value={price}
              onChange={handlePriceChange}
              className="w-2/3 h-8 text-center border rounded-lg shadow"
            />
          </div>
        </div>
        {/* Botón de acción */}
        <button
          className="flex items-center justify-center w-full gap-4 p-3 my-4 font-semibold text-white rounded-lg bg-color-5"
          onClick={handleBuyOrder}
        >
          <img src={sumIcon} />
          Place Order
        </button>
      </div>
    </div>
  );
};

export default SaleOrder;
