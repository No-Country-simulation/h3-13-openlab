import React from "react";
import { Routes, Route } from "react-router-dom";
import Contacto from "./Contacto";
import Productos from "./Productos";
import Inicio from "./Inicio";
import Ayuda from "./Ayuda";
import Login from "./Login";
import Register from "./Register";
import Cliente from "./Cliente";

const Rutas = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/Productos" element={<Productos />} />
      <Route path="/Contacto" element={<Contacto />} />
      <Route path="/Ayuda" element={<Ayuda />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Cliente" element={<Cliente />} />
    </Routes>
  );
};

export default Rutas;
