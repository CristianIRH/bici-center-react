import CardProducto from "../components/CardProducto";
import { useSearch } from "../contexts/SearchContext";
import FilterBar from "../components/FilterBar";
import { useMemo, useState } from "react";

const SAMPLE_BIKES = [
  { id: 1, imagen: "/img/bici1.png", nombre: "Trek Marlin 5", precio: 500000, marca: "Trek" },
  { id: 2, imagen: "/img/bici2.png", nombre: "Specialized Rockhopper", precio: 620000, marca: "Specialized" },
  { id: 3, imagen: "/img/bici3.png", nombre: "Giant Talon", precio: 430000, marca: "Giant" },
];

function Bicicletas() {
  const { searchTerm } = useSearch();
  const [applied, setApplied] = useState({ order: "", brand: "" });

  const brands = useMemo(() => Array.from(new Set(SAMPLE_BIKES.map((b) => b.marca))), []);

  const handleApply = ({ order, brand }) => {
    setApplied({ order, brand });
  };

  const handleClear = () => {
    setApplied({ order: "", brand: "" });
  };

  const filtered = useMemo(() => {
    let list = SAMPLE_BIKES.slice();

    // filter by search term
    if (searchTerm) {
      const s = searchTerm.toLowerCase();
      list = list.filter((b) => b.nombre.toLowerCase().includes(s) || String(b.precio).includes(s));
    }

    // filter by brand
    if (applied.brand) {
      list = list.filter((b) => b.marca === applied.brand);
    }

    // order
    if (applied.order) {
      if (applied.order === "name-asc") list.sort((a, b) => a.nombre.localeCompare(b.nombre));
      if (applied.order === "name-desc") list.sort((a, b) => b.nombre.localeCompare(a.nombre));
      if (applied.order === "price-asc") list.sort((a, b) => a.precio - b.precio);
      if (applied.order === "price-desc") list.sort((a, b) => b.precio - a.precio);
    }

    return list;
  }, [searchTerm, applied]);

  return (
    <div style={{ padding: "0 60px" }}>
      <h1 style={{ paddingLeft: 0 }}>Bicicletas</h1>

      <FilterBar brands={brands} onApply={handleApply} onClear={handleClear} />

      <div style={{ marginBottom: 12 }}>Mostrando {filtered.length} bicicleta{filtered.length !== 1 ? "s" : ""}</div>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
        {filtered.map((b) => (
          <CardProducto key={b.id} product={b} />
        ))}
      </div>
    </div>
  );
}

export default Bicicletas;
