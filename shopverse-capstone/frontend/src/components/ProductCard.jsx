import { Link } from "react-router-dom";
import { ArrowUpRight, Plus } from "lucide-react";
import { useCart } from "../context/CartContext";

const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  return (
    <article className="product-card" style={{ "--delay": `${index * 65}ms` }}>
      <Link to={`/products/${product.id}`} className="product-image">
        <img src={product.imageUrl} alt={product.name} loading="lazy" decoding="async"/>
        <span className="image-arrow"><ArrowUpRight size={18}/></span>
      </Link>
      <div className="product-meta"><span>{product.category}</span><span>{product.stock > 0 ? "In stock" : "Sold out"}</span></div>
      <div className="product-bottom">
        <div><Link to={`/products/${product.id}`} className="product-name">{product.name}</Link><p className="product-price">{money(product.price)}</p></div>
        <button className="add-button" onClick={() => addToCart(product)} disabled={product.stock < 1} aria-label={`Add ${product.name} to bag`}><Plus size={19}/></button>
      </div>
    </article>
  );
}
