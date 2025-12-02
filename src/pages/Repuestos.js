import "../styles/pages.css";
import { useSearch } from "../contexts/SearchContext";
import FilterBar from "../components/FilterBar";
import { useMemo, useState } from "react";
import CardProducto from "../components/CardProducto";

const SAMPLE_PRODUCTS = [
  { id: 1, title: "Cadena Shimano", desc: "Repuesto original, alta durabilidad.", marca: "Shimano", price: 12000 },
  { id: 2, title: "Freno Tektro", desc: "Freno delantero compatible.", marca: "Tektro", price: 8000 },
  { id: 3, title: "Pedal Plata", desc: "Pedal estándar aluminio.", marca: "Generic", price: 4000 },
  { id: 4, title: "Piñón 8V", desc: "Piñón de transmisión 8 velocidades.", marca: "Shimano", price: 15000 },
];

function Repuestos() {
  const { searchTerm } = useSearch();
  const [applied, setApplied] = useState({ order: "", brand: "" });

  const brands = useMemo(() => Array.from(new Set(SAMPLE_PRODUCTS.map((p) => p.marca))), []);

  const handleApply = ({ order, brand }) => {
    setApplied({ order, brand });
  };

  const handleClear = () => setApplied({ order: "", brand: "" });

  const filtered = useMemo(() => {
    let list = SAMPLE_PRODUCTS.slice();

    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(s) || p.desc.toLowerCase().includes(s));
    }

    if (applied.brand) list = list.filter((p) => p.marca === applied.brand);

    if (applied.order) {
      if (applied.order === "name-asc") list.sort((a, b) => a.title.localeCompare(b.title));
      if (applied.order === "name-desc") list.sort((a, b) => b.title.localeCompare(a.title));
      if (applied.order === "price-asc") list.sort((a, b) => a.price - b.price);
      if (applied.order === "price-desc") list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [searchTerm, applied]);

  return (
    <div style={{ padding: "0 60px" }}>
      <h1 style={{ paddingLeft: 0 }} className="titulo-seccion">🔥 Repuestos</h1>

      <FilterBar brands={brands} onApply={handleApply} onClear={handleClear} />

      <div style={{ marginBottom: 12 }}>Mostrando {filtered.length} producto{filtered.length !== 1 ? "s" : ""}</div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
        {filtered.map((product) => (
          <div key={product.id} style={{ flex: "0 1 300px" }}>
            <CardProducto product={{ id: product.id, imagen: `https://via.placeholder.com/400x250?text=${encodeURIComponent(product.title)}`, nombre: product.title, precio: product.price, desc: product.desc, price: product.price }} />
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <p>No se encontraron productos que coincidan con "{searchTerm}".</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Repuestos;
