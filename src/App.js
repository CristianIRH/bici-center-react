import { Routes, Route, useLocation, Link, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Bicicletas from "./pages/Bicicletas";
import Repuestos from "./pages/Repuestos";
import Accesorios from "./pages/Accesorios";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Mantenimiento from "./pages/Mantenimiento";
import Home from "./pages/Home";

import "./styles/App.css";

import logo from "./assets/logo.png";
import Carrito from "./pages/Carrito";
import ProductDetail from "./pages/ProductDetail";
import { useSearch } from "./contexts/SearchContext";

function App() {
  const location = useLocation();

  const ocultarBarras =
    location.pathname === "/login" ||
    location.pathname === "/register";

  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <>
      {!ocultarBarras && (
        <div className="header-bg">
          <div className="logo-box">
            <Link to="/">
              <img src={logo} alt="BiciCenter" width="60" />
            </Link>
          </div>

          <input
            type="text"
            className="search-box"
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {!ocultarBarras && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repuestos" element={<Repuestos />} />
        <Route path="/bicicletas" element={<Bicicletas />} />
        <Route path="/accesorios" element={<Accesorios />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!ocultarBarras && <Footer />}
    </>
  );
}

export default App;
