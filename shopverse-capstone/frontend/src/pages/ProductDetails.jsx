import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, Plus } from "lucide-react";
import { getProduct } from "../services/api";
import { useCart } from "../context/CartContext";

const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    getProduct(id).then(setProduct).catch(() => setError("We couldn't find that product."));
  }, [id]);

  if (error) return <main className="simple-page"><p>{error}</p><Link to="/">Back to collection</Link></main>;
  if (!product) return <main className="simple-page">Loading product…</main>;

  return <main className="detail-page">
    <Link to="/" className="back-link"><ArrowLeft size={16}/> Back to collection</Link>
    <div className="detail-layout">
      <div className="detail-image"><img src={product.imageUrl} alt={product.name}/></div>
      <div className="detail-copy">
        <span className="eyebrow">{product.category}</span>
        <h1>{product.name}</h1>
        <div className="detail-price">{money(product.price)}</div>
        <p>{product.description}</p>
        <div className="stock-note"><Check size={16}/> {product.stock > 0 ? `${product.stock} available` : "Currently unavailable"}</div>
        <button className="primary-button wide-button" disabled={product.stock < 1} onClick={() => addToCart(product)}><Plus size={17}/> Add to bag</button>
        <div className="detail-points"><span>Thoughtfully selected</span><span>Secure checkout coming soon</span><span>Easy support</span></div>
      </div>
    </div>
  </main>;
}
