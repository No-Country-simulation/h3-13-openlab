import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  paths: {
    artifacts: "./artifacts",
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/pL77TKg5FWlzPukPXaJpGRtElEHspjzi",
      accounts: [
        "df57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
      ],
    },
  },
};

export default config;
