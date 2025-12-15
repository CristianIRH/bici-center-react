import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";
import "../styles/pages.css";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    email: "",
    rut: "",
    password: "",
    confirm: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({ ...s, [name]: type === "checkbox" ? checked : value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      alert("Las contraseñas no coinciden");
      return;
    }
    if (!form.terms) {
      alert("Debes aceptar los términos y condiciones");
      return;
    }

    // Aquí iría la llamada a la API para crear el usuario.
    // Por ahora simulamos registro exitoso y redirigimos al login.
    navigate("/login");
  };

  return (
    <div className="login-container">

      {/* LOGO CLICKABLE */}
      <Link to="/" className="login-logo">
        <img src={logo} alt="BiciCenter" width="70" />
      </Link>

      <div className="login-box">

        <h2 className="login-title">Registro de Usuario</h2>

        <form onSubmit={handleRegister}>
          <div className="input-group">
            <span className="icon">👤</span>
            <input name="nombre" value={form.nombre} onChange={handleChange} type="text" placeholder="Nombre" required />
          </div>

          <div className="input-group">
            <span className="icon">👤</span>
            <input name="apellido" value={form.apellido} onChange={handleChange} type="text" placeholder="Apellido" required />
          </div>

          <div className="input-group">
            <span className="icon">👤</span>
            <input name="usuario" value={form.usuario} onChange={handleChange} type="text" placeholder="Usuario" required />
          </div>

          <div className="input-group">
            <span className="icon">📧</span>
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Correo electrónico" required />
          </div>

          <div className="input-group">
            <span className="icon">🪪</span>
            <input name="rut" value={form.rut} onChange={handleChange} type="text" placeholder="RUT" />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input name="password" value={form.password} onChange={handleChange} type="password" placeholder="Contraseña" required />
          </div>

          <div className="input-group">
            <span className="icon">🔒</span>
            <input name="confirm" value={form.confirm} onChange={handleChange} type="password" placeholder="Confirmar contraseña" required />
          </div>

          <label className="terms">
            <input name="terms" checked={form.terms} onChange={handleChange} type="checkbox" /> Acepto los <Link to="/terms">Términos y Condiciones</Link>
          </label>

          <button className="btn-register" type="submit">Registrar</button>
        </form>

        <p className="register-text">
          ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
