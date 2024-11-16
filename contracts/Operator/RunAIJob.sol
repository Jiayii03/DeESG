// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Chainlink, ChainlinkClient} from "@chainlink/contracts@1.2.0/src/v0.8/ChainlinkClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts@1.2.0/src/v0.8/shared/access/ConfirmedOwner.sol";

contract RunAIJob is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    uint256 private constant ORACLE_PAYMENT = (1 * LINK_DIVISIBILITY) / 10;

    address public oracleAddress;
    string public jobId;
    uint256 public latestESGScore;

    event RequestSent(bytes32 indexed requestId);
    event ESGScoreReceived(bytes32 indexed requestId, uint256 esgScore);
    event OracleAddressUpdated(address newOracle);
    event JobIdUpdated(string newJobId);

    constructor(address _oracleAddress, string memory _jobId) ConfirmedOwner(msg.sender) {
        _setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789);
        oracleAddress = _oracleAddress;
        jobId = _jobId;
    }


    function requestESGScore() public {
        // Build the Chainlink request
        Chainlink.Request memory req = _buildChainlinkRequest(
            stringToBytes32(jobId),
            address(this),
            this.fulfillESGScore.selector
        );

        // Send the request to the Chainlink oracle
        bytes32 reqId = _sendChainlinkRequestTo(oracleAddress, req, ORACLE_PAYMENT);
        emit RequestSent(reqId);
    }


    function fulfillESGScore(bytes32 _requestId, uint256 _esgScore) public recordChainlinkFulfillment(_requestId) {
        latestESGScore = _esgScore; // Store the ESG score
        emit ESGScoreReceived(_requestId, _esgScore);
    }

    function updateOracleAddress(address newOracle) external onlyOwner {
        oracleAddress = newOracle;
        emit OracleAddressUpdated(newOracle);
    }

    function updateJobId(string memory newJobId) external onlyOwner {
        jobId = newJobId;
        emit JobIdUpdated(newJobId);
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}