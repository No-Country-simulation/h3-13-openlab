import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ABI_DEL_CONTRATO from '../contracts/OrderBookABI.json';
import Web3 from 'web3';
import { useAuth0 } from '@auth0/auth0-react';

const Cliente = () => {
  const { user, isAuthenticated, getAccessTokenSilently, logout } = useAuth0();
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [contractAddress, setContractAddress] = useState('0x04799661c44EB2e081f4766B981B5Fb2457eF033');
  const [userAccount, setUserAccount] = useState('');
  const [usuarioData, setUsuarioData] = useState(() => {
    // Intentamos cargar los datos del cliente desde localStorage
    const savedData = localStorage.getItem('usuarioData');
    return savedData ? JSON.parse(savedData) : null;
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      // Si el usuario está autenticado y tiene los datos de usuario
      sendUserDataToBackend();  // Enviar los datos del usuario al backend
    }
    // Si usamos Reown directamente guardamos el usuario
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      web3.eth.getAccounts().then(accounts => {
        if (accounts.length > 0) {
          setUserAccount(accounts[0]);
        }
      });
    }
  }, [isAuthenticated, user]);

  // Función para enviar los datos al backend
  const sendUserDataToBackend = async () => {
    try {
      const token = await getAccessTokenSilently(); // Obtener el token de acceso

      // Enviar los datos al backend
      await axios.post('http://localhost:8080/api/login/signup', token, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Datos del usuario enviados al backend');

      // Obtener los datos del cliente desde el backend
      const response = await axios.get('http://localhost:8080/api/cliente/email?correo=' + user.email);

      // Guardar los datos en el estado y en localStorage
      setUsuarioData(response.data);  // Guardar los datos del cliente en el estado
      localStorage.setItem('usuarioData', JSON.stringify(response.data));  // Guardar en localStorage
      console.log(response.data);  // Mostrar los datos del cliente en la consola
    } catch (error) {
      console.error("Error al enviar los datos del usuario:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validar datos en el backend
      const response = await axios.post('http://localhost:8080/orderbook/validate-buy', {
        price: price,
        quantity: quantity,
      });

      console.log('Respuesta del backend:', response.data);

      // Convertir los valores de precio y cantidad a la unidad mínima (Wei)
      const priceInWei = Web3.utils.toWei(price.toString(), 'ether');
      const quantityInWei = Web3.utils.toWei(quantity.toString(), 'ether');

      console.log('Precio en Wei:', priceInWei);
      console.log('Cantidad en Wei:', quantityInWei);

      // Proceder con la transacción si la validación es exitosa
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ABI_DEL_CONTRATO, contractAddress);

      await contract.methods.placeBuy(priceInWei, quantityInWei).send({
        from: userAccount,
        gas: 3000000,
      })
      .on('transactionHash', (hash) => {
        console.log('Hash de transacción:', hash);
      })
      .on('receipt', (receipt) => {
        console.log('Recibo de transacción:', receipt);
      })
      .on('error', (error) => {
        console.error('Error en la transacción:', error);
        alert('Error al procesar la orden.');
      });

      alert('Orden de compra colocada con éxito');
    } catch (error) {
      console.error('Error al realizar la transacción:', error);
      alert('Error al procesar la orden.');
    }
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    localStorage.removeItem('usuarioData');  // Limpiar localStorage al cerrar sesión
  };

  return (
    <div>
      {usuarioData ? (
        <div>
          <h4>Datos del Cliente:</h4>
          <p>Email: {usuarioData.data.usuario.email}</p>
          <p>Nombre: {usuarioData.data.nombre}</p>
          <p>Apellido: {usuarioData.data.apellido}</p>
          <p>Nombre Completo: {usuarioData.data.nombreCompleto}</p>
          <img src={usuarioData.data.picture} alt="User" width="100" />
        </div>
      ) : (
        <p>Cargando datos del cliente...</p>
      )}
      <appkit-button balance />
      <appkit-account-button />
      <h3>Wallet: {userAccount}</h3>
      <button onClick={handleLogout}>Cerrar sesión</button>
      <form onSubmit={handleSubmit}>
        <label>Precio:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <label>Cantidad:</label>
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <button type="submit">Enviar Orden</button>
      </form>
    </div>
  );
};

export default Cliente;