import "../styles/pages.css";
import { Link } from "react-router-dom";

function Mantenimiento() {
  return (
    <div className="page-container">
      <h1>Mantenimiento</h1>

      <p>
        Aquí puedes gestionar las tareas de mantenimiento. Esta es una página
        inicial de ejemplo; reemplaza con tu HTML/funcionalidad real.
      </p>

      <div className="maintenance-actions">
        <Link to="/dashboard" className="btn btn-primary">Ir al Dashboard</Link>
      </div>
    </div>
  );
}

export default Mantenimiento;
