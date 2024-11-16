const { ethers } = require("ethers");

// Replace these with your actual values
const FACTORY_CONTRACT_ADDRESS = "0x55D09eC366fe1c61b6EE922236BfEECB9b025C66";
const FACTORY_ABI = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "messageBoard",
          "type": "address"
        }
      ],
      "name": "MessageBoardCreated",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "createMessageBoard",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "getMessageBoardsByOwner",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ownerMessageBoards",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

// Replace with your network's RPC URL and private key
const RIVEST_RPC_URL = "https://validator.rivest.inco.org/";
const PRIVATE_KEY = "961e9f1f5a3a817c3337ffa21f016eaebe799cd896599eb501de173b54e1e7ad";

async function main() {
  const provider = new ethers.JsonRpcProvider(RIVEST_RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  const factoryContract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, FACTORY_ABI, wallet);

  try {
    // 1. Create a new message board
    console.log("\nCreating new message board...");
    const createTx = await factoryContract.createMessageBoard();
    const createReceipt = await createTx.wait();
    
    // Get the new message board address from the event
    const messageBoardCreatedEvent = createReceipt.logs
      .find(log => log.fragment?.name === 'MessageBoardCreated');
    const messageBoardAddress = messageBoardCreatedEvent.args.messageBoard;
    console.log("New message board created at:", messageBoardAddress);

    // 2. Get all message boards owned by the wallet
    const myBoards = await factoryContract.getMessageBoardsByOwner(wallet.address);
    console.log("\nMy message boards:", myBoards);
  } catch (error) {
    console.error("Error interacting with the contract:", error);
  }
}

main().catch((error) => {
  console.error("Error in script execution:", error);
});
