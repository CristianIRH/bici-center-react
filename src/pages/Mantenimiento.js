import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "../styles/pages.css";

const SERVICES = [
    { id: 1, name: "Ajuste de Frenos y Cambios", price: 40000, desc: "Ajuste, calibración y lubricación de componentes de transmisión." },
    { id: 2, name: "Limpieza Profunda y Engrase", price: 30000, desc: "Lavado completo y engrase de rodamientos de dirección y motor." },
    { id: 3, name: "Revisión General de Seguridad", price: 15000, desc: "Chequeo de neumáticos, luces, tornillos y ajuste de presión." },
    { id: 4, name: "Instalación de Componentes", price: 10000, desc: "Instalación de luces, neumáticos, sillín, etc." },
];

const IVA_RATE = 0.19;

const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        minimumFractionDigits: 0 
    }).format(price).replace('CLP', '').trim();
};

function Mantenimiento() {
  const [selectedServices, setSelectedServices] = useState([]);

  const handleServiceChange = (serviceId, price) => {
    setSelectedServices(prev => {
        if (prev.includes(serviceId)) {
            return prev.filter(id => id !== serviceId);
        } else {
            return [...prev, serviceId];
        }
    });
  };

  const totals = useMemo(() => {
    const subtotal = SERVICES
        .filter(s => selectedServices.includes(s.id))
        .reduce((sum, service) => sum + service.price, 0);

    const iva = subtotal * IVA_RATE;
    const total = subtotal + iva;

    return { subtotal, iva, total };
  }, [selectedServices]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
        alert("Por favor, selecciona al menos un servicio.");
        return;
    }
    alert(`Cita agendada para un total de ${formatPrice(totals.total)}. Redirigiendo a pago.`);
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Mantenimiento Personalizado</h1>
        <p className="text-muted">Selecciona los servicios que deseas para tu bicicleta</p>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <h3 className="mb-3">Servicios Disponibles</h3>
          <form onSubmit={handleSubmit}>
            <div className="row row-cols-1 row-cols-md-2 g-3 mb-4">
              {SERVICES.map((service) => (
                <div className="col" key={service.id}>
                  <div 
                    className={`form-check p-3 border rounded shadow-sm maintenance-service ${selectedServices.includes(service.id) ? 'border-primary bg-light' : ''}`} 
                    onClick={() => handleServiceChange(service.id, service.price)}
                    style={{ cursor: 'pointer' }}
                  >
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      checked={selectedServices.includes(service.id)} 
                      onChange={() => {}}
                      style={{ marginTop: '0.6rem' }}
                    />
                    <label className="form-check-label w-100 ms-2" style={{ userSelect: 'none' }}>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-bold">{service.name}</span>
                        <span className="text-success fw-bold">{formatPrice(service.price)}</span>
                      </div>
                      <small className="text-muted d-block">{service.desc}</small>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-outline-secondary me-2" onClick={() => setSelectedServices([])}>
                    <i className="bi bi-x-circle me-1"></i> Limpiar Selección
                </button>
                <Link to="/dashboard" className="btn btn-outline-primary">
                    <i className="bi bi-person-fill me-1"></i> Ir a Mi Dashboard
                </Link>
            </div>
          </form>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-lg bg-light p-4 sticky-top" style={{ top: '80px' }}>
            <h3 className="mb-4 text-center">Resumen del Mantenimiento</h3>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span className="fw-semibold">{formatPrice(totals.subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>IVA (19%):</span>
              <span className="fw-semibold">{formatPrice(totals.iva)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <span className="fs-5 fw-bold">Total Estimado:</span>
              <span className="fs-5 fw-bold text-success">{formatPrice(totals.total)}</span>
            </div>
            
            <button 
                type="submit" 
                className="btn btn-success btn-lg w-100 py-3 fw-bold shadow" 
                onClick={handleSubmit}
                disabled={selectedServices.length === 0}
            >
              AGENDAR CITA Y PAGAR <i className="bi bi-calendar-check"></i>
            </button>
            
            {selectedServices.length === 0 && (
                <p className="text-danger text-center mt-2 mb-0"><small>Selecciona al menos un servicio.</small></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mantenimiento;