import { WalletConnectModal } from "@walletconnect/modal";

const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;

export const walletConnectModal = new WalletConnectModal({
  projectId,
  chains: ["eip155:1"], // Solo Ethereum Mainnet (puedes cambiarlo)
  optionalChains: ["eip155:137"], // Opcional: Agregar Polygon u otras redes
  themeMode: "dark", // Tema del modal
});