export default function FilterBar({ value, onChange }) {
  const opts = [
    { id: "all", label: "All" },
    { id: "streetwear", label: "Streetwear" },
    { id: "thrift", label: "Thrift / 1-of-1" },
  ];
  return (
    <div className="filter-bar">
      {opts.map((o) => (
        <button
          key={o.id}
          className={`filter-chip ${value === o.id ? "active" : ""}`}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
