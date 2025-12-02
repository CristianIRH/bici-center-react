import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages.css";

function Carrito() {
  const { isLogged } = useAuth();
  const { items, removeItem, clear, total, updateQuantity } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/login');
  }, [isLogged, navigate]);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1 className="cart-title">Mi Carrito de Compras</h1>

        {items.length === 0 && (
          <div className="cart-empty">
            <p>Tu carrito está vacío.</p>
            <Link to="/bicicletas" className="btn btn-primary">Ir a comprar</Link>
          </div>
        )}

        {items.length > 0 && (
          <div className="cart-grid">
            <div className="cart-left">
              {items.map((it) => (
                <div key={it.id} className="cart-item-card">
                  <img src={it.imagen} alt={it.nombre || it.title} className="cart-item-img" />
                  <div className="cart-item-main">
                    <div className="cart-item-title">{it.nombre || it.title}</div>
                    <div className="cart-item-meta">Tipo: {it.type || 'Producto'} · Modelo: {it.model || it.modelo || '-'}</div>
                  </div>
                  <div className="cart-item-controls">
                    <div className="cart-price">${((it.price || it.precio) * it.quantity).toLocaleString('es-CL')}</div>
                    <div className="qty-controls">
                      <button onClick={() => updateQuantity(it.id, Math.max(1, (it.quantity || 1) - 1))} className="qty-btn">−</button>
                      <input value={it.quantity || 1} readOnly className="qty-input" />
                      <button onClick={() => updateQuantity(it.id, (it.quantity || 1) + 1)} className="qty-btn">+</button>
                    </div>
                    <button className="btn btn-secondary btn-small" onClick={() => removeItem(it.id)}>Eliminar</button>
                  </div>
                </div>
              ))}

              <div style={{ textAlign: 'right', marginTop: '12px' }}>
                <button className="btn btn-outline-danger" onClick={clear}>Vaciar Carrito</button>
              </div>
            </div>

            <aside className="cart-right">
              <div className="summary-box">
                <h3>Resumen del Pedido</h3>
                <div className="summary-row"><span>Subtotal ({items.length} productos):</span><span>${total.toLocaleString('es-CL')}</span></div>
                <div className="summary-row"><span>Envío:</span><span className="text-green">GRATIS</span></div>
                <hr />
                <div className="summary-total"><span>Total:</span><span>${total.toLocaleString('es-CL')}</span></div>

                <button className="btn btn-primary btn-block">Proceder al Pago</button>
                <button className="btn btn-outline" style={{ marginTop: 12 }}>Seguir Comprando</button>

                <div style={{ marginTop: 12, color: '#777' }}>
                  <small>Aceptamos:</small>
                  <div style={{ marginTop: 8 }}>
                    <img src="/assets/visa.png" alt="visa" style={{ height: 20, marginRight: 8, opacity: .6 }} />
                    <img src="/assets/mastercard.png" alt="mc" style={{ height: 20, marginRight: 8, opacity: .6 }} />
                    <img src="/assets/paypal.png" alt="pp" style={{ height: 20, opacity: .6 }} />
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}

export default Carrito;
