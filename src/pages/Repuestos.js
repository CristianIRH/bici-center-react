import "../styles/pages.css";
import { useSearch } from "../contexts/SearchContext";
import FilterBar from "../components/FilterBar";
import { useMemo, useState } from "react";
import CardProducto from "../components/CardProducto";

const SAMPLE_PRODUCTS = [
  { id: 1, title: "Cadena Shimano", desc: "Repuesto original, alta durabilidad.", marca: "Shimano", price: 12000, type: 'repuesto' },
  { id: 2, title: "Freno Tektro", desc: "Freno delantero compatible.", marca: "Tektro", price: 8000, type: 'repuesto' },
  { id: 3, title: "Pedal Plata", desc: "Pedal estándar aluminio.", marca: "Generic", price: 4000, type: 'repuesto' },
  { id: 4, title: "Piñón 8V", desc: "Piñón de transmisión 8 velocidades.", marca: "Shimano", price: 15000, type: 'repuesto' },
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

    // 1. Filtrar por término de búsqueda (del Navbar)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term));
    }

    // 2. Filtrar por marca
    if (applied.brand) {
        list = list.filter(p => p.marca === applied.brand);
    }

    // 3. Ordenar
    if (applied.order) {
      if (applied.order === "name-asc") list.sort((a, b) => a.title.localeCompare(b.title));
      if (applied.order === "name-desc") list.sort((a, b) => b.title.localeCompare(a.title));
      if (applied.order === "price-asc") list.sort((a, b) => a.price - b.price);
      if (applied.order === "price-desc") list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [searchTerm, applied]);

  return (
    <div className="container my-5">
      <h1 className="titulo-seccion fw-bold mb-4">⚙️ Repuestos</h1>

      <FilterBar brands={brands} onApply={handleApply} onClear={handleClear} />

      <div className="results-info mb-4">
        📊 Mostrando <strong>{filtered.length}</strong> producto{filtered.length !== 1 ? "s" : ""}
      </div>

      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {filtered.map((product) => (
            <div className="col" key={product.id}>
                <CardProducto product={product} type="repuesto" />
            </div>
        ))}
      </div>
    </div>
  );
}

export default Repuestos;