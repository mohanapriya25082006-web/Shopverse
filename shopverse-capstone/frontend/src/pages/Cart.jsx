import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";

const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

export default function Cart() {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  return <main className="cart-page">
    <span className="eyebrow">YOUR SELECTION</span><h1>Your <em>bag.</em></h1>
    {!items.length ? <div className="empty-cart"><ShoppingBag size={34}/><h2>It's looking a little empty.</h2><p>Find something lovely for your everyday.</p><Link className="primary-button" to="/">Explore the collection</Link></div> :
      <div className="cart-layout">
        <div className="cart-items">{items.map((item) => <article className="cart-item" key={item.id}>
          <img src={item.imageUrl} alt={item.name}/>
          <div className="cart-item-info"><span>{item.category}</span><h3>{item.name}</h3><b>{money(item.price)}</b>
            <div className="quantity"><button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={14}/></button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={14}/></button></div>
          </div>
          <button className="remove-button" onClick={() => removeFromCart(item.id)} aria-label={`Remove ${item.name}`}><Trash2 size={17}/></button>
        </article>)}</div>
        <aside className="order-summary"><h2>Order summary</h2><div><span>Subtotal</span><b>{money(total)}</b></div><div><span>Delivery</span><span>Calculated at checkout</span></div><hr/><div className="summary-total"><span>Total</span><b>{money(total)}</b></div><button className="primary-button wide-button" disabled>Checkout coming soon</button><p className="checkout-note">Demo project — no payment will be collected.</p></aside>
      </div>}
  </main>;
}
