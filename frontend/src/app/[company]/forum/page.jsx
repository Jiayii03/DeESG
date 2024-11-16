"use client";

import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Paper,
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Avatar,
  Divider,
  IconButton,
  InputAdornment,
  Select,
  MenuItem,
  Chip,
  LinearProgress,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import { useParams } from "next/navigation";
import BusinessIcon from "@mui/icons-material/Business";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useAccount } from "wagmi";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/material/styles";

export default function ForumPage() {
  const { company } = useParams();
  const { address } = useAccount();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ content: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentUser, setCurrentUser] = useState({
    name: address
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : "Anonymous",
    avatar: `https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.floor(
      Math.random() * 1000000
    )}`,
  });
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser.name);

  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        author: "John Doe",
        content: "Discussion about environmental initiatives...",
        upvotes: 0,
        downvotes: 0,
        timestamp: "2024-03-20",
      },
    ];
    setPosts(mockPosts);
  }, [company]);

  const handleCreatePost = () => {
    if (!newPost.content.trim()) {
      toast.error("Please write something before posting");
      return;
    }

    const newPostData = {
      id: posts.length + 1,
      ...newPost,
      author: currentUser.name,
      authorAvatar: currentUser.avatar,
      likes: 0,
      comments: 0,
      timestamp: new Date().toISOString().split("T")[0],
    };
    setPosts([newPostData, ...posts]);
    setNewPost({ content: "" });
    toast.success("Post created successfully!");
  };

  const handleNameUpdate = () => {
    setCurrentUser({ ...currentUser, name: newName });
    setIsEditingName(false);
  };

  const companyData = {
    name: "Tesla",
    logo: "/tesla_logo.png",
    location: "Austin, Texas",
    website: "www.tesla.com",
    description:
      "Tesla's mission is to accelerate the world's transition to sustainable energy.",
    founded: "2003",
    ceo: "Elon Musk",
    employees: "127,855",
    industry: "Automotive, Clean Energy",
    marketCap: "$545.29B",
    stockSymbol: "TSLA",
  };

  const pulseAnimation = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  `;

  const AnimatedIconButton = styled(IconButton)`
    transition: all 0.2s ease-in-out;

    &:active {
      animation: ${pulseAnimation} 0.3s ease-in-out;
    }

    &:hover {
      transform: scale(1.1);
    }
  `;

  const VoteCount = styled(Typography)`
    min-width: 20px;
    text-align: center;
    transition: all 0.2s ease-in-out;
  `;

  const handleVote = (postId, voteType) => {
    const button = document.querySelector(`#vote-${voteType}-${postId}`);
    if (button) {
      button.style.animation = `${pulseAnimation} 0.3s ease-in-out`;
      setTimeout(() => {
        button.style.animation = "";
      }, 300);
    }

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            upvotes:
              voteType === "up" ? (post.upvotes || 0) + 1 : post.upvotes || 0,
            downvotes:
              voteType === "down"
                ? (post.downvotes || 0) + 1
                : post.downvotes || 0,
          };
        }
        return post;
      })
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Toaster position="top-right" />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Company Forum
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}></Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Company Profile */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar sx={{ width: 50, height: 50, mr: 2 }}>
                {companyData.name[0]}
              </Avatar>
              <Box>
                <Typography variant="h6">{companyData.name}</Typography>
                <Chip
                  label="ESG Score"
                  size="small"
                  sx={{
                    bgcolor: "#ffeeba",
                    mr: 1,
                  }}
                />
                <Chip
                  label="Pending"
                  size="small"
                  sx={{ bgcolor: "#ffc107" }}
                />
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                ESG Score
              </Typography>
              <LinearProgress
                variant="determinate"
                value={0}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "#e9ecef",
                }}
              />
              <Typography variant="body2" color="text.secondary" align="right">
                0%
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Sectors</Typography>
              <Typography variant="body2" color="text.secondary">
                --
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2">Twitter</Typography>
              <Typography variant="body2" color="text.secondary">
                --
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2">Company Website</Typography>
              <Typography variant="body2" color="text.secondary">
                --
              </Typography>
            </Box>
          </Paper>

          {/* New Company Details Card */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Company Details
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Founded
                </Typography>
                <Typography variant="body1">{companyData.founded}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  CEO
                </Typography>
                <Typography variant="body1">{companyData.ceo}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Employees
                </Typography>
                <Typography variant="body1">{companyData.employees}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Industry
                </Typography>
                <Typography variant="body1">{companyData.industry}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Market Cap
                </Typography>
                <Typography variant="body1">{companyData.marketCap}</Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Stock Symbol
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    display: "inline-block",
                    bgcolor: "rgba(91, 181, 217, 0.1)",
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 600,
                    color: "#5BB5D9",
                  }}
                >
                  {companyData.stockSymbol}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  About
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, lineHeight: 1.6 }}>
                  {companyData.description}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column - Forum Content */}
        <Grid item xs={12} md={9}>
          {/* Create Post Section */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Create Post
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={newPost.content}
              onChange={(e) => setNewPost({ content: e.target.value })}
              placeholder="What's on your mind?"
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={handleCreatePost}
              sx={{
                bgcolor: "#5BB5D9",
                "&:hover": { bgcolor: "#4A99B8" },
              }}
            >
              Post
            </Button>
          </Paper>

          {/* Posts List */}
          <Box>
            {posts.map((post) => (
              <Paper key={post.id} sx={{ p: 3, mb: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar src={post.authorAvatar} sx={{ mr: 2 }}>
                    {post.author[0]}
                  </Avatar>
                  <Typography>{post.author}</Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {post.content}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <AnimatedIconButton
                    onClick={() => handleVote(post.id, "up")}
                    color="primary"
                    id={`vote-up-${post.id}`}
                  >
                    <ThumbUpIcon />
                  </AnimatedIconButton>
                  <VoteCount>{post.upvotes || 0}</VoteCount>
                  <AnimatedIconButton
                    onClick={() => handleVote(post.id, "down")}
                    color="error"
                    id={`vote-down-${post.id}`}
                  >
                    <ThumbDownIcon />
                  </AnimatedIconButton>
                  <VoteCount>{post.downvotes || 0}</VoteCount>
                </Box>
              </Paper>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
