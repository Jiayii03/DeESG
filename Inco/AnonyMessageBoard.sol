// SPDX-License-Identifier: MIT
// Contract address: 0x40445Ff14431A014e7113aCC1a328EB9973e6Ef5
pragma solidity ^0.8.0;

import "fhevm/lib/TFHE.sol";
import "fhevm/gateway/GatewayCaller.sol";

contract SimplifiedMessageBoard is GatewayCaller {
    struct Message {
        string content;
        euint64 upvotes; // Encrypted upvotes
    }

    Message public message; // Single message storage
    uint64 public decryptedUpvotes; // Decrypted upvotes

    event MessagePosted(string content);
    event UpvoteDecrypted(uint64 upvotes);

    function postMessage(string calldata content) external {
        message = Message({
            content: content,
            upvotes: TFHE.asEuint64(0) // Initialize encrypted upvotes to 0
        });

        TFHE.allow(message.upvotes, msg.sender);
        TFHE.allow(message.upvotes, address(this));
        TFHE.allow(message.upvotes, 0xD20C84a28a18518DeF15d1a08745a31d144215D9); // Allow contract to manage upvotes

        emit MessagePosted(content);
    }

    function upvoteMessage() external {
        TFHE.allow(message.upvotes, msg.sender);
        TFHE.allow(message.upvotes, address(this));
        TFHE.allow(message.upvotes, 0xD20C84a28a18518DeF15d1a08745a31d144215D9);

        // Increment encrypted upvotes
        message.upvotes = TFHE.add(message.upvotes, TFHE.asEuint64(1));

        TFHE.allow(message.upvotes, msg.sender);
        TFHE.allow(message.upvotes, address(this));
        TFHE.allow(message.upvotes, 0xD20C84a28a18518DeF15d1a08745a31d144215D9); // Allow contract to manage updated upvotes
    }

    function requestUpvoteDecryption() external {
        TFHE.allow(message.upvotes, msg.sender);
        TFHE.allow(message.upvotes, address(this));
        TFHE.allow(message.upvotes, 0xD20C84a28a18518DeF15d1a08745a31d144215D9); // Ensure contract can decrypt upvotes

        uint256[] memory cts = new uint256[](1);
        cts[0] = Gateway.toUint256(message.upvotes);

        // Request decryption of the upvotes
        Gateway.requestDecryption(cts, this.upvoteDecryptionCallback.selector, 0, block.timestamp + 100, false);
    }

    function upvoteDecryptionCallback(uint256 requestId, uint64 _decryptedUpvotes) public onlyGateway returns (bool) {
        // Update the public decrypted upvotes
        decryptedUpvotes = _decryptedUpvotes;

        emit UpvoteDecrypted(_decryptedUpvotes);
        return true;
    }
}
