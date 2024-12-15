import SimpleBar from 'simplebar-react';
import "../../index.css"
import 'simplebar/dist/simplebar.min.css';
import { useState, useEffect } from "react";
import { obtenerPreciosCripto } from '../hooks/CryptoData';
import { useSelector } from 'react-redux';

export const CriptoBar = () =>{

    const [precios, setPrecios] = useState<any>({});
    const isDarkMode = useSelector ((state: any) => state.darkMode.isDarkMode);

    useEffect(() => {
        const obtenerPrecios = async () => {
          try {
            const preciosConImagenes = await obtenerPreciosCripto(); 
            setPrecios(preciosConImagenes);
          } catch (err) {
            console.log(err)
          } 
        };
        obtenerPrecios();
      }, );

    return(
        <div className="flex flex-col lg:w-[48em] bg-white shadow-lg rounded-lg pl-[em] sm:w-screen" style={{ backgroundColor: isDarkMode? "#3a3a3a" :"white"}}>
          <SimpleBar style={{ maxHeight: 500 }} className='sm:w-[20em] lg:w-[48em]'>
            <ul>
              {Object.keys(precios).map((cryptoKey) => (
                <li key={cryptoKey} className="flex items-center gap-3 flex-row  justify-between m-3">
                  <div className="flex flex-row">
                    <img
                      src={precios[cryptoKey]?.image}
                      alt={`${cryptoKey} logo`}
                      className="w-9 h-9 m-2"
                    />
                    <span className="font-semibold">
                      {cryptoKey}
                      <h2 className="font-normal text-sm opacity-60">{precios[cryptoKey]?.symbol.toUpperCase()}</h2>
                    </span>
                  </div>
                  <div className="flex flex-col items-end mr-8">
                    <span className="font-semibold text-l text-color-1">{precios[cryptoKey]?.porcentage ? precios[cryptoKey]?.porcentage.toFixed(2)+"%" : 'Cargando...'}</span>
                    <span className="opacity-60">  ${precios[cryptoKey]?.usd?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                </li>
              ))}
            </ul>
            </SimpleBar>
            </div>
    )
}