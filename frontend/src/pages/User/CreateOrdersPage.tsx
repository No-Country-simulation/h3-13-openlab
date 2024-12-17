import Orderbook from "../../components/homeUser/Orderbook";
import SaleOrder from "../../components/wallet/OrderChart";

const CreateOrdersPage = () => {
  return (
    <div className="flex items-center w-full my-20 justify-evenly">
      <SaleOrder />
      <Orderbook />
    </div>
  );
};

export default CreateOrdersPage;
