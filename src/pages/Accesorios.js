import "../styles/pages.css";
import CardProducto from "../components/CardProducto";
import { useSearch } from "../contexts/SearchContext";
import { useMemo, useState } from "react";

const SAMPLE_ACCESSORIES = [
  { id: 1, title: "Casco Urbano", desc: "Casco con visera.", marca: "Bell", price: 25000 },
  { id: 2, title: "Luces LED", desc: "Set delantero y trasero.", marca: "Generic", price: 8000 },
  { id: 3, title: "Candado", desc: "Candado en U resistente.", marca: "Abus", price: 22000 },
  { id: 4, title: "Inflador de Mano", desc: "Inflador compacto para viajes.", marca: "Zefal", price: 15000 },
  { id: 5, title: "Portabotella", desc: "Soporte ligero de carbono.", marca: "Bell", price: 12000 },
];

const ORDER_MAP = {
  "nombre_asc": "title-asc",
  "nombre_desc": "title-desc",
  "precio_asc": "price-asc",
  "precio_desc": "price-desc",
};

function Accesorios() {
  const { searchTerm } = useSearch();
  const [selectedOrder, setSelectedOrder] = useState(""); 
  const [appliedOrder, setAppliedOrder] = useState(""); 
  
  const handleOrderChange = (e) => {
    setSelectedOrder(e.target.value);
  };

  const handleApply = (e) => {
    e.preventDefault();
    setAppliedOrder(selectedOrder);
  };

  const handleClear = () => {
    setSelectedOrder("");
    setAppliedOrder("");
  };

  const filtered = useMemo(() => {
    let list = SAMPLE_ACCESSORIES.slice();
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(s) || a.desc.toLowerCase().includes(s));
    }
    
    if (appliedOrder) {
      const internalOrder = ORDER_MAP[appliedOrder];
      if (internalOrder === "title-asc") list.sort((a,b)=>a.title.localeCompare(b.title));
      if (internalOrder === "title-desc") list.sort((a,b)=>b.title.localeCompare(a.title));
      if (internalOrder === "price-asc") list.sort((a,b)=>a.price-b.price);
      if (internalOrder === "price-desc") list.sort((a,b)=>b.price-a.price);
    }
    return list;
  }, [searchTerm, appliedOrder]);


  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { 
        style: 'currency', 
        currency: 'CLP', 
        minimumFractionDigits: 0 
    }).format(price);
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Accesorios</h2>
      <div className="filter-section">
        <form onSubmit={handleApply} className="filter-form">
            <div className="filter-group">
                <label htmlFor="ordenar">Ordenar por:</label>
                <select name="ordenar" id="ordenar" value={selectedOrder} onChange={handleOrderChange}>
                    <option value="">Seleccionar...</option>
                    <option value="nombre_asc">Nombre (A-Z)</option>
                    <option value="nombre_desc">Nombre (Z-A)</option>
                    <option value="precio_asc">Precio (Menor a Mayor)</option>
                    <option value="precio_desc">Precio (Mayor a Menor)</option>
                </select>
            </div>
            
            <div className="filter-actions">
                <button type="submit" className="btn-filter btn-apply">Aplicar Filtros</button>
                <button type="button" onClick={handleClear} className="btn-filter btn-clear">Limpiar</button>
            </div>
        </form>
      </div>

      <div className="results-info" style={{marginBottom: '15px'}}>
          📊 Mostrando <strong>{filtered.length}</strong> accesorio{filtered.length !== 1 ? "s" : ""}
      </div>

      

      <div className="row row-cols-1 row-cols-md-4 g-4 justify-content-center" style={{ display: "flex", gap: '1rem', flexWrap: "wrap", justifyContent: "center" }}>
        {filtered.map((item) => (
          <div key={item.id} className="col" style={{ flex: "0 1 23%" }}>
            <div className="card h-100 product-card">
              <a href={`/producto/accesorio/${item.id}`} className="text-decoration-none">
                <img src={`https://via.placeholder.com/400x250?text=${encodeURIComponent(item.title)}`} className="card-img-top" alt={item.title} />
                <div className="card-body">
                  <h5 className="card-title text-dark">{item.title}</h5>
                  <p className="card-text text-muted">{item.desc}</p>
                  <p className="card-text text-success fw-bold">{formatPrice(item.price)}</p>
                </div>
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-12">
            <div className="alert alert-info text-center">
              <h5>No hay accesorios</h5>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Accesorios;