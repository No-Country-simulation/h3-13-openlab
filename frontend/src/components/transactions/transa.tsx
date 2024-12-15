import { line, historial } from "../../assets";
import { useMediaQuery } from 'react-responsive';
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
import SimpleBar from "simplebar-react";
import "../../index.css"
import 'simplebar/dist/simplebar.min.css';

export const TransactionsUser = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const { sells, buys } = useSelector((state: RootState) => state.transactions);
  const isDarkMode = useSelector ((state: any) => state.darkMode.isDarkMode);

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col items-center shadow-lg" style={{ width: isMobile ? "100vw" : "" }} >
          <div className="flex flex-col bg-white rounded-lg "  style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}>
            <div className="flex flex-row gap-5 mb-[1em] p-1">
              <img src={historial} alt="Historial" className="w-10 h-10" />
              <h1 className="text-l font-semibold italic content-end mr-[5em]">
                Últimas transacciones realizadas
              </h1>
            </div>

            <div className="flex flex-col justify-evenly">
              <div className="flex flex-col  h-[12em]">
                <h1 className="text-l font-semibold bg-color-1/20 ">Compras </h1>
                <div className="flex flex-row bg-color-1/10 italic">
                  <h1 className="text-sm">Resumen</h1>
                </div>
                {buys.length > 0 ? (
                  buys.map((transaction) => (
                    <p> {transaction.order.quantity} {transaction.order.tokenDao} to {transaction.order.price}  <strong>{transaction.state ? 'Completado' : 'Pendiente'}</strong></p>
                  ))
                ) : (
                  <p className="m-1">No transactions have been made</p>
                )}
              </div>

              <div className="flex flex-col h-[12em]">
                <h1 className="text-l font-semibold bg-color-1/20">Ventas</h1>
                <div className="flex flex-row bg-color-1/10 italic">
                  <h1 className="text-sm">Resumen</h1>
                </div>
                {sells.length > 0 ? (
                  sells.map((transaction) => (
                    <p> {transaction.order.quantity} {transaction.order.tokenDao} to {transaction.order.price}  <strong>{transaction.state ? 'Completado' : 'Pendiente'}</strong></p>
                  ))
                ) : (
                  <p className="m-1">No transactions have been made</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // WEBAPP
        <div className="flex flex-col items-center">
          <div className="flex flex-col w-[80em]  bg-white shadow rounded-lg p-1" style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}>
            <div className="flex flex-row gap-5 mb-[1em] p-1">
              <img src={historial} alt="Historial" className="w-10 h-10" />
              <h1 className="text-l font-semibold italic content-end mr-[5em]">
                Últimas transacciones realizadas
              </h1>
            </div>

            <div className="flex flex-row justify-evenly">
              <div className="flex flex-col w-[35em]">
              <SimpleBar style={{ maxHeight: 300 }}>
                <h1 className="text-l font-semibold bg-color-1/20 text-center">
                  Compras
                </h1>
                <div className="flex flex-row bg-color-1/10 justify-evenly italic">
                  <h1>Fecha</h1>
                  <img src={line} className="h-[1.7em]" />
                  <h1>Detalle</h1>
                  <img src={line} className="h-[1.7em]" />
                  <h1>Estado</h1>
                </div>
                {buys.length > 0 ? (
                    buys.map((transaction) => (
                        <div key={transaction.id} className="flex flex-row gap-7 items-center text-center p-1">
                        <p className="w-[10em]">{new Date(transaction.createdAt).toLocaleString()}  </p>
                         | <p className="w-[10em]">{transaction.order.quantity} - {transaction.order.tokenDao} to {transaction.order.price}</p> | <strong>{transaction.state ? 'Completado' : 'Cancelada'}</strong>
                  </div>
              ))
                ) : (
                  <p className="p-2 text-center">No transactions have been made</p>
                )}
                </SimpleBar>
              </div>

              <div className="flex flex-col w-[35em] ">
                <SimpleBar style={{ maxHeight: 300 }}>
                <h1 className="text-l font-semibold bg-color-1/20 text-center">
                  Ventas
                </h1>
                <div className="flex flex-row bg-color-1/10 justify-evenly italic">
                  <h1>Fecha</h1>
                  <img src={line} className="h-[1.7em]" />
                  <h1>Detalle</h1>
                  <img src={line} className="h-[1.7em]" />
                  <h1>Estado</h1>
                </div>
                {sells.length > 0 ? (
                  sells.map((transaction) => (
                    <div key={transaction.id} className="flex flex-row gap-7 items-center text-center p-1">
                        <p className="w-[10em]">{new Date(transaction.createdAt).toLocaleString()}  </p>
                         | <p className="w-[10em]">{transaction.order.quantity} - {transaction.order.tokenDao} to {transaction.order.price}</p> | <strong>{transaction.state ? 'Completado' : 'Cancelada'}</strong>
                  </div>
                  ))
                ) : (
                  <p className="p-2 text-center">No transactions have been made</p>
                )}
                </SimpleBar>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
