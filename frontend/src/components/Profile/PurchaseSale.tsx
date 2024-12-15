import {  useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useState } from "react";
import EditOrders from "../../components/orders/editOrders";
import CreateOrders from "../../components/orders/createOrders";
import UncancelNoti from "../../components/notifications/uncancelNoti";
import CancelNoti from "../../components/notifications/cancelNoti";
import DeleteNoti from "../../components/notifications/deleteNoti";
import SimpleBar from "simplebar-react";
import "../../index.css"
import 'simplebar/dist/simplebar.min.css';
import { sumIcon } from "../../assets";
import useWindowSize from "../hooks/Responsive";

export const PurchaseSaleOrders = () =>{

    const [modalCreate , setModalCreate]= useState(false);
    const [modalEdit , setModalEdit] = useState(false);
    const [editOrder , setEditOrder] = useState(null)
    const [modalType, setModalType] = useState< 'edit' | 'cancel' | 'uncancel' | 'delete' | null>(null);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [active, setActive] = useState<'Sells' | 'Buys'>('Buys');
    const {sells , buys} =useSelector((state:RootState) => state.ordersBooks);
    const isDarkMode = useSelector ((state: any) => state.darkMode.isDarkMode);
    const { width } = useWindowSize();
    const isMobile = width <= 768;
  

    const handleButtonClick = (button: 'Sells' | 'Buys') => {
        setActive(button);
      };
      
      const handleCreate = () =>{
        setModalCreate(true)
      }
    
    
      const handleEdit = (order: any) => {
        setEditOrder(order);
        setModalEdit(true);
      };
    
      const openNoti = (type: 'cancel' | 'uncancel' | 'delete', orderId: string) => {
        setModalType(type);
        setOrderId(orderId);
      };
    
      const filterOrders = (active==="Buys"? buys : sells)
      
      const closeNoti = () => {
        setModalType(null);
        setOrderId(null);
      };

    return(
        <>
        {modalEdit && editOrder && <EditOrders order={editOrder}  onClose={() => setModalEdit(false)} type={active}/>}
        {modalCreate && <CreateOrders onClose={() => setModalCreate(false)}/>}
        {modalType === 'cancel' && <CancelNoti orderId={orderId!} type={active} onClose={closeNoti} />}
        {modalType === 'uncancel' && <UncancelNoti orderId={orderId!} type={active}  onClose={closeNoti} />}
        {modalType === 'delete' && <DeleteNoti orderId={orderId!} type={active}  onClose={closeNoti} />}
        
        {isMobile
        ?
        // Mobile
        <div className="flex flex-col w-screen h-[30em] pt-4 bg-white shadow-lg rounded-lg" style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}
        >
            
          <h1 className="text-xl p-2 ml-[2em] font-semibold">Purchase and Sale Orders</h1>
          
            <div className="flex flex-row mb-2 justify-center p-2 gap-4 mr-10">
                <button 
                className="w-[8em] flex items-center justify-center bg-color-5 text-white text-sm font-semibold p-1 gap-6 rounded-lg"
                onClick={handleCreate}>
                  <img src={sumIcon }/>Create
                  </button>
              <button
              className={`text-sm font-semibold p-3 w-[116px]  ${
                active === 'Buys' ? 'text-color-1 shadow border border-color-1 rounded-lg' : 'text-black'
              }`}
              onClick={() => handleButtonClick('Buys')}>
                Buys</button>
              <button
              className={`text-sm font-semibold w-[116px] p-3 ${
                active=== 'Sells' ? 'text-color-1 shadow border border-color-1 rounded-lg' : 'text-black'
              }`}
              onClick={() => handleButtonClick('Sells')}>
                Sells</button>
          </div>
          
          <div className="flex flex-col pt-2">
            <div className="grid grid-cols-4 grid-rows-1 h-[4em] text-center text-base font-semibold items-center bg-[#00B2FF]/10"  style={{ backgroundColor: isDarkMode? "#0031c3" :""}}>
                <div >Detail</div>
                <div >Price</div>
                <div className="col-span-2">    </div>
            </div>
            {filterOrders.map((order)=>(
            <div className="grid grid-cols-4 grid-rows-1 bg-white gap-2 text-center justify-center  items-center border-b border-gray-200 h-[4em] " style={{ backgroundColor: isDarkMode? "#817f7f" :""}}>
                <div className="ml-[1em] text-base flex flex-row gap-4">
                    <img src={order.logoDao} className="w-4 h-4 m-auto"/>
                    <div className="flex flex-row gap-1"> 
                        <p>{order.quantity}</p> - <p>{order.tokenDao}</p></div></div>
                <div className=" text-base font-semibold">$ {order.price}</div>
                {order.state === true 
                  ? <>
                  <div className="col-span-2 flex flex-row gap-3 justify-center ">
                    <button  onClick={() => openNoti('cancel', order.id)}
                    className="bg-color-1 text-white p-2 rounded-lg shadow "
                    >Cancel</button>
                    <button onClick={() => handleEdit(order)}
                     className="bg-[#00B2FF] text-white p-2 rounded-lg shadow "
                    >Edit</button>
                    <button onClick={() => openNoti('delete', order.id)}
                    className="bg-black text-white p-2 rounded-lg shadow "
                    >Delete</button></div>
                  </>
                  : <>
                  <div className="col-span-2 flex flex-row gap-2 justify-center ">
                    <button onClick={() => openNoti('uncancel', order.id)}
                    className="bg-color-1/50 text-white p-2 rounded-lg shadow "
                    >Uncancel</button>
                    <button onClick={() => handleEdit(order)}
                    className="bg-[#00B2FF] text-white p-2 rounded-lg shadow "
                    >Edit</button>
                    <button onClick={() => openNoti('delete', order.id)}
                    className="bg-black text-white p-2 rounded-lg shadow "
                    >Delete</button></div>
                </>
                }
            </div>
            )
            )}
          </div>
      
        </div>
        :
        //  Web App
        <div className="flex flex-col w-[82em] m-auto h-[30em] pt-4 bg-white shadow-lg rounded-lg" style={{ backgroundColor: isDarkMode? "#3a3a3a" :""}}
        >
            
          <h1 className="text-xl p-2 ml-[2em] font-semibold">Purchase and Sale Orders</h1>
          
            <div className="flex flex-row mb-2 justify-items-end self-end gap-2 mr-10">
                <button 
                className="w-[8em] flex items-center justify-center bg-color-5 text-white text-sm font-semibold p-1 gap-6 rounded-lg"
                onClick={handleCreate}>
                  <img src={sumIcon }/>Create
                  </button>
              <button
              className={`text-sm font-semibold p-3 w-[116px]  ${
                active === 'Buys' ? 'text-color-1 shadow border border-color-1 rounded-lg' : 'text-black'
              }`}
              onClick={() => handleButtonClick('Buys')}>
                Buys</button>
              <button
              className={`text-sm font-semibold w-[116px] p-3 ${
                active=== 'Sells' ? 'text-color-1 shadow border border-color-1 rounded-lg' : 'text-black'
              }`}
              onClick={() => handleButtonClick('Sells')}>
                Sells</button>
          </div>
          
          <div className="flex flex-col pt-2 pl-8 pr-8 w-[80em]">
            <SimpleBar style={{ maxHeight: 500 , marginRight:30}}>
            <div className="grid grid-cols-8 grid-rows-1 h-[4em] text-center text-base font-semibold items-center bg-[#00B2FF]/10"  style={{ backgroundColor: isDarkMode? "#0031c3" :""}}>
                <div >    </div>
                <div >Name</div>
                <div >Tokens</div>
                <div >Price</div>
                <div className="col-span-2">    </div>
                <div className="col-start-7">   </div>
                <div className="col-start-8">   </div>
            </div>
            {filterOrders.map((order)=>(
            <div className="grid grid-cols-8 grid-rows-1 bg-white  text-center justify-center  items-center border-b border-gray-200 h-[4em] " style={{ backgroundColor: isDarkMode? "#817f7f" :""}}>
                <div className=" items-center" key={order.id}><img src={order.logoDao} className="w-8 h-8 m-auto"/></div>
                <div className="  ml-[1em] text-base">{order.tokenDao}</div>
                <div className="  ml-[1em] text-base">{order.quantity}</div>
                <div className="  ml-[1.5em] text-base font-semibold">$ {order.price}</div>
                <div className="col-span-2">  </div>
                {order.state === true 
                  ? <>
                  <div className="col-start-7 col-span-2 flex flex-row gap-3 justify-center ">
                    <button  onClick={() => openNoti('cancel', order.id)}
                    className="bg-color-1 text-white p-2 rounded-lg shadow "
                    >Cancel</button>
                    <button onClick={() => handleEdit(order)}
                     className="bg-[#00B2FF] text-white p-2 rounded-lg shadow "
                    >Edit</button>
                    <button onClick={() => openNoti('delete', order.id)}
                    className="bg-black text-white p-2 rounded-lg shadow "
                    >Delete</button></div>
                  </>
                  : <>
                  <div className="col-start-7 col-span-2 flex flex-row gap-2 justify-center ">
                    <button onClick={() => openNoti('uncancel', order.id)}
                    className="bg-color-1/50 text-white p-2 rounded-lg shadow "
                    >Uncancel</button>
                    <button onClick={() => handleEdit(order)}
                    className="bg-[#00B2FF] text-white p-2 rounded-lg shadow "
                    >Edit</button>
                    <button onClick={() => openNoti('delete', order.id)}
                    className="bg-black text-white p-2 rounded-lg shadow "
                    >Delete</button></div>
                </>
                }
            </div>
            )
            )}
            </SimpleBar>
          </div>
      
        </div>
        }
        </>
    )
}