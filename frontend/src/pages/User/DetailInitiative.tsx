import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Initiative } from "../../store/Initiatives/showInitiativesSlice";
import Graph from "../../components/graf/Graph";

const Detail = () => {
  const { id } = useParams();
  const { initiatives } = useSelector((state: RootState) => state.initiatives);  

  const [initiativeDetail, setInitiativeDetail] = useState<Initiative | null | undefined>(null);

  useEffect(() => {
    if (id && initiatives.length > 0) {
      const initiative = initiatives.find((item) => item.id === id);
      setInitiativeDetail(initiative);
    }
  }, [id, initiatives]);  

  if (!initiativeDetail) {
    return <div>Cargando...</div>; 
  }

  return (
    <div className="flex flex-col bg-[#afafaf1a] gap-5 p-3">
        
        <div className="flex flex-row gap-3 justify-between m-auto ">
            <div className=" flex flex-row justify-between m-3 bg-white rounded-lg shadow">    
                <img src="https://blogs.iadb.org/conocimiento-abierto/wp-content/uploads/sites/10/2022/03/La-respuesta-a-la-pandemia-%C2%BFQue%CC%81-podemos-aprender-de-las-iniciativas-ciudadanas.jpg"
                alt={initiativeDetail.name}
                className=" w-[450px] h-[300px] m-auto"
                />
                <div className=" p-2 flex flex-col gap-3 ">
                <h1 className="text-3xl font-semibold mb-4 ">{initiativeDetail.name}</h1>
                    <div><h2 className="text-xl italic font-semibold">Problema:</h2> 
                    <p className="m-1">{initiativeDetail.problem}</p></div>
                    <div><h2 className="text-xl italic font-semibold">Oportunidad:</h2> <p className="m-1">{initiativeDetail.opportunity}</p></div>
                    <div><h2 className="text-xl italic font-semibold">Solución:</h2> <p className="m-1">{initiativeDetail.solution}</p></div>
                    <div><h2 className="text-xl italic font-semibold">idea:</h2> <p  className="m-1">{initiativeDetail.idea}</p></div>
                </div>
                
            </div>

            <div className="m-auto ">
                    <button className="text-xl font-semibold mb-4 items-center justify-center">Back</button>
                    <div className="bg-white rounded-lg shadow p-2 flex flex-col gap-3 m-3">
                        <div><h2 className="text-l italic font-semibold text-center">Colaboradores:</h2><p  className="m-1 text-center"> {initiativeDetail.colaborator}</p></div>
                        <div><h2 className="text-l italic font-semibold text-center">Misiones:</h2><p  className="m-1 text-center"> {initiativeDetail.missions}</p></div>
                        <div><h2 className="text-l italic font-semibold text-center">Likes:</h2><p  className="m-1 text-center"> {initiativeDetail.likes}</p></div>
                        <div><h2 className="text-l italic font-semibold text-center">Shares:</h2><p  className="m-1 text-center"> {initiativeDetail.shares}</p></div>
                    </div>
            </div>

        </div>

        <div className="bg-white rounded-lg shadow p-2 flex flex-row  justify-evenly ">

            <div className="">
                <h2  className="text-l italic font-semibold text-center">Precio Historico:</h2> 
                    <Graph
                        data={initiativeDetail.priceFluctuation}
                        color="#FF5733" 
                        width={500} 
                        height={200}  
                        />
            </div>
            <div className="flex flex-col items-center gap-4 p-2">
                    <div className="flex flex-col items-center">
                        <h2  className="text-l italic font-semibold text-center">Precio de venta:</h2> 
                        <p className="m-3">{initiativeDetail.sell_price}</p>
                        </div>
                    <div className="flex flex-col items-center">
                        <h2  className="text-l italic font-semibold text-center">Precio de Compra:</h2> 
                        <p className="m-3">{initiativeDetail.buy_price}</p>
                        </div>
            </div>
            <div>
                <h1>buy</h1>
                <h1>join</h1>
                <h1>buy</h1>                
                <h1>buy</h1>
            </div>
        </div>

    </div>
  );
};

export default Detail;
