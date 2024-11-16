const { ethers } = require("ethers");

const CONTRACT_ADDRESS = "0xdCD4D37ED647122bB02bEB38470Ab8c93bDf3c79";
const ABI =  [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "messageId",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "content",
        "type": "string"
      }
    ],
    "name": "MessagePosted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "messageId",
        "type": "uint64"
      },
      {
        "indexed": false,
        "internalType": "uint64",
        "name": "decryptedUpvotes",
        "type": "uint64"
      }
    ],
    "name": "UpvoteDecrypted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint64",
        "name": "messageId",
        "type": "uint64"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter",
        "type": "address"
      }
    ],
    "name": "Voted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_messageId",
        "type": "uint64"
      }
    ],
    "name": "downvoteMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMessageCount",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "name": "messages",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "id",
        "type": "uint64"
      },
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "internalType": "euint64",
        "name": "upvotes",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "decryptedUpvotes",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      }
    ],
    "name": "postMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_messageId",
        "type": "uint64"
      }
    ],
    "name": "requestUpvoteDecryption",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "requestId",
        "type": "uint256"
      },
      {
        "internalType": "uint64",
        "name": "_decryptedUpvotes",
        "type": "uint64"
      }
    ],
    "name": "upvoteDecryptionCallback",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "_messageId",
        "type": "uint64"
      }
    ],
    "name": "upvoteMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const RIVEST_RPC_URL = "https://validator.rivest.inco.org/";
const PRIVATE_KEY = "961e9f1f5a3a817c3337ffa21f016eaebe799cd896599eb501de173b54e1e7ad";

async function main() {
  const provider = new ethers.JsonRpcProvider(RIVEST_RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  try {
    // Get initial message count
    const initialCount = await contract.getMessageCount();
    console.log("Initial message count:", initialCount.toString());

    // Post a message
    console.log("\nPosting a message...");
    const postTx = await contract.postMessage("Hello, this is a test message!");
    const postReceipt = await postTx.wait();

    // Get the MessagePosted event
    const messagePostedEvent = postReceipt.logs.find(
      (log) => log.fragment?.name === "MessagePosted"
    );

    const messageId = messagePostedEvent.args.messageId;
    console.log("Message posted with ID:", messageId.toString());

    // Get message data
    const message = await contract.messages(messageId);
    console.log("\nMessage data:");
    console.log("Content:", message.content);
    console.log("Current decrypted upvotes:", message.decryptedUpvotes.toString());

    // Upvote the message
    console.log("\nUpvoting the message...");
    const upvoteTx = await contract.upvoteMessage(messageId);
    await upvoteTx.wait();
    console.log("Message upvoted!");

    // Second upvote
    console.log("\nTrying to upvote the message again...");
    try {
      const upvoteTx2 = await contract.upvoteMessage(messageId);
      await upvoteTx2.wait();
      console.log("Message upvoted again!");
    } catch (error) {
      console.error("Failed to upvote the message again:", error.message);
    }

    // Downvote the message
    console.log("\nDownvoting the message...");
    const downvoteTx = await contract.downvoteMessage(messageId);
    await downvoteTx.wait();
    console.log("Message downvoted!");

    // Request upvote decryption
    console.log("\nRequesting upvote decryption...");
    const decryptionTx = await contract.requestUpvoteDecryption(messageId);
    const decryptionReceipt = await decryptionTx.wait();
    console.log("Decryption requested!");

    // Wait for decryption callback
    console.log("\nWaiting for decryption callback (10 seconds)...");
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Get updated message data with decrypted upvotes
    const updatedMessage = await contract.messages(messageId);
    console.log("\nUpdated message data:");
    console.log("Message ID:", messageId.toString());
    console.log("Content:", updatedMessage.content);
    console.log("Decrypted upvotes:", updatedMessage.decryptedUpvotes.toString());
  } catch (error) {
    console.error("Error interacting with the contract:", error);
    if (error.data) {
      console.error("Error data:", error.data);
    }
  }
}

main().catch((error) => {
  console.error("Error in script execution:", error);
  process.exit(1);
});