import { useEffect, useState } from "react";

const messages = [
  "Solicitud enviada. Preparando la transacción.",
  "Conectando con la red Ethereum.",
  "Generando la transacción en el contrato inteligente.",
  "Enviando la transacción a la blockchain.",
  "Esperando confirmaciones de la red.",
  "Transacción confirmada. Entregando tus tokens...",
];

const Step4 = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = prevIndex + 1;

        if (newIndex >= messages.length) {
          clearInterval(interval);
          setCompleted(true);
        } else {
          setCurrentMessage(messages[newIndex]);
        }

        return newIndex;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section>
      {!completed ? (
        <div className="alert alert-info d-flex align-items-center justify-content-center gap-2">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <strong>{currentMessage}</strong>
      </div>
      ) : (
        <section id="step-5">
          <div className="card text-white mb-4 card-activos">
            <div className="card-body">
              <h4 className="text-warning text-center fw-bold">¡Transacción completada!</h4>
              <p>Tus tokens han sido enviados exitosamente. Revisa tu billetera o Etherscan.</p>
              <button
                className="btn bg-white"
                onClick={() => window.open("https://etherscan.io/", "_blank")}
              >
                <img src="./assets/img/etherscan.png" alt="Etherscan" />
              </button>
            </div>
          </div>

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
        </section>
      )}
    </section>
  );
};

export default Step4;
