import React from 'react'

const Step2 = () => {
  return (
    <section id="step-2">
      <div className="alert alert-success" role="alert">
        ¡Correo Enviado! Revisa tu bandeja de entrada para más instrucciones.
      </div>
      <div className="alert alert-warning d-flex align-items-center" role="alert">
        <div>
          <i className="fa-regular fa-lightbulb"></i> El correo sólo lo recibirás si te registraste como DataPioneers antes
          del 31 de marzo de 2025.
        </div>
      </div>
    </section>
  )
}

export default Step2
