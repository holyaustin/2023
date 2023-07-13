require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
console.log(process.env.PRIVATE_KEY);

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
      accounts: process.env.PRIVATE_KEY,
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
