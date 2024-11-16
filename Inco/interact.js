const { ethers } = require("ethers");

const CONTRACT_ADDRESS = "0x40445Ff14431A014e7113aCC1a328EB9973e6Ef5"; // Replace with your contract address
const ABI = [
  {
    "anonymous": false,
    "inputs": [
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
        "name": "upvotes",
        "type": "uint64"
      }
    ],
    "name": "UpvoteDecrypted",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "decryptedUpvotes",
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
    "inputs": [],
    "name": "message",
    "outputs": [
      {
        "internalType": "string",
        "name": "content",
        "type": "string"
      },
      {
        "internalType": "euint64",
        "name": "upvotes",
        "type": "uint256"
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
    "inputs": [],
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
    "inputs": [],
    "name": "upvoteMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const RIVEST_RPC_URL = "https://validator.rivest.inco.org/";
const PRIVATE_KEY = "961e9f1f5a3a817c3337ffa21f016eaebe799cd896599eb501de173b54e1e7ad"; // Replace with your private key

async function main() {
  const provider = new ethers.JsonRpcProvider(RIVEST_RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

  try {
    // Post a message
    console.log("Posting a message...");
    const postTx = await contract.postMessage("Hello, this is a test message!");
    await postTx.wait();
    console.log("Message posted!");

    // Retrieve the posted message
    console.log("Retrieving message...");
    const message = await contract.message();
    console.log("Message content:", message.content);

    // Upvote the message
    console.log("Upvoting the message...");
    const upvoteTx = await contract.upvoteMessage();
    await upvoteTx.wait();
    console.log("Message upvoted!");

    // Request upvote decryption
    console.log("Requesting upvote decryption...");
    const decryptionTx = await contract.requestUpvoteDecryption();
    await decryptionTx.wait();
    console.log("Decryption requested!");

    // Wait for decryption to complete
    console.log("Waiting for decryption...");
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait 10 seconds

    // Retrieve decrypted upvotes
    const decryptedUpvotes = await contract.decryptedUpvotes();
    console.log("Decrypted upvotes:", decryptedUpvotes.toString());
  } catch (error) {
    console.error("Error interacting with the contract:", error);
  }
}

main().catch((error) => {
  console.error("Error in script execution:", error);
});
