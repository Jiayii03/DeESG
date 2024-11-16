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
  name: 'Inco Rivest Testnet',
  network: 'rivest-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'INCO',
    symbol: 'INCO',
  },
  rpcUrls: {
    public: { http: ['https://validator.rivest.inco.org/'] },
    default: { http: ['https://validator.rivest.inco.org/'] },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://explorer.rivest.inco.org/' },
  },
  testnet: true,
}

// Initialize the QueryClient for React Query
const queryClient = new QueryClient();

// RainbowKit and Wagmi configuration
const config = getDefaultConfig({
  appName: "DeESG",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia, rivestTestnet], // Only Sepolia Testnet
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
