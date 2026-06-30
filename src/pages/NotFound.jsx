import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="container section empty fade-up">
      <h1 className="h-mega" style={{ color: "var(--forest)" }}>404</h1>
      <p>That trail's gone cold.</p>
      <Link to="/" className="btn btn-primary">Back home</Link>
    </div>
  );
}
