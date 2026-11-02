import { useEffect, useMemo, useState } from "react";
import { ArrowDown, Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

const categories = ["All", "Electronics", "Accessories", "Fashion", "Home"];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(setProducts).finally(() => setLoading(false));
  }, []);

  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = category === "All" || product.category.toLowerCase() === category.toLowerCase();
    const text = `${product.name} ${product.description} ${product.category}`.toLowerCase();
    return matchesCategory && text.includes(query.toLowerCase().trim());
  }), [products, category, query]);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-line"/> THE EVERYDAY EDIT — VOL. 01</span>
          <h1>Good things.<br/><em>Better living.</em></h1>
          <p>Thoughtful finds for the spaces you live in, the places you go, and everything in between.</p>
          <a className="primary-button" href="#collection">Explore the collection <ArrowDown size={16}/></a>
        </div>
        <div className="hero-art">
          <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=1200" alt="Warm minimalist lifestyle interior" fetchPriority="high"/>
          <div className="hero-note"><span>CURATED FOR YOU</span><strong>Make room<br/>for better.</strong></div>
          <div className="hero-index">01 <span>/</span> 04</div>
        </div>
        <div className="hero-side-label">OBJECTS WITH PURPOSE · EST. 2026</div>
      </section>

      <section className="collection section-wrap" id="collection">
        <div className="section-heading">
          <div><span className="eyebrow">THE SHOP</span><h2>Find your <em>favourite.</em></h2></div>
          <p>A little something for every day.<br/>Always selected with intention.</p>
        </div>
        <div className="toolbar">
          <div className="category-tabs" aria-label="Filter by category">
            {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={category === item ? "active" : ""}>{item}</button>)}
          </div>
          <label className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search the collection..." aria-label="Search products"/></label>
        </div>
        {loading ? <div className="empty-state">Gathering the good stuff…</div> :
          visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index}/>)}</div> :
          <div className="empty-state"><SlidersHorizontal size={22}/><p>No products match that search. Try another category or keyword.</p><button onClick={() => {setQuery("");setCategory("All");}}>Clear filters</button></div>}
      </section>
      <section className="story-band" id="story"><span className="eyebrow">LESS, BUT BETTER</span><h2>Choose well.<br/><em>Keep forever.</em></h2><p>We believe the best things earn their place in your everyday.</p></section>
    </>
  );
}
