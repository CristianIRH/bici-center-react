import "./../styles/productCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { imagen, nombre, precio, id } = product;
  return (
    <div className="card">
      <Link to={`/product/${id}`} state={{ product }} style={{ textDecoration: "none", color: "inherit" }}>
        <img src={imagen} alt={nombre} className="card-img" />

        <div className="card-body">
          <h3>{nombre}</h3>
          <p className="price">${precio}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
