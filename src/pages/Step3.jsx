import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import '@reown/appkit-wallet-button/react'
import axios from "axios";

const Step3 = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const WALLET_URL = import.meta.env.VITE_WALLET_URL;

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
        WALLET_URL,
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      disconnect();
      navigate("/request-progress");
    } catch (error) {
      setError(error.response?.data?.message || "Error en la verificación. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="step-3">
      {error && <div className="alert alert-warning">{error}</div>}
      <div className="title">Prepárate para recibir tus activos</div>
      <div className="subtitle">Conecta tu billetera</div>
      <div className="row text-center my-4">
        <div className="col-md-4 my-2">
          <div className="activo-box">
            <i className="fas fa-coins fa-3x mb-2"></i>
            <div className="activo-number">2</div>
            <div className="activo-sigla">GHUT</div>
          </div>
        </div>
        <div className="col-md-4 my-2">
          <div className="activo-box">
            <i className="fas fa-gem fa-3x mb-2"></i>
            <div className="activo-number">1</div>
            <div className="activo-sigla">GHGO</div>
          </div>
        </div>
        <div className="col-md-4 my-2">
          <div className="activo-box">
            <i className="fas fa-paint-brush fa-3x mb-2"></i>
            <div className="activo-number">1</div>
            <div className="activo-sigla">NFT</div>
          </div>
        </div>

      </div>
      <div className="wallets-buttons">
        {!isConnected ? (
            <>
            <div className="btn-send rounded-5"><appkit-wallet-button wallet="metamask" /></div>
            <div className="btn-send rounded-5"><appkit-wallet-button wallet="coinbase" /></div>
            <div className="btn-send rounded-5"><appkit-wallet-button wallet="walletConnect" /></div>
            <div className="btn-send rounded-5"><appkit-wallet-button wallet="trust" /></div>
            </>
        ) : (
          <div className="text-center">
            <button className="btn btn-send w-100 mt-3" onClick={sendAddressToBackend} disabled={loading}>
              {loading ? "Enviando..." : "Solicitar entrega de activos"}
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
