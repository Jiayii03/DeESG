// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./AnonymousMessageBoard.sol"; // Import the AnonymousMessageBoard contract

contract AnonymousMessageBoardFactory {
    // Event emitted when a new message board is created
    event MessageBoardCreated(address indexed owner, address messageBoard);

    // Mapping to track the owner of each message board
    mapping(address => address[]) public ownerMessageBoards;

    /**
     * @notice Creates and deploys a new AnonymousMessageBoard instance
     * @return The address of the deployed AnonymousMessageBoard
     */
    function createMessageBoard() external returns (address) {
        // Deploy a new instance of AnonymousMessageBoard
        AnonymousMessageBoard newMessageBoard = new AnonymousMessageBoard();

        // Transfer ownership of the new message board to the caller (optional, if ownership is needed)
        ownerMessageBoards[msg.sender].push(address(newMessageBoard));

        // Emit the creation event
        emit MessageBoardCreated(msg.sender, address(newMessageBoard));

        return address(newMessageBoard);
    }

    /**
     * @notice Returns all message boards created by a specific owner
     * @param owner The address of the owner
     * @return An array of message board addresses created by the owner
     */
    function getMessageBoardsByOwner(address owner) external view returns (address[] memory) {
        return ownerMessageBoards[owner];
    }
}
