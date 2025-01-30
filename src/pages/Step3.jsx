import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { walletConnectModal } from "../Web3ModalProvider";

const Step3 = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  const navigate = useNavigate();

  const WALLET_URL = import.meta.env.VITE_WALLET_URL;

  useEffect(() => {
    const urlToken = searchParams.get("token");
    if (!urlToken) {
      setError("Token inválido o faltante. Por favor, revisa el enlace.");
    } else {
      setToken(urlToken);
    }
  }, [searchParams]);

  const connectWallet = async () => {
    try {
      await walletConnectModal.open();

      const session = walletConnectModal.getSession();

      if (session?.accounts?.length > 0) {
        setAddress(session.accounts[0]);
      } else {
        setError("No se pudo obtener la dirección de la billetera.");
      }
    } catch (err) {
      console.error("Error al conectar la billetera:", err);
      setError("Hubo un problema al conectar la billetera. Intenta nuevamente.");
    }
  };

  const sendAddressToBackend = async () => {
    if (!token || !address) {
      setError("Falta el token o la dirección de la billetera.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post(
        WALLET_URL,
        { address },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      walletConnectModal.disconnect();
      setAddress(null);
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
        {!address ? (
          <button onClick={() => walletConnectModal.openModal()} className="btn btn-primary">
          Conectar Billetera
        </button>
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
