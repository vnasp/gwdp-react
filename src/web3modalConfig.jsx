import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { http, createConfig, WagmiProvider } from "wagmi";
import { mainnet, polygon } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;

const chains = [mainnet, polygon];

const wagmiConfig = defaultWagmiConfig({
  autoConnect: true,
  chains,
  projectId,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
  },
});

createWeb3Modal({
  wagmiConfig,
  projectId: projectId,
  chains,
  themeMode: "dark",
});

console.log("Enviando Project ID a Web3Modal:", projectId);

const queryClient = new QueryClient();

export function Web3Provider({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
