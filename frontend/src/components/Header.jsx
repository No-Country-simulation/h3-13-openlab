import React from 'react';
import icono from "../../../google.png";
import "../css/Header.css"
import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className='contenedor-header'>
        <div className='icono'>
         <Link to={"/"}><img src={icono} alt="logo" /></Link>
        </div>
        <div className='atajos'>
            <li><Link to={"/"}>Inicio</Link></li>
            <li><Link to={"/Productos"}>Productos</Link></li>
            <li><Link to={"/Contacto"}>Contacto</Link></li>
            <li><Link to={"/Ayuda"}>Ayuda</Link></li>
            <li><Link to={"/Login"}>Login</Link></li>
            <li><Link to={"/Register"}>Register</Link></li>
        </div>
    </div>
  )
}

export default Header