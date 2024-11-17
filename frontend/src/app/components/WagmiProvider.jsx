"use client"; // Ensure this runs only on the client

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  darkTheme,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { sepolia } from "wagmi/chains"; // Import Ethereum Sepolia Testnet

const rivestTestnet = {
  id: 21097,
  name: "Inco Rivest Testnet",
  network: "rivest-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "INCO",
    symbol: "INCO",
  },
  rpcUrls: {
    public: { http: ["https://validator.rivest.inco.org/"] },
    default: { http: ["https://validator.rivest.inco.org/"] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://explorer.rivest.inco.org/" },
  },
  testnet: true,
};

const polygonAmoyTestnet = {
  id: 80002 ,
  name: "Polygon Amoy Testnet",
  network: "polygon-amoy-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "POL",
    symbol: "POL",
  },
  rpcUrls: {
    public: { http: ["https://rpc-amoy.polygon.technology/"] },
    default: { http: ["https://rpc-amoy.polygon.technology/"] },
  },
  blockExplorers: {
    default: { name: "PolygonScan", url: "https://amoy.polygonscan.com/" },
  },
  testnet: true,
};

const lineaSepolia = {
  id: 59141,
  name: "Linea Sepolia Testnet",
  network: "linea-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.sepolia.linea.build"] },
    default: { http: ["https://rpc.sepolia.linea.build"] },
  },
  blockExplorers: {
    default: {
      name: "Linea Explorer",
      url: "https://sepolia.lineascan.build",
    },
  },
  testnet: true,
};

const scrollSepolia = {
  id: 534351,
  name: "Scroll Sepolia",
  network: "scroll-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://sepolia-rpc.scroll.io"] },
    default: { http: ["https://sepolia-rpc.scroll.io"] },
  },
  blockExplorers: {
    default: {
      name: "Scroll Explorer",
      url: "https://sepolia.scrollscan.com",
    },
  },
  testnet: true,
};

const zircuitSepolia = {
  id: 48899,
  name: "Zircuit Sepolia",
  network: "zircuit-sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://zircuit1.p2pify.com"] },
    default: { http: ["https://zircuit1.p2pify.com"] },
  },
  blockExplorers: {
    default: {
      name: "Zircuit Explorer",
      url: "https://explorer.zircuit.com",
    },
  },
  testnet: true,
};

// Initialize the QueryClient for React Query
const queryClient = new QueryClient();

// RainbowKit and Wagmi configuration
const config = getDefaultConfig({
  appName: "DeESG",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    sepolia,
    rivestTestnet,
    polygonAmoyTestnet,
    lineaSepolia,
    scrollSepolia,
    zircuitSepolia,
  ],
  ssr: true, // Required for SSR apps
});

export default function Providers({ children }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={config.chains}
          theme={lightTheme({
            accentColor: "#75bfc9", // Set button background color
            accentColorForeground: "#ffffff", // Text color on button
            fontStack: "rounded", // Use system font or specify a custom font here
            borderRadius: "large", // Customize the border radius
          })}
          initialChain={sepolia} // Ensure Sepolia is the default chain
          modalSize="compact" // Optional: Adjust the size of the RainbowKit modal
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
