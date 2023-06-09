require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();
const {
  PROJECT_ID,
  PRIVATE_KEYS,
  ETHERSCAN_KEY,
  POLYGONSCAN_KEY,
  ALCHEMY_MUMBAI_URL
} = process.env;

module.exports = {
  solidity: "0.8.7",
  networks: {
    hardhat: { chainId: 1337 },
    mumbai: {
      url: ALCHEMY_MUMBAI_URL,
      accounts: PRIVATE_KEYS.split(",")
    }
  },
  paths: {
    artifacts: "../artifacts"
  },
  etherscan: {
    apiKey: POLYGONSCAN_KEY
  }
};
