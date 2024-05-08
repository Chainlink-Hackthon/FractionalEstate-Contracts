const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("TokenizedAssetManagement", (m) => {
  const assetManagement = m.contract("TokenizedAssetManagement", [
    "0x694AA1769357215DE4FAC081bf1f309aDC325306",
  ]);

  return { assetManagement };
});

// const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// module.exports = buildModule("TokenModule", (m) => {
//   const tokenContract = m.contract("Token", [1000, "Silopi"] );

//   return { tokenContract };
// });

// uint _cap, string memory _name

// string memory name,
//         string memory symbol,
//         uint256 _maxSupply,
//         address owner
