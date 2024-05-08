require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",

  networks: {
    sepholia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/TgoZ4ZlQr8Cw7Vi93RHCw65yr-XMc4LM", // Polygon Mumbai RPC endpoint
      accounts: [process.env.CONTRACT_OWNER_PRIVATE_KEY], // Replace with the private key of your Ethereum account
    },
  },
};
