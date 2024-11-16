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

const CONTRACT_ADDRESS = '0xdCD4D37ED647122bB02bEB38470Ab8c93bDf3c79'; // Replace with your deployed contract address
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
]; // Your contract ABI here


const ForumPage = () => {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient(); // Add this hook
  const [newPost, setNewPost] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState('');

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
      
      newMessages.push({
        id: Number(message.id),
        content: message.content,
        decryptedUpvotes: Number(message.decryptedUpvotes),
      });
    }
    
    setMessages(newMessages.reverse()); // Show newest messages first
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

  const handleVote = async (messageId, isUpvote) => {
    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: isUpvote ? 'upvoteMessage' : 'downvoteMessage',
        args: [BigInt(messageId)],
      });
      
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
          <div className="flex gap-5 items-center">
            <Avatar name={address || 'Anonymous'} className="w-20 h-20" />
            <span className="font-semibold text-2xl">Forum</span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>Total Posts: {messageCount?.toString() || '0'}</span>
            <ConnectButton />
          </div>

          <Divider />

          {isConnected && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-center">
                <Textarea
                  variant="bordered"
                  placeholder="Write something..."
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
          <div className="flex justify-between items-center p-3">
            <div>
              <span className="font-semibold text-2xl">All posts</span>
            </div>
            <Button
              size="md"
              radius="full"
              startContent={<Search size={16} color="gray" />}
              endContent={<span className="text-gray-400 ms-8 text-sm">Ctrl K</span>}
              className="text-gray-400 bg-gray-200 px-7 py-2"
            >
              <span className="font-sm">Search...</span>
            </Button>
          </div>

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
                          <i className="bi bi-caret-up-fill text-green-300" style={{ fontSize: "1.5rem" }}></i>
                        </Button>
                        <span className="text-sm font-semibold text-green-300">
                          {message.decryptedUpvotes || '?'}
                        </span>
                        <Button 
                          isIconOnly 
                          className="bg-white"
                          onClick={() => handleVote(message.id, false)}
                        >
                          <i className="bi bi-caret-down-fill text-red-300" style={{ fontSize: "1.5rem" }}></i>
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
    </div>
  );
};

export default ForumPage;