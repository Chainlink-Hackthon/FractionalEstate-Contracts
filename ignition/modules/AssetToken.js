const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AssetTokenModule", (m) => {
  const maxSupply = BigInt(100000) * BigInt(10 ** 18);

  const assettoken = m.contract("AssetToken", [
    "Villa",
    "VLB",
    100000,
    "0x0B3d07B26D2e5E1d0c2696d0E13d26BFD7344579",
  ]);

  return { assettoken };
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
