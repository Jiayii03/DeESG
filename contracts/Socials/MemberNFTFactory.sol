// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./MemberNFT.sol";

contract MembershipNFTFactory is Ownable {
    uint256 public contractCount;
    address[] public deployedContracts;
    mapping(uint256 => address) public contractById;

    event MembershipNFTCreated(address indexed newContract, uint256 contractId);

    constructor(address initialOwner) Ownable(initialOwner) {}

    function createMembershipNFT() external onlyOwner returns (address) {
        contractCount++;
        MembershipNFT newMembershipNFT = new MembershipNFT();
        deployedContracts.push(address(newMembershipNFT));
        contractById[contractCount] = address(newMembershipNFT);

        emit MembershipNFTCreated(address(newMembershipNFT), contractCount);
        return address(newMembershipNFT);
    }

    function getMembershipNFT(uint256 id) external view returns (address) {
        require(id > 0 && id <= contractCount, "Invalid contract ID");
        return contractById[id];
    }

    function getAllDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }
}
