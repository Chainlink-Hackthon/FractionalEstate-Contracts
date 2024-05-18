// At the top of your script file
const { ethers, upgrades } = require("hardhat");

async function main() {
  const TokenizedAssetManagement = await ethers.getContractFactory("TokenizedAssetManagement");

  // Replace 'your_initial_owner_address' with the actual address you want to set as the owner
  const initialOwner = "0x0B3d07B26D2e5E1d0c2696d0E13d26BFD7344579";

  // Pass the initialOwner as an argument to the initializer
  const tam = await upgrades.deployProxy(TokenizedAssetManagement, [initialOwner], { initializer: "initialize" });
  console.log("TokenizedAssetManagement deployed to:", tam.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
