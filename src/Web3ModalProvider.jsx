import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { walletConnect } from "wagmi/connectors";
import { mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Setup Query Client
const queryClient = new QueryClient();

// Obtener el Project ID de WalletConnect desde .env
const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;

// Metadata del proyecto
const metadata = {
  name: "GH DataPioneers",
  description: "Conecta tu billetera con WalletConnect",
  url: import.meta.env.VITE_APP_URL, // URL del proyecto
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Configurar las redes disponibles
const chains = [mainnet];

// Configurar Wagmi para **solo permitir WalletConnect**
const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  connectors: [
    walletConnect({ projectId }), // ✅ Solo permitimos WalletConnect
  ],
  metadata,
});

// Crear el modal con la configuración
createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: false, // Opcional
});

export function Web3ModalProvider({ children }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
