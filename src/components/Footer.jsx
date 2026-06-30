import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ color: "var(--cream)" }}>
              <span className="brand-dot" /> WILDGROWN
            </div>
            <p style={{ marginTop: 12, opacity: 0.7, maxWidth: 320 }}>
              Forest-grown streetwear and one-of-one thrift. Loud fits, low waste.
            </p>
          </div>
          <div>
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop">All</Link></li>
              <li><Link to="/shop?cat=streetwear">Streetwear</Link></li>
              <li><Link to="/shop?cat=thrift">Thrift</Link></li>
            </ul>
          </div>
          <div>
            <h4>Brand</h4>
            <ul>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/account">Account</Link></li>
              <li><Link to="/account/orders">Orders</Link></li>
            </ul>
          </div>
          <div>
            <h4>Follow</h4>
            <ul>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">TikTok</a></li>
              <li><a href="#">Newsletter</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Wildgrown. All wild reserved.</span>
          <span>Grown loud in the forest.</span>
        </div>
      </div>
    </footer>
  );
}
