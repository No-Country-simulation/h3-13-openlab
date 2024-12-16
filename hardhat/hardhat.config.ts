import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    sepolia: {
      url: "",
      accounts: [""],
    },
  },
};

export default config;
