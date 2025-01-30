import logo from '/assets/img/logo.png';

function Header() {
  return (
    <header className="d-flex flex-row justify-content-between align-items-start mb-5">
      <img src={logo} width="200" alt="Logo DataPioneers" className="img-fluid" />
      <div>
        <p className="mb-0">Entrega de Activos</p>
        <h1 className="text-uppercase">Datapioneers</h1>
      </div>
    </header>
  );
}

export default Header;
