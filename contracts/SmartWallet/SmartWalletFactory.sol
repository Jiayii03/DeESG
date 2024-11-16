// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./SmartWallet.sol";

contract SmartWalletFactory {
    address public deployer;
    address public greenToken;
    address[] public deployedWallets;

    event WalletDeployed(address indexed walletAddress, address indexed initialOwner);
    event GreenTokenUpdated(address indexed newGreenToken);

    modifier onlyDeployer() {
        require(msg.sender == deployer, "Only deployer can call this function");
        _;
    }

    constructor(address _greenToken) {
        deployer = msg.sender;
        greenToken = _greenToken;
    }

    function updateGreenToken(address _newGreenToken) external onlyDeployer {
        require(_newGreenToken != address(0), "New green token address cannot be zero address");
        greenToken = _newGreenToken;
        emit GreenTokenUpdated(_newGreenToken);
    }

    function deploySmartWallet(address _initialOwner) external onlyDeployer returns (address) {
        SmartWallet newWallet = new SmartWallet(_initialOwner, greenToken);
        deployedWallets.push(address(newWallet));

        emit WalletDeployed(address(newWallet), _initialOwner);
        return address(newWallet);
    }

    function isDeployedWallet(address walletAddress) internal view returns (bool) {
        for (uint256 i = 0; i < deployedWallets.length; i++) {
            if (deployedWallets[i] == walletAddress) {
                return true;
            }
        }
        return false;
    }

    function updateOwnerInWallet(address payable walletAddress, address newOwner) external onlyDeployer {
        require(isDeployedWallet(walletAddress), "Wallet address is not a deployed wallet");

        SmartWallet(walletAddress).updateOwner(newOwner);
    }

    function getDeployedWallets() external view returns (address[] memory) {
        return deployedWallets;
    }
}
