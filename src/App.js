import { Routes, Route, useLocation, Link, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Todas las importaciones de páginas en minúsculas y sin extensión
import Bicicletas from "./pages/bicicletas";
import Repuestos from "./pages/repuestos";
import Accesorios from "./pages/accesorios";
import Login from "./pages/login";
import Register from "./pages/registrobici";
import Mantenimiento from "./pages/mantenimiento";
import Home from "./pages/master";

import "./styles/App.css";

import logo from "./assets/logo.png";
import Carrito from "./pages/carrito";
import ProductDetail from "./pages/vistaProducto";

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
        <Route path="/master" element={<Home />} />
        <Route path="/mantenimiento" element={<Mantenimiento />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/product/:tipoProducto/:id" element={<ProductDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {!ocultarBarras && <Footer />}
    </>
  );
}

export default App;