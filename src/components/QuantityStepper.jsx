export default function QuantityStepper({ value, onChange, max = 99 }) {
  return (
    <div className="qty-stepper">
      <button onClick={() => onChange(Math.max(1, value - 1))}>−</button>
      <span>{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}
