import { Order } from "../../store/user/ordersUserSlice";

interface EditOrdersProps {
  order: Order;  
}

const EditOrders: React.FC<EditOrdersProps> = ({ order }) => {

  return (
    <div>
      {/* Aquí iría el código para renderizar la edición de la orden */}
      <h2>Edit Order</h2>
      <p>Order ID: {order.id}</p>
      {/* Puedes agregar más detalles del pedido aquí */}
    </div>
  );
};

export default EditOrders;
