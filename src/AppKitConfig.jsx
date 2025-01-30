import { createAppKit } from "@reown/appkit/react";
import { WagmiProvider } from "wagmi";
import { mainnet, arbitrum } from "@reown/appkit/networks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

const queryClient = new QueryClient();

const projectId = import.meta.env.VITE_REOWN_PROJECT_ID;

const metadata = {
  name: "GH DataPioneers",
  description: "AppKit GH DataPioneers",
  url: import.meta.env.VITE_APP_URL,
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

const networks = [mainnet, arbitrum];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata,
  features: {
    analytics: true,
  },
  themeMode: 'light',
});

export function AppKitProvider({ children }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
