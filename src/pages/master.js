import { Link } from "react-router-dom";
import "../styles/pages.css"; // Asume que tienes un archivo CSS para la página Home

function Home() {
  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1 className="fw-bolder display-4">BiciCenter - Tu Centro de Bicicletas</h1>
        <p className="lead text-muted">La mejor tienda de bicicletas, repuestos y accesorios en Chile.</p>
      </header>

      <section className="row g-4 text-center">
        <div className="col-md-4">
          <Link to="/bicicletas" className="card p-4 h-100 shadow-sm text-decoration-none">
            <i className="bi bi-bicycle display-4 text-primary mb-3"></i>
            <h2 className="h4 fw-bold text-dark">Bicicletas</h2>
            <p className="text-muted">Encuentra tu compañera ideal para la ruta o la montaña.</p>
            <span className="btn btn-outline-primary mt-2">Ver Catálogo</span>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/repuestos" className="card p-4 h-100 shadow-sm text-decoration-none">
            <i className="bi bi-gear-fill display-4 text-warning mb-3"></i>
            <h2 className="h4 fw-bold text-dark">Repuestos</h2>
            <p className="text-muted">Componentes de alta calidad para mantener tu bici al 100%.</p>
            <span className="btn btn-outline-warning mt-2">Ver Repuestos</span>
          </Link>
        </div>
        <div className="col-md-4">
          <Link to="/accesorios" className="card p-4 h-100 shadow-sm text-decoration-none">
            <i className="bi bi-basket-fill display-4 text-success mb-3"></i>
            <h2 className="h4 fw-bold text-dark">Accesorios</h2>
            <p className="text-muted">Cascos, luces, ropa y todo lo que necesitas para tu viaje.</p>
            <span className="btn btn-outline-success mt-2">Ver Accesorios</span>
          </Link>
        </div>
      </section>
      
      <section className="text-center my-5 py-4 border-top">
        <h3 className="fw-bold mb-3">Agenda tu Mantenimiento</h3>
        <p>No esperes a que sea tarde. Mantén tu bicicleta siempre lista con nuestros expertos.</p>
        <Link to="/mantenimiento" className="btn btn-danger btn-lg shadow-lg">
            <i className="bi bi-tools me-2"></i> Agendar Ahora
        </Link>
      </section>
    </div>
  );
}

export default Home;