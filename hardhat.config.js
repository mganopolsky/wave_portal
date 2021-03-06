require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// Import and configure dotenv
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      // This value will be replaced on runtime
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
      gas: 2100000,
      gasPrice: 8000000000,
    },
    /*
    mainnet: {
      chainId: 1,
      url: process.env.PROD_ALCHEMY_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
    */
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};