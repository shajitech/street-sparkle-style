import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container fade-up">
      <section className="section">
        <span className="eyebrow">— Our story</span>
        <h1 className="h-mega" style={{ color: "var(--forest)", marginTop: 8 }}>
          Grown<br /><span style={{ color: "var(--coral)" }}>loud.</span>
        </h1>
        <div style={{ maxWidth: 720, marginTop: 32, fontSize: "1.15rem", color: "var(--forest-deep)" }}>
          <p style={{ marginBottom: 16 }}>
            Wildgrown started in a damp Portland garage with two sewing machines, a dye-bath, and
            a stack of dead-stock fabric nobody else wanted. We make heavyweight streetwear
            that's built to last and source one-of-one thrift hand-picked from estate sales,
            flea markets, and a network of rural pickers we've been collecting since 2019.
          </p>
          <p style={{ marginBottom: 16 }}>
            Every piece is grown, never grown out of. New streetwear drops every Friday at noon.
            Thrift goes live whenever we find it — and once it's gone, it's gone.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24, marginTop: 48 }}>
          {[
            { n: "550 gsm", t: "Average fabric weight" },
            { n: "100%", t: "Deadstock or organic cotton" },
            { n: "47", t: "Thrift sources worldwide" },
            { n: "1 of 1", t: "On every vintage piece" },
          ].map((s) => (
            <div key={s.n} style={{ background: "var(--cream-deep)", padding: 28, borderRadius: 16 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "3rem", color: "var(--coral)" }}>{s.n}</div>
              <div style={{ color: "var(--forest-soft)", marginTop: 4 }}>{s.t}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <Link to="/shop" className="btn btn-primary">Browse the catalog</Link>
        </div>
      </section>
    </div>
  );
}
