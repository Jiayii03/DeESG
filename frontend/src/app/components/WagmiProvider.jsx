"use client"; // Ensure this runs only on the client

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

// Initialize the QueryClient for React Query
const queryClient = new QueryClient();

// RainbowKit and Wagmi configuration
const config = getDefaultConfig({
  appName: "DeESG",
  projectId: "YOUR_PROJECT_ID", // Replace this with your actual WalletConnect project ID
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true, // Required for SSR apps
});

export default function Providers({ children }) {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          chains={config.chains}
          theme={darkTheme({
            accentColor: "#75bfc9", // Set button background color
            accentColorForeground: "#ffffff", // Text color on button
            fontStack: "rounded", // Use system font or specify a custom font here
            borderRadius: "large", // Customize the border radius
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiConfig>
  );
}
