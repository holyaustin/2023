require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });
const XINFIN_NETWORK_URL = process.env.XINFIN_NETWORK_URL;
const XINFIN_PRIVATE_KEY = process.env.XINFIN_PRIVATE_KEY;
console.log(process.env.XINFIN_NETWORK_URL);
console.log(process.env.XINFIN_PRIVATE_KEY);

module.exports = {
  
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    xinfin: {
      url: 'https://erpc.xinfin.network',
      accounts: process.env.PRIVATE_KEY,
    },
    apothem: {
      url: 'https://erpc.apothem.network', 
      accounts: XINFIN_PRIVATE_KEY,
    },

  },
  solidity: {
    version: "0.8.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
