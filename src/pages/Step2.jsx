import React from 'react'

const Step2 = () => {
  return (
    <section id="step-2">
       <div className="title">¡Correo enviado!</div>
       <div className="subtitle">Revisa tu bandeja de entrada para más instrucciones</div>
      <div className="alert alert-light d-flex align-items-center mt-4" role="alert">
        <div>
          <i className="fa-regular fa-lightbulb"></i> El correo sólo lo recibirás si te registraste como DataPioneers antes
          del 31 de marzo de 2025.
        </div>
      </div>
    </section>
  )
}

export default Step2
