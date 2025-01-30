import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Step3 = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { open } = useWeb3Modal(); // Hook para abrir Web3Modal
  const { address, isConnected } = useAccount(); // Obtener dirección conectada
  const { disconnect } = useDisconnect(); // Desconectar billetera

  const BACKEND_WALLET_URL = import.meta.env.VITE_BACKEND_WALLET_URL;

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (!urlToken) {
      setError("Token inválido o faltante. Por favor, revisa el enlace.");
    } else {
      setToken(urlToken);
    }
  }, [searchParams]);

  const sendAddressToBackend = async () => {
    if (!token || !address) {
      setError("Falta el token o la dirección de la billetera.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        BACKEND_WALLET_URL,
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Transacción enviada:", response.data);
      alert("Transacción enviada con éxito.");
    } catch (error) {
      setError(error.response?.data?.message || "Error en la verificación. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="step-3">
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="alert alert-warning">Prepárate para recibir tus tokens. Conecta tu billetera.</div>

      <div className="d-flex flex-column justify-content-center align-items-center gap-4 mt-5">
        {!isConnected ? (
          <button className="btn btn-primary" onClick={open} disabled={loading}>
            {loading ? "Conectando..." : "Conectar Billetera"}
          </button>
        ) : (
          <div className="text-center">
            <p><strong>Dirección conectada:</strong> {address}</p>
            <button className="btn btn-success" onClick={sendAddressToBackend} disabled={loading}>
              {loading ? "Enviando..." : "Enviar Dirección"}
            </button>
            <button className="btn btn-danger mt-2" onClick={disconnect} disabled={loading}>
              Desconectar Billetera
            </button>
          </div>
        )}
      </div>

      <div className="wallets-disclaimer">
        La dirección de tu billetera no se almacenará y se usará únicamente para esta transacción.
      </div>
    </section>
  );
};

export default Step3;
