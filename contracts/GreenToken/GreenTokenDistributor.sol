// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "./DataStorage.sol";
import "./GreenToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GreenTokenDistributor is Ownable {
    DataStorage public dataStorage;
    GreenToken public greenToken;
    address public serverWallet;
    uint256 public rewardAmount = 5 * 10**18;

    event DataStoredAndRewarded(
        uint256 CO2_emissions,
        uint256 methane_emissions,
        uint256 NOx_emissions,
        uint256 PM_emissions,
        uint256 humidity,
        uint256 temperature,
        address indexed walletAddress,
        uint256 timestamp,
        uint256 rewardAmount,
        bytes32 txHash
    );

    constructor(
        DataStorage _dataStorage,
        GreenToken _greenToken,
        address _serverWallet
    ) Ownable(0x7bcbaE2C9Ebf878Fdbb4ADB750f58A8fdf74803B) {
        dataStorage = _dataStorage;
        greenToken = _greenToken;
        serverWallet = _serverWallet;
    }

    function storeDataAndReward(
        uint256 _CO2_emissions,
        uint256 _methane_emissions,
        uint256 _NOx_emissions,
        uint256 _PM_emissions,
        uint256 _humidity,
        uint256 _temperature
    ) external {
        dataStorage.storeData(
            _CO2_emissions,
            _methane_emissions,
            _NOx_emissions,
            _PM_emissions,
            _humidity,
            _temperature,
            msg.sender
        );

        require(
            greenToken.transferFrom(owner(), serverWallet, rewardAmount),
            "Token transfer failed"
        );

        emit DataStoredAndRewarded(
            _CO2_emissions,
            _methane_emissions,
            _NOx_emissions,
            _PM_emissions,
            _humidity,
            _temperature,
            msg.sender,
            block.timestamp,
            rewardAmount,
            keccak256(
                abi.encodePacked(
                    _CO2_emissions,
                    _methane_emissions,
                    _NOx_emissions,
                    _PM_emissions,
                    _humidity,
                    _temperature,
                    msg.sender,
                    block.timestamp
                )
            )
        );
    }

    function updateServerWallet(address _newServerWallet) external onlyOwner {
        serverWallet = _newServerWallet;
    }

    function updateRewardAmount(uint256 _newRewardAmount) external onlyOwner {
        rewardAmount = _newRewardAmount;
    }
}
