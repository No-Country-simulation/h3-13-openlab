import { useState } from "react";
import { close } from "../../assets";
import useWindowSize from "../hooks/Responsive";
// import { useDispatch } from "react-redux";

interface Initiative {
    name: string;
    img: string;
    idea: string;
    problem: string;
    solution: string;
    price: {
      buy: number;
    };
  }

const ModalBuy =  ({ initiative, onClose }: { initiative: Initiative; onClose: () => void }) => {
    // const dispatch = useDispatch();
    const [quantity, setQuantity]= useState(1);
    const { width } = useWindowSize();

    const isMobile = width <= 768;

    function handleClose(){

       onClose();
    }

    const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(event.target.value));
    };

    function handleBuy(){
        alert("comprar") // agregar contrato
    }

  return (
    <div className="fixed inset-0 bg-black flex flex-col bg-opacity-70 flex justify-center items-center z-50">
    {/* Modal content for non-mobile screens */}
    {!isMobile ? (
      <div className="bg-white rounded shadow-lg w-[964px] h-[550px] flex flex-col gap-4">
        <div className='flex flex-row justify-between items-center p-6'>
            <div className="flex flex-row items-center justify-center">
                <h1 className='text-3xl font-semibold mt-4 ml-5'>Buy Token Inititive :</h1>
                <h1 className="font-bold text-3xl mt-4 ml-5 ">{initiative.name}</h1>
            </div>
            <button onClick={handleClose} className='p-2'>
                <img src={close} alt="close" />  
            </button>
        </div>

        <div className='flex flex-row gap-4 items-center justify-around'>
            <div className='flex flex-col gap-3 ml-5 '>
                <div className="flex items-center justify-center">
                    <img src={initiative.img} className="w-[200px]" alt={initiative.name} />
                </div>

                <div>
                    <h1 className='text-sm font-bold m-2'>Idea</h1>
                    <h1>{initiative.idea}</h1>
                </div>
            </div>

            <div className='flex flex-col gap-3 mr-5 '>
                <div>
                    <h1 className='text-sm font-bold m-2'>Problem</h1>
                    <h1>{initiative.problem}</h1>
                </div>
                <div>
                    <h1 className='text-sm font-bold m-2'>Solution</h1>
                    <h1>{initiative.solution}</h1>
                </div>
            </div>
        </div>

        <div className="flex flex-row items-center justify-evenly">
            <div>
                <h1 className='text-sm font-bold m-2'>Token:</h1>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={handleQuantity}
                    className="w-[70px] border shadow rounded-lg p-1"
                />
            </div>
            <div>
                <h1 className='text-sm font-bold m-2'>Price:</h1>
                <h1 className="p-1">${initiative.price.buy}</h1> 
            </div>
        </div>

        <div className="flex items-center justify-center">
            <h1 className="font-semibold text-xl m-1">Total :</h1>
            <h1 className="font-bold text-2xl">${initiative.price.buy * quantity }</h1>
        </div>

        <div className='flex items-center flex-row justify-evenly text-white text-base font-semibold mt-5'>
            <button className='flex flex-row bg-[#3D7BFF] w-[404px] h-[45px] justify-center items-center rounded-lg hover:bg-[#00b2ff]'
                    onClick={handleBuy}>
                Buy
            </button>
            <button className='flex flex-row bg-[#e0e0e0] text-black w-[304px] h-[45px] justify-center items-center rounded-lg hover:bg-black hover:text-white'
                    onClick={handleClose}>
                Cancel
            </button>
        </div>
      </div>
    ) : (
      /* Modal content for mobile screens */
      <div className="bg-white rounded shadow-lg w-[90%] max-w-[400px] h-[auto] p-4 flex flex-col gap-4">
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">{initiative.name}</h1>
            <button onClick={handleClose} className="text-xl">
                <img src={close} alt="close" />
            </button>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
            <img src={initiative.img} className="w-[150px]" alt={initiative.name} />
            <h1 className="text-sm font-bold mt-4">Idea</h1>
            <p className="w-[80%]">{initiative.idea}</p>
            <h1 className="text-sm font-bold mt-4">Problem</h1>
            <p className="w-[80%]">{initiative.problem}</p>
            <h1 className="text-sm font-bold mt-4">Solution</h1>
            <p className="w-[80%]">{initiative.solution}</p>
        </div>

        <div className="flex flex-row items-center justify-evenly">
            <div>
                <h1 className='text-sm font-bold m-2'>Token:</h1>
                <input 
                    type="number" 
                    value={quantity} 
                    onChange={handleQuantity}
                    className="w-[70px] border shadow rounded-lg p-1"
                />
            </div>
            <div>
                <h1 className='text-sm font-bold m-2'>Price:</h1>
                <h1 className="p-1">${initiative.price.buy}</h1> 
            </div>
        </div>

        <div className="flex items-center justify-center">
            <h1 className="font-semibold text-xl m-1">Total :</h1>
            <h1 className="font-bold text-2xl">${initiative.price.buy * quantity }</h1>
        </div>

        <div className="mt-5 flex justify-between">
            <button className="bg-[#3D7BFF] text-white w-[45%] p-3 rounded-lg hover:bg-[#00b2ff]" onClick={handleBuy}>Buy</button>
            <button className="bg-[#e0e0e0] text-black w-[45%] p-3 rounded-lg hover:bg-black hover:text-white" onClick={handleClose}>Cancel</button>
        </div>
      </div>
    )}
    </div>
  );
};

export default ModalBuy;
