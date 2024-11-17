"use client";

import React, { useEffect, useState } from 'react';
import { useAccount, useReadContract, useWriteContract, usePublicClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from "@nextui-org/react";
import { Search } from "lucide-react";
import { readContract } from 'viem';
import { Card, CardBody } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";

const CONTRACT_ADDRESS = '0xdCD4D37ED647122bB02bEB38470Ab8c93bDf3c79';
const CONTRACT_ABI = [
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


const ForumPage = () => {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient(); // Add this hook
  const [newPost, setNewPost] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');
  const [upvotes, setUpvotes] = useState(0);

  // Get message count
  const { data: messageCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getMessageCount',
    watch: true,
  });

  // Post message
  const { writeContract, isPending } = useWriteContract();

  // Load messages
  const loadMessages = async () => {
    if (!messageCount || !publicClient) return;

    try {
      const count = Number(messageCount);
      const newMessages = [];

      for (let i = 0; i < count; i++) {
        const message = await publicClient.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'messages',
          args: [BigInt(i)],
        });

        console.log(message)
        // [0n, 'Hello, this is a test message!', 30480621806593948403545617680133951813655001386305343912017256399063773938944n, 0n]

        newMessages.push({
          id: message.id ? Number(message.id) : i, // Use the index as fallback
          content: message[1],
          decryptedUpvotes: message.decryptedUpvotes ? Number(message.decryptedUpvotes) : 0,
        });
      }

      setMessages(newMessages.reverse()); // Show newest messages first

      // console.log(newMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
      setError('Failed to load messages');
    }
  };
  // Effect to load messages
  useEffect(() => {
    if (isConnected) {
      loadMessages();
    }
  }, [isConnected, messageCount]);

  const handlePost = async () => {
    if (!newPost.trim()) {
      setError('Please enter a message');
      return;
    }

    try {
      setIsPosting(true);
      setError('');

      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'postMessage',
        args: [newPost],
      });

      setNewPost('');
      await loadMessages();
    } catch (error) {
      console.error('Error posting message:', error);
      setError(error.message || 'Failed to post message');
    } finally {
      setIsPosting(false);
    }
  };

  const handleDecrypt = async (messageId) => {
    try {
      // Call the requestUpvoteDecryption function for the specific message ID
      console.log(`Requesting decryption for message ID: ${messageId}`);
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "requestUpvoteDecryption",
        args: [BigInt(messageId)],
      });

      console.log(`Decryption request sent for message ID: ${messageId}`);

      // Wait for a delay to ensure decryption is processed
      await new Promise((resolve) => setTimeout(resolve, 10000));

      // Read the decrypted upvotes
      const message = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'messages',
        args: [BigInt(messageId)],
      });

      console.log(`Decrypted upvotes for message ID ${messageId}:`, Number(message[3])); // Assuming decryptedUpvotes is the fourth item in the message array
    } catch (error) {
      console.error(`Error handling decryption for message ID ${messageId}:`, error);
    }
  };

  const handleVote = async (messageId, isUpvote) => {
    try {
      console.log(`Voting ${isUpvote ? 'up' : 'down'} for message ID: ${messageId}`);

      // Execute the vote transaction
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: isUpvote ? 'upvoteMessage' : 'downvoteMessage',
        args: [BigInt(messageId)],
      });

      // wait for 10 seconds
      await new Promise((resolve) => setTimeout(resolve, 20000));

      setUpvotes(upvotes + 1);

      console.log(`Voted ${isUpvote ? 'up' : 'down'} for message ID: ${messageId}`);

      // Reload the messages to reflect the updated state
      await loadMessages();
    } catch (error) {
      console.error('Error voting:', error);
      setError(isUpvote ? 'Failed to upvote' : 'Failed to downvote');
    }
  };

  return (
    <div className="flex p-8 pt-0 gap-3">
      <div className="basis-4/12">
        <div className="flex flex-col border-e-2 p-3 h-screen pe-6 gap-5">
          <div className="flex flex-col gap-5 items-center">
            <Avatar name={address || 'Anonymous'} className="w-20 h-20" src='/Nouns/nouns1.png' />
            <span className="font-semibold text-2xl">Fully Homomorphic Encrypted (FHE) Company Forum</span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span className='text-xl text-slate-700'>Total Posts: {messageCount?.toString() || '0'}</span>
            {/* <ConnectButton /> */}
          </div>

          <Divider />

          {isConnected && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center">
                <Textarea
                  variant="bordered"
                  placeholder="This is a safe space..."
                  className="w-full"
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">
                  {error}
                </div>
              )}

              <div className="flex justify-end items-center">
                <Button
                  size="sm"
                  onClick={handlePost}
                  disabled={!newPost.trim() || isPosting || isPending}
                  isLoading={isPosting || isPending}
                >
                  Post
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="basis-8/12">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            {messages.map((message) => (
              <Card key={message.id} className="border-r-4 border-b-4 rounded-2xl border-[#75bfc9]">
                <CardBody className="rounded-xl">
                  <div className="flex gap-3">
                    <div className="basis-1/12">
                      <div className="flex flex-col items-center justify-center">
                        <Button
                          isIconOnly
                          className="bg-white"
                          onClick={() => handleVote(message.id, true)}
                        >
                          <svg
                            viewBox="0 0 1024 1024"
                            fill="green"
                            height="23px"
                            width="23px"
                          >
                            <path d="M868 545.5L536.1 163a31.96 31.96 0 00-48.3 0L156 545.5a7.97 7.97 0 006 13.2h81c4.6 0 9-2 12.1-5.5L474 300.9V864c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V300.9l218.9 252.3c3 3.5 7.4 5.5 12.1 5.5h81c6.8 0 10.5-8 6-13.2z" />
                          </svg>
                        </Button>
                        {/* Decrypt key */}
                        {/* <Button className='bg-white' onClick={() => handleDecrypt(message.id)} >
                          <svg fill="none" viewBox="0 0 24 24" height="25px" width="25px">
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M6 8a3 3 0 00-3 3v2a3 3 0 106 0h6v2h2v-2h1v2h2v-4H9a3 3 0 00-3-3zm1 5v-2a1 1 0 10-2 0v2a1 1 0 102 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Button> */}
                        {(message.id === 1) ? <span>{upvotes}</span> : <span>0</span>}
                        <Button
                          isIconOnly
                          className="bg-white"
                          onClick={() => handleVote(message.id, false)}
                        >
                          <svg
                            viewBox="0 0 1024 1024"
                            fill="red"
                            height="23px"
                            width="23px"
                          >
                            <path d="M862 465.3h-81c-4.6 0-9 2-12.1 5.5L550 723.1V160c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v563.1L255.1 470.8c-3-3.5-7.4-5.5-12.1-5.5h-81c-6.8 0-10.5 8.1-6 13.2L487.9 861a31.96 31.96 0 0048.3 0L868 478.5c4.5-5.2.8-13.2-6-13.2z" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="basis-11/12">
                      <span>{message.content}</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default ForumPage;