import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  WalletConnectModalSign,
  useConnect,
} from "@walletconnect/modal-sign-react";

const projectId = import.meta.env.VITE_WEB3MODAL_PROJECT_ID;
if (!projectId) {
  throw new Error("VITE_WEB3MODAL_PROJECT_ID no está definido.");
}

const Step3 = () => {
  const [searchParams] = useSearchParams();
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
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

  const { connect } = useConnect({
    requiredNamespaces: {
      eip155: {
        methods: ["eth_sendTransaction", "personal_sign"],
        chains: ["eip155:1"],
        events: ["chainChanged", "accountsChanged"],
      },
    },
  });

  async function onConnect() {
    try {
      setDisabled(true);
      const session = await connect();

      if (session && session.namespaces.eip155.accounts.length > 0) {
        const walletAddress = session.namespaces.eip155.accounts[0].split(":")[2];
        setAddress(walletAddress);
        console.log("Billetera conectada:", walletAddress);
      } else {
        setError("No se pudo obtener la dirección de la billetera.");
      }
    } catch (err) {
      console.error("Error al conectar la billetera:", err);
      setError("Hubo un problema al conectar la billetera. Intenta nuevamente.");
    } finally {
      setDisabled(false);
    }
  }

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

        {!address ? (
          <button onClick={onConnect} className="btn btn-send w-100 mt-3 text-uppercase" disabled={disabled}>
            {disabled ? "Conectando..." : "Conectar Billetera"}
          </button>
        ) : (
          <div className="text-center">
            <button className="btn btn-send w-100 mt-3 text-uppercase" onClick={sendAddressToBackend} disabled={loading}>
              {loading ? "Enviando..." : "Solicitar entrega de activos"}
            </button>
          </div>
        )}
  

      <div className="wallets-disclaimer">
        La dirección de tu billetera no se almacenará y se usará únicamente para esta transacción.
      </div>

      <WalletConnectModalSign
        projectId={projectId}
        metadata={{
          name: "GH DataPioneers",
          description: "Recibe tus activos digitales",
          url: import.meta.env.VITE_APP_URL,
          icons: ["https://my-dapp.com/logo.png"],
        }}
      />
    </section>
  );
};

export default Step3;
