import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import DOMPurify from "dompurify";

const Step1 = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY;

  useEffect(() => {
    if (!BACKEND_URL || !RECAPTCHA_KEY) {
      console.error("Faltan variables de entorno: VITE_BACKEND_URL o VITE_RECAPTCHA_KEY.");
    }
  }, []);

  const validateEmail = (email) => {
    const re = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!email) return { check: false, message: "Por favor, ingresa un correo electrónico." };
    if (!re.test(email)) return { check: false, message: "Por favor, ingresa un correo electrónico válido." };

    return { check: true };
  };

  const sendEmail = async (event) => {
    event.preventDefault();
    setError(null);

    const validation = validateEmail(email.trim().toLowerCase());
    if (!validation.check) {
      setError(validation.message);
      return;
    }

    const recaptchaToken = recaptchaRef.current.getValue();
    if (!recaptchaToken) {
      setError("Por favor, completa el reCAPTCHA para continuar.");
      return;
    }

    const sanitizedEmail = DOMPurify.sanitize(email.trim().toLowerCase());
    setLoading(true);

    try {
      const response = await axios.post(BACKEND_URL, {
        email: sanitizedEmail,
        siteKey: recaptchaToken,
      });
      
      navigate("/email-confirmation");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Hubo un problema al enviar el correo. Intenta nuevamente más tarde.");
      } else {
        setError("Error de red: No se pudo procesar tu solicitud. Intenta más tarde.");
      }
    } finally {
      setLoading(false);
      recaptchaRef.current.reset();
    }
  };

  return (
    <section id="step-1">
      <div className="alert alert-warning">
        Si previamente recibiste el NFT, no lo recibirás nuevamente.
      </div>
      <div className="alert alert-warning">
        Si te registraste como DataPioneers antes del 31 de marzo de 2025 recibirás:
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

      <form onSubmit={sendEmail}>
        <div className="card text-white card-activos p-4">
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text"><i className="fas fa-envelope fa-2x"></i></span>
              <input
                type="email"
                className="form-control"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="d-flex justify-content-center">
              <ReCAPTCHA sitekey={RECAPTCHA_KEY} ref={recaptchaRef} />
            </div>
            <button className="btn btn-send w-100 mt-3" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </div>
      </form>

      {error && <div className="alert alert-danger mt-3">{error}</div>}
    </section>
  );
};

export default Step1;
