import React, { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import ABI_DEL_CONTRATO from '../contracts/OrderBookABI.json';
import Web3 from 'web3';

const Cliente = () => {
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [contractAddress, setContractAddress] = useState('0x04799661c44EB2e081f4766B981B5Fb2457eF033');
  const [userAccount, setUserAccount] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const decoded = jwt_decode(token);
    if (decoded.nombre) {
      setUserEmail(decoded.nombre);
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
  }, []);
  

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
      const priceInWei = Web3.utils.toWei(price.toString(), 'ether'); // Convierte el precio a Wei
      const quantityInWei = Web3.utils.toWei(quantity.toString(), 'ether'); // Convierte la cantidad a Wei
  
      console.log('Precio en Wei:', priceInWei);
      console.log('Cantidad en Wei:', quantityInWei);
  
      // Proceder con la transacción si la validación es exitosa
      const web3 = new Web3(window.ethereum);
      const contract = new web3.eth.Contract(ABI_DEL_CONTRATO, contractAddress);
  
      // Enviar la transacción
      await contract.methods.placeBuy(priceInWei, quantityInWei).send({
        from: userAccount,
        gas: 3000000, // Ajusta según sea necesario
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

  return (
    <div>
      <h3>Bienvenido Cliente: {userEmail}</h3>
      <appkit-button balance/>
      <appkit-network-button />
      <appkit-account-button />
      <h3>Wallet: {userAccount}</h3>
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