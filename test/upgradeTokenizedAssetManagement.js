// scripts/upgrade.js
const { ethers, upgrades } = require("hardhat");

async function main() {
  const TokenizedAssetManagement = await ethers.getContractFactory("TokenizedAssetManagement");

  // Replace with the address of the existing proxy contract
  const proxyAddress = "0xb07Bb826578834F80Db1e88c653B4634dCAa784f";

  console.log("Upgrading TokenizedAssetManagement...");
  await upgrades.upgradeProxy(proxyAddress, TokenizedAssetManagement);
  console.log("TokenizedAssetManagement upgraded");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
