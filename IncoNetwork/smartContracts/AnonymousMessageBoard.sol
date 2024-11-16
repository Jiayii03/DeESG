// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "fhevm/lib/TFHE.sol";
import "fhevm/gateway/GatewayCaller.sol";

contract AnonymousMessageBoard is GatewayCaller {
    struct Message {
        uint64 id;
        string content;
        euint64 upvotes; // Encrypted upvotes
        uint64 decryptedUpvotes; // Decrypted upvotes
        mapping(address => bool) hasUpvoted; // Tracks if an address has been upvoted
        mapping(address => bool) hasDownvoted; // Tracks if an address has been downvoted
    }

    mapping(uint64 => Message) public messages; // Map of message IDs to messages
    mapping(uint256 => uint64) private requestIdToMessageId; // Map requestId to messageId

    event UpvoteDecrypted(uint64 messageId, uint64 decryptedUpvotes);
    event MessagePosted(uint64 indexed messageId, string content);
    event Voted(uint64 indexed messageId, address indexed voter);

    uint64 private messageId = 0; // Initialize messageId to 0
    address constant GATEWAY_ADDRESS = 0xD20C84a28a18518DeF15d1a08745a31d144215D9;

    function postMessage(string calldata content) external {
        messages[messageId].id = messageId;
        messages[messageId].content = content;
        messages[messageId].upvotes = TFHE.asEuint64(0); // Initialize encrypted upvotes to 0
        messages[messageId].decryptedUpvotes = 0;

        TFHE.allow(messages[messageId].upvotes, msg.sender);
        TFHE.allow(messages[messageId].upvotes, address(this));
        TFHE.allow(messages[messageId].upvotes, GATEWAY_ADDRESS);

        emit MessagePosted(messageId, content);
        messageId++;
    }

    function upvoteMessage(uint64 _messageId) external {
        require(_messageId < messageId, "Message does not exist");
        require(!messages[_messageId].hasUpvoted[msg.sender], "You have already upVoted on this message");

        TFHE.allow(messages[_messageId].upvotes, msg.sender);
        TFHE.allow(messages[_messageId].upvotes, address(this));
        TFHE.allow(messages[_messageId].upvotes, GATEWAY_ADDRESS);

        // Increment encrypted upvotes
        messages[_messageId].upvotes = TFHE.add(messages[_messageId].upvotes, TFHE.asEuint64(1));

        TFHE.allow(messages[_messageId].upvotes, msg.sender);
        TFHE.allow(messages[_messageId].upvotes, address(this));
        TFHE.allow(messages[_messageId].upvotes, GATEWAY_ADDRESS);

        // Mark the user as having voted
        messages[_messageId].hasUpvoted[msg.sender] = true;

        emit Voted(_messageId, msg.sender);
    }

    function downvoteMessage(uint64 _messageId) external {
        require(_messageId < messageId, "Message does not exist");
        require(!messages[_messageId].hasDownvoted[msg.sender], "You have already down voted on this message");

        TFHE.allow(messages[_messageId].upvotes, msg.sender);
        TFHE.allow(messages[_messageId].upvotes, address(this));
        TFHE.allow(messages[_messageId].upvotes, GATEWAY_ADDRESS);

        // Decrement encrypted upvotes
        messages[_messageId].upvotes = TFHE.sub(messages[_messageId].upvotes, TFHE.asEuint64(1));

        TFHE.allow(messages[_messageId].upvotes, msg.sender);
        TFHE.allow(messages[_messageId].upvotes, address(this));
        TFHE.allow(messages[_messageId].upvotes, GATEWAY_ADDRESS);

        // Mark the user as having voted
        messages[_messageId].hasDownvoted[msg.sender] = true;

        emit Voted(_messageId, msg.sender);
    }

    function requestUpvoteDecryption(uint64 _messageId) external {
        require(_messageId < messageId, "Message does not exist");

        TFHE.allow(messages[_messageId].upvotes, msg.sender);
        TFHE.allow(messages[_messageId].upvotes, address(this));
        TFHE.allow(messages[_messageId].upvotes, GATEWAY_ADDRESS);

        uint256[] memory cts = new uint256[](1);
        cts[0] = Gateway.toUint256(messages[_messageId].upvotes);

        uint256 requestId = Gateway.requestDecryption(
            cts,
            this.upvoteDecryptionCallback.selector,
            0,
            block.timestamp + 100,
            false
        );

        requestIdToMessageId[requestId] = _messageId;
    }

    function upvoteDecryptionCallback(uint256 requestId, uint64 _decryptedUpvotes)
        external
        onlyGateway
        returns (bool)
    {
        uint64 _messageId = requestIdToMessageId[requestId];
        messages[_messageId].decryptedUpvotes = _decryptedUpvotes;

        emit UpvoteDecrypted(_messageId, _decryptedUpvotes);
        return true;
    }

    function getMessageCount() external view returns (uint64) {
        return messageId;
    }
}
