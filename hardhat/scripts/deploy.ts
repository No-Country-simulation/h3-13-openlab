const hre = require("hardhat");
const fs = require("fs-extra");
const path = require("path");

async function main() {
  // Directorio donde guardaremos los ABIs y direcciones
  const buildDir = path.resolve(
    __dirname,
    "../../frontend/src/utils/contracts"
  );

  //fetching bytecode and ABI
  const OrderbookFactory = await hre.ethers.getContractFactory(
    "OrderbookFactory"
  );
  const Token1 = await hre.ethers.getContractFactory("Token1");
  const Token2 = await hre.ethers.getContractFactory("Token2");

  //creating an instance of our smart contract
  const orderbookFactory = await OrderbookFactory.deploy();
  const token1 = await Token1.deploy();
  const token2 = await Token2.deploy();

  console.log(
    "Deployed orderbookFacctory address:",
    `${orderbookFactory.target}`
  );
  console.log("Deployed token1 address:", `${token1.target}`);
  console.log("Deployed token2 address:", `${token2.target}`);

  // Guardar el ABI y la dirección del contrato OrderbookFactory
  saveContractInfo(buildDir, "OrderbookFactory", orderbookFactory);
  saveContractInfo(buildDir, "Token1", token1);
  saveContractInfo(buildDir, "Token2", token2);
}

// Función para guardar ABI y dirección en un archivo JSON
function saveContractInfo(
  directory: string,
  contractName: string,
  contractInstance: any
) {
  // Ruta para guardar la información del contrato
  const filePath = `${directory}/${contractName}.json`;

  // Crear el contenido JSON con la dirección y el ABI
  const data = {
    address: contractInstance.target,
    abi: contractInstance.interface.fragments, // Utilizamos los fragmentos del ABI
  };

  // Escribir el archivo
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
