import React, { useState } from "react";

function FilterBar({ brands = [], onApply, onClear, initialOrder = "", initialBrand = "" }) {
  const [order, setOrder] = useState(initialOrder);
  const [brand, setBrand] = useState(initialBrand);

  const handleApply = () => {
    onApply && onApply({ order, brand });
  };

  const handleClear = () => {
    setOrder("");
    setBrand("");
    onClear && onClear();
  };

  return (
    <div style={{ display: "flex", gap: 16, alignItems: "center", margin: "24px 0" }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: 6 }}>Ordenar por:</label>
        <select value={order} onChange={(e) => setOrder(e.target.value)} style={{ padding: "12px", minWidth: 220 }}>
          <option value="">Seleccionar...</option>
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
          <option value="price-asc">Precio: menor a mayor</option>
          <option value="price-desc">Precio: mayor a menor</option>
        </select>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <label style={{ marginBottom: 6 }}>Marca:</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)} style={{ padding: "12px", minWidth: 220 }}>
          <option value="">Todas las marcas</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <button onClick={handleApply} className="btn btn-primary" style={{ height: 44 }}>Aplicar Filtros</button>
      <button onClick={handleClear} className="btn btn-secondary" style={{ height: 44 }}>Limpiar</button>
    </div>
  );
}

export default FilterBar;
