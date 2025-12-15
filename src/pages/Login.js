import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/logo.png";
import "../styles/pages.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/master");
  };

  return (
    <div className="login-container">
      <Link to="/" className="login-logo">
        <img src={logo} alt="BiciCenter" width="70" />
      </Link>

      <div className="login-box">
        <h2 className="login-title">Bienvenido</h2>
        <p className="login-subtitle">Inicia sesión para continuar</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <span className="icon">📧</span>
            <input type="text" placeholder="Correo" required />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input type="password" placeholder="Contraseña" required />
          </div>

          <button className="btn-login" type="submit">Iniciar Sesión</button>
        </form>

        <p className="register-text">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;