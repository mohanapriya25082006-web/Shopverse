import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";

function NotFound() {
  return <main className="simple-page"><h1>Page not found.</h1><a href="/">Return home</a></main>;
}

export default function App() {
  return <><Navbar/><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/products/:id" element={<ProductDetails/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes><footer className="footer"><span className="brand">shopverse<span className="brand-dot">.</span></span><span>Thoughtful finds for everyday living.</span><span>© 2026 ShopVerse Capstone</span></footer></>;
}
