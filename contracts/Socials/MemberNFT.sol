// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";

contract MembershipNFT is ERC1155, ERC1155Burnable {
    uint256 public constant MEMBER = 1;
    string private _contractURI;

    constructor() 
        ERC1155("https://teal-rapid-sloth-873.mypinata.cloud/ipfs/QmRkCiWxtNdaAKH8PyobwRWzox1EoUBGu5y1pnnBe7c2Uc/{id}.json") 
    {
        _contractURI = "https://teal-rapid-sloth-873.mypinata.cloud/ipfs/QmRkCiWxtNdaAKH8PyobwRWzox1EoUBGu5y1pnnBe7c2Uc/collection.json";
    }

    function mint(address to) public {
        _mint(to, MEMBER, 1, "");
    }

    function contractURI() public view returns (string memory) {
        return _contractURI;
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public virtual override {
        require(from == address(0) || to == address(0), "Transfers disabled");
        super.safeTransferFrom(from, to, id, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override {
        require(from == address(0) || to == address(0), "Batch transfers disabled");
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }
}
