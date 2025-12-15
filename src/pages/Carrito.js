import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages.css";

const formatPrice = (price) => {
  return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP', 
      minimumFractionDigits: 0 
  }).format(price).replace('CLP', '').trim();
};

const CartItemCard = ({ item, removeItem, updateQuantity }) => {
  const itemTotal = item.price * item.quantity;
  
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="card mb-3 shadow-sm cart-item-card">
      <div className="card-body">
        <div className="row align-items-center">
          
          <div className="col-md-2">
            <img 
              src={item.imagen || '/img/default.jpg'} 
              className="img-fluid rounded" 
              alt={item.nombre} 
              style={{ width: '100%', height: '80px', objectFit: 'cover' }}
            />
          </div>
          
          <div className="col-md-5">
            <h5 className="mb-0 card-title">{item.nombre}</h5>
            <small className="text-muted">ID: {item.id}</small>
            <p className="text-primary fw-bold mb-0 mt-1">{formatPrice(item.price)} c/u</p>
          </div>
          
          <div className="col-md-3">
            <input 
              type="number" 
              className="form-control" 
              value={item.quantity} 
              onChange={handleQuantityChange}
              min="1"
              style={{ width: '80px' }}
            />
          </div>
          
          <div className="col-md-2 text-end">
            <h5 className="mb-0 text-success fw-bold">{formatPrice(itemTotal)}</h5>
            <button 
              className="btn btn-sm btn-link text-danger p-0 mt-1" 
              onClick={() => removeItem(item.id)}
            >
              <i className="bi bi-trash-fill me-1"></i> Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


function Carrito() {
  const { isLogged } = useAuth();
  const { items, removeItem, clear, total, totalItems, updateQuantity } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) navigate('/login');
  }, [isLogged, navigate]);
  
  const handleCheckout = () => {
    alert("Procesando pago... ¡Gracias por tu compra!");
    clear();
    navigate("/");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">🛒 Mi Carrito</h2>

      <div className="row">
        <div className="col-lg-8">
          {items.length === 0 && (
            <div className="alert alert-info text-center py-5" role="alert">
              <h4 className="alert-heading">Tu carrito está vacío.</h4>
              <p>Parece que aún no has agregado productos.</p>
              <Link to="/bicicletas" className="btn btn-primary mt-3">Ver Bicicletas</Link>
            </div>
          )}
          
          {items.length > 0 && (
            <>
              <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-outline-danger" onClick={clear}>
                  <i className="bi bi-x-octagon-fill me-1"></i> Vaciar Carrito
                </button>
              </div>
              {items.map((item) => (
                <CartItemCard 
                  key={item.id} 
                  item={item} 
                  removeItem={removeItem} 
                  updateQuantity={updateQuantity} 
                />
              ))}
            </>
          )}
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm bg-light sticky-top" style={{ top: '80px' }}>
            <div className="card-body p-4">
              <h4 className="mb-4">Resumen</h4>
              <div className="d-flex justify-content-between mb-2">
                <span>Productos:</span>
                <span>{totalItems}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span className="text-success fw-bold">GRATIS</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fs-4 fw-bold">Total a Pagar:</span>
                <span className="fs-4 fw-bold text-success">{formatPrice(total)}</span>
              </div>
              
              <button 
                type="button" 
                className="btn btn-success btn-lg w-100 py-3 fw-bold shadow"
                onClick={handleCheckout}
                disabled={items.length === 0}
              >
                PROCEDER AL PAGO <i className="bi bi-arrow-right"></i>
              </button>
              
              <Link to="/bicicletas" className="btn btn-outline-primary btn-lg w-100 mt-2">
                Seguir Comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Carrito;