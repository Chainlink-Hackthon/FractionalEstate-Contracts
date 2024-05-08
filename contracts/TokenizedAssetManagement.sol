// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./AssetToken.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract TokenizedAssetManagement {
    address public owner;
    AggregatorV3Interface internal priceFeed;

    struct Asset {
        address tokenAddress;
        string uri;
        uint256 priceUSD;
    }

    mapping(address => Asset[]) public assets; // Map from the creator's address to an array of assets
    event AssetCreated(
        address indexed creator,
        address indexed tokenAddress,
        string uri,
        uint256 priceUSD
    );
    event AssetBought(
        address indexed buyer,
        address indexed tokenAddress,
        uint256 amount
    );

    constructor(address priceFeedAddress) {
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress); // Chainlink ETH/USD price feed
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function createAsset(
        string memory name,
        string memory symbol,
        uint256 totalSupply,
        uint256 priceUSD,
        string memory uri
    ) external onlyOwner {
        AssetToken token = new AssetToken(
            name,
            symbol,
            totalSupply,
            msg.sender
        );
        assets[msg.sender].push(Asset(address(token), uri, priceUSD)); // Store multiple assets per creator
        emit AssetCreated(msg.sender, address(token), uri, priceUSD);
    }

    function getLatestPrice() internal view returns (int256) {
        (, int256 price, , , ) = priceFeed.latestRoundData();
        return price;
    }

    function buyAsset(address tokenAddress) external payable {
        Asset[] memory userAssets = assets[msg.sender];
        bool assetExists = false;
        Asset memory asset;

        // Find the asset corresponding to the token address
        for (uint256 i = 0; i < userAssets.length; i++) {
            if (userAssets[i].tokenAddress == tokenAddress) {
                asset = userAssets[i];
                assetExists = true;
                break;
            }
        }

        require(assetExists, "Asset does not exist for the user");

        int256 ethUSDPrice = getLatestPrice(); // Get the current ETH/USD price
        require(ethUSDPrice > 0, "Invalid ETH/USD price");

        // Calculate the equivalent USD value of `msg.value`
        uint256 ethInUSD = (msg.value * uint256(ethUSDPrice)) / 1e8; // Chainlink price feeds have 8 decimals
        require(ethInUSD > 0, "Insufficient payment");

        // Calculate the number of tokens to transfer
        uint256 tokensToTransfer = (ethInUSD * 1e18) / asset.priceUSD; // 1e18 to adjust for decimal places

        AssetToken token = AssetToken(tokenAddress);
        require(
            token.balanceOf(address(this)) >= tokensToTransfer,
            "Not enough tokens available"
        );

        token.transfer(msg.sender, tokensToTransfer);

        emit AssetBought(msg.sender, tokenAddress, tokensToTransfer);
    }
}
