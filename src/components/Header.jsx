import logo from '/assets/img/logo.png';

function Header() {
  return (
    <header className="d-flex flex-row justify-content-between align-items-start mb-5">
      <img src={logo} alt="GuardHawk.io" className="img-fluid" />
      <div>
        <h1 className="text-uppercase my-0">Datapioneers</h1>
        <p className="my-0">Entrega de Activos</p>
      </div>
    </header>
  );
}

export default Header;
