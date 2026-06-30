import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero__grid">
          <div className="fade-up">
            <span className="eyebrow">— Drop 04 / Forest Edition</span>
            <h1 className="hero__title">
              Loud<br />
              <span className="accent">fits.</span><br />
              <span className="outline">Low waste.</span>
            </h1>
            <p className="hero__lead">
              Heavyweight streetwear grown out of the forest, and one-of-one
              thrift hand-picked across two continents. New drops every Friday.
            </p>
            <div className="hero__cta">
              <Link to="/shop" className="btn btn-primary">Shop the drop</Link>
              <Link to="/shop?cat=thrift" className="btn btn-outline">See 1-of-1s</Link>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__img hero__img--a">
              <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1000&q=80" alt="Streetwear model" />
            </div>
            <div className="hero__img hero__img--b">
              <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80" alt="Vintage thrift" />
            </div>
            <span className="sticker hero__sticker">NEW / FRIDAY</span>
          </div>
        </div>
      </div>
      <div className="hero__marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              FREE SHIPPING OVER $120 <span className="dot" />
              ONE OF ONE THRIFT <span className="dot" />
              HEAVYWEIGHT BUILD <span className="dot" />
              GROWN LOUD <span className="dot" />
              NEW DROPS FRIDAY <span className="dot" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
