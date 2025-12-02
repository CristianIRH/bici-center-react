import "../styles/pages.css";
import FilterBar from "../components/FilterBar";
import { useSearch } from "../contexts/SearchContext";
import { useMemo, useState } from "react";
import CardProducto from "../components/CardProducto";

const SAMPLE_ACCESSORIES = [
  { id: 1, title: "Casco Urbano", desc: "Casco con visera.", marca: "Bell", price: 25000 },
  { id: 2, title: "Luces LED", desc: "Set delantero y trasero.", marca: "Generic", price: 8000 },
  { id: 3, title: "Candado", desc: "Candado en U resistente.", marca: "Abus", price: 22000 },
];

function Accesorios() {
  const { searchTerm } = useSearch();
  const [applied, setApplied] = useState({ order: "", brand: "" });

  const brands = useMemo(() => Array.from(new Set(SAMPLE_ACCESSORIES.map((a) => a.marca))), []);

  const handleApply = ({ order, brand }) => setApplied({ order, brand });
  const handleClear = () => setApplied({ order: "", brand: "" });

  const filtered = useMemo(() => {
    let list = SAMPLE_ACCESSORIES.slice();
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter((a) => a.title.toLowerCase().includes(s) || a.desc.toLowerCase().includes(s));
    }
    if (applied.brand) list = list.filter((a) => a.marca === applied.brand);
    if (applied.order) {
      if (applied.order === "name-asc") list.sort((a,b)=>a.title.localeCompare(b.title));
      if (applied.order === "name-desc") list.sort((a,b)=>b.title.localeCompare(a.title));
      if (applied.order === "price-asc") list.sort((a,b)=>a.price-b.price);
      if (applied.order === "price-desc") list.sort((a,b)=>b.price-a.price);
    }
    return list;
  }, [searchTerm, applied]);

  return (
    <div style={{ padding: "0 60px" }}>
      <h1 style={{ paddingLeft: 0 }}>Accesorios</h1>

      <FilterBar brands={brands} onApply={handleApply} onClear={handleClear} />

      <div style={{ marginBottom: 12 }}>Mostrando {filtered.length} accesorio{filtered.length !== 1 ? "s" : ""}</div>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {filtered.map((item) => (
          <div key={item.id} style={{ flex: "0 1 300px" }}>
            <CardProducto product={{ id: item.id, imagen: `https://via.placeholder.com/400x250?text=${encodeURIComponent(item.title)}`, nombre: item.title, precio: item.price, desc: item.desc, price: item.price }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Accesorios;
