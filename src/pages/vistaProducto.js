import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import "../styles/pages.css";

function ProductDetail() {
  const { state } = useLocation();
  const product = state?.product;
  const navigate = useNavigate();
  const { isLogged } = useAuth();
  const { addItem } = useCart();

  if (!product) {
    return (
      <div style={{ padding: 40 }}>
        <p>Producto no encontrado. Vuelve a la tienda.</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (!isLogged) {
      navigate("/login");
      return;
    }
    addItem(product, 1);
    navigate("/carrito");
  };

  const price = product.price || product.precio || 0;

  return (
    <div className="product-page">
      <div className="breadcrumbs">
        <Link to="/">Inicio</Link>
        <span>›</span>
        <Link to="/bicicletas">Bicicleta</Link>
        <span>›</span>
        <span className="current">{product.nombre || product.title}</span>
      </div>

      <div className="product-detail-grid">
        <div className="image-card">
          <div className="image-box">
            <img src={product.imagen} alt={product.nombre || product.title} />
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.nombre || product.title}</h1>
          <div className="product-model">Modelo: <strong>{product.model || product.modelo || "-"}</strong></div>

          <div className="product-price">${Number(price).toLocaleString("es-CL", { minimumFractionDigits: 2 })}</div>

          <hr />

          <h4>Descripción del producto</h4>
          <p className="product-desc">{product.desc || product.description || "Descripción general del producto."}</p>

          {!isLogged && (
            <div className="need-login">
              <p><strong>Debes iniciar sesión para comprar este producto</strong></p>
              <div className="login-actions">
                <Link to="/login" className="btn btn-primary">🔑 Iniciar Sesión</Link>
                <Link to="/register" className="btn btn-outline-success">➕ Crear Cuenta Nueva</Link>
              </div>
            </div>
          )}

          {isLogged && (
            <div className="buy-actions">
              <button className="btn btn-success" onClick={handleAdd}>Añadir al carrito</button>
            </div>
          )}

          <div className="product-benefits">
            <div>🚚 Envío gratis a todo Chile</div>
            <div>🛡️ Garantía oficial de 1 año</div>
            <div>📦 Envío en 24-48 horas</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
