import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";






const wagmiConfig = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [mainnet, sepolia],
    transports: {
      // RPC URL for each chain
      [mainnet.id]: http(
        import.meta.env.ALCHEMY_URL,
      ),
      [sepolia.id]: http(
        import.meta.env.ALCHEMY_URL
      )
    },
  
    // Required API Keys
    walletConnectProjectId: import.meta.env.EACT_APP_WALLETCONNECT_PROJECT_ID,

    // Required App Info
    appName: "StakeMe",

    // Optional App Info
    // appDescription: "Your App Description",
    // appUrl: "https://family.co", // your app's url
    // appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);



const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
        {children}
            </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};