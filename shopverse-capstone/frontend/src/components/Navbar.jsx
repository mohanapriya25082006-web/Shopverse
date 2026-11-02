import { Link, NavLink } from "react-router-dom";
import { ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { count } = useCart();
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link to="/" className="brand"><span className="brand-mark"><Sparkles size={17}/></span> shopverse<span className="brand-dot">.</span></Link>
        <nav className="main-nav">
          <NavLink to="/" end>Discover</NavLink>
          <a href="/#collection">Collection</a>
          <a href="/#story">Our story</a>
        </nav>
        <Link to="/cart" className="cart-link" aria-label={`Shopping cart with ${count} items`}>
          <ShoppingBag size={19}/><span>Bag</span><b>{count}</b>
        </Link>
      </div>
    </header>
  );
}
