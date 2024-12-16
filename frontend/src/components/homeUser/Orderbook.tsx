import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import SimpleBar from "simplebar-react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { sumIcon } from "../../assets";
import {
  useDeleteBuyOrderMutation,
  useDeleteSellOrderMutation,
  useGetBuyOrdersQuery,
  useGetSellOrdersQuery,
} from "../../store/api/apiSlice";
import { store } from "../../store/store";
import CreateOrders from "../orders/createOrders";

const Orderbook = () => {
  const MySwal = withReactContent(Swal);
  const { data: buyOrders } = useGetBuyOrdersQuery({});
  const { data: sellOrders } = useGetSellOrdersQuery({});
  const [deleteBuyOrder] = useDeleteBuyOrderMutation();
  const [deleteSellOrder] = useDeleteSellOrderMutation();
  const [active, setActive] = useState<"Sells" | "Buys">("Buys");
  const [activeOrders, setActiveOrders] = useState<any>();

  const handleButtonClick = (button: "Sells" | "Buys") => {
    setActive(button);
  };

  const handleCancel = (orderId: number) => {
    if (active === "Buys") {
      deleteBuyOrder(orderId);
    } else {
      deleteSellOrder(orderId);
    }
  };

  const handleCreate = () => {
    MySwal.fire({
      html: (
        <Provider store={store}>
          <CreateOrders />
        </Provider>
      ),
      showConfirmButton: false,
      width: "fit-content",
      scrollbarPadding: false,
    });
  };

  useEffect(() => {
    if (active === "Buys") {
      setActiveOrders(buyOrders);
    } else {
      setActiveOrders(sellOrders);
    }
  }, [active, buyOrders, sellOrders]);

  if (!buyOrders || !sellOrders) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 h-[40em]">
        <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
        <p className="p-2">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="my-20">
      {/* ORDERBOOK */}
      <div className="flex flex-col w-[82em] m-auto min-h-[30em] pt-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl p-2 ml-[2em] font-semibold">
          Purchase and Sale Orders
        </h1>

        <div className="flex flex-row self-end gap-2 mb-2 mr-10 justify-items-end">
          <button
            className="w-[8em] flex items-center justify-center bg-color-5 text-white text-sm font-semibold p-1 gap-6 rounded-lg"
            onClick={handleCreate}
          >
            <img src={sumIcon} />
            Create
          </button>
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

        <div className="flex flex-col pt-2 pl-8 pr-8 w-[80em]">
          <SimpleBar style={{ minHeight: 500 }}>
            <div className="grid grid-cols-8 grid-rows-1 h-[4em] w-[76em] text-center text-base font-semibold items-center bg-[#00B2FF]/10">
              <div> </div>
              <div>Name</div>
              <div>Tokens</div>
              <div>Price</div>
              <div className="col-span-2"> </div>
              <div className="col-start-7"> </div>
              <div className="col-start-8"> </div>
            </div>
            {activeOrders?.dataIterable.map((order: any, index: any) => (
              <div
                key={index}
                className="grid grid-cols-8 grid-rows-1 bg-white w-[74em] text-center justify-center  items-center border-b border-gray-200 h-[4em] "
              >
                <div className="items-center " key={order.id}>
                  <img src={order?.logo} className="w-8 h-8 m-auto" />
                </div>
                <div className="  ml-[1em] text-base">{order.name}</div>
                <div className="  ml-[1em] text-base">{order.tokens}</div>
                <div className="  ml-[1.5em] text-base font-semibold">
                  $ {order.price}
                </div>
                <div className="flex justify-center w-full col-span-3 col-start-7 gap-3">
                  <button
                    className="text-white shadow rounded-3xl bg-color-1 w-28"
                    onClick={() => handleCancel(order.id)}
                  >
                    Cancel
                  </button>
                  <button className="bg-[#00B2FF] text-white p-2 rounded-3xl shadow w-28">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </SimpleBar>
        </div>
      </div>
    </div>
  );
};

export default Orderbook;
