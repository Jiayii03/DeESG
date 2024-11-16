// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract SmartWallet {
    using SafeERC20 for IERC20;

    address public owner;
    address public deployer;
    IERC20 public greenToken;

    event OwnerUpdated(address indexed newOwner);
    event GreenTokenUpdated(address indexed newGreenToken);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    modifier onlyDeployer() {
        require(msg.sender == deployer, "Only deployer can call this function");
        _; 
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _; 
    }

    constructor(address _initialOwner, address _greenTokenAddress) {
        require(_initialOwner != address(0), "Owner cannot be the zero address");
        require(_greenTokenAddress != address(0), "Green Token address cannot be the zero address");

        owner = _initialOwner;
        deployer = msg.sender;
        greenToken = IERC20(_greenTokenAddress);
    }

    function updateOwner(address newOwner) external onlyDeployer {
        require(newOwner != address(0), "New owner cannot be the zero address");
        owner = newOwner;
        emit OwnerUpdated(newOwner);
    }

    function updateGreenTokenAddress(address newGreenToken) external onlyDeployer {
        require(newGreenToken != address(0), "Green Token address cannot be the zero address");
        greenToken = IERC20(newGreenToken);
        emit GreenTokenUpdated(newGreenToken);
    }

    function verifyAndWithdraw() external onlyOwner {
        uint256 balance = greenToken.balanceOf(address(this));
        require(balance > 0, "No tokens to withdraw");

        greenToken.safeTransfer(owner, balance);
        emit TokensWithdrawn(owner, balance);
    }

    function getGreenTokenBalance() external view returns (uint256) {
        return greenToken.balanceOf(address(this));
    }

    receive() external payable {}

    fallback() external payable {}
}
