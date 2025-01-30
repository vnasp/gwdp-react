import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import '@reown/appkit-wallet-button/react'
import axios from "axios";

const Step3 = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

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
      <div class="row text-center my-4">
        <div class="col-md-4 my-2">
          <div class="activo-box">
            <i class="fas fa-coins fa-3x mb-2"></i>
            <div class="activo-number">2</div>
            <div class="activo-sigla">GHUT</div>
          </div>
        </div>
        <div class="col-md-4 my-2">
          <div class="activo-box">
            <i class="fas fa-gem fa-3x mb-2"></i>
            <div class="activo-number">1</div>
            <div class="activo-sigla">GHGO</div>
          </div>
        </div>
        <div class="col-md-4 my-2">
          <div class="activo-box">
            <i class="fas fa-paint-brush fa-3x mb-2"></i>
            <div class="activo-number">1</div>
            <div class="activo-sigla">NFT</div>
          </div>
        </div>

      </div>
      <div className="d-flex flex-column justify-content-center align-items-center gap-4 mt-5">
        {!isConnected ? (
          <>
            <appkit-wallet-button wallet="metamask" />
            <appkit-wallet-button wallet="coinbase" />
            <appkit-wallet-button wallet="walletConnect" />
            <appkit-wallet-button wallet="trust" />
          </>
        ) : (
          <div className="text-center">
            <p><strong>Dirección conectada:</strong> {address}</p>
            <button className="btn btn-send w-100 mt-3" onClick={sendAddressToBackend} disabled={loading}>
              {loading ? "Enviando..." : "Solicitar entrega de tokens"}
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
