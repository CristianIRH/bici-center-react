import "./../styles/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";





function Navbar() {
  const navigate = useNavigate();
  const { isLogged, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/bicicletas" className="nav-item">🚴 Bicicletas</Link>
      <Link to="/repuestos" className="nav-item">⚙️ Repuestos</Link>
      <Link to="/accesorios" className="nav-item">👜 Accesorios</Link>
      <Link to="/carrito" className="nav-item">🛒 Carrito</Link>

      {!isLogged && (
        <>
          <Link to="/login" className="nav-item">👤 Iniciar Sesión</Link>
          <Link to="/register" className="nav-item">➕ Registrarse</Link>
        </>
      )}

      {isLogged && (
        <>
          <Link to="/mantenimiento" className="nav-item">🛠️ Mantenimiento</Link>
          <button onClick={handleLogout} className="nav-item btn-link">🔓 Cerrar Sesión</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
