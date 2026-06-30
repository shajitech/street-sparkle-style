// Seed product data — streetwear + 1-of-1 thrift
// Photos: Unsplash (free to use)

export const SEED_PRODUCTS = [
  {
    id: "wg-001",
    name: "Moss Heavy Hoodie",
    category: "streetwear",
    price: 128,
    sizes: ["S", "M", "L", "XL"],
    badge: "NEW",
    description:
      "550gsm loop-back cotton in deep forest. Boxy cut, raw-hem cuffs, oversized hood. Made to be lived in.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80",
    ],
    stock: { S: 8, M: 12, L: 10, XL: 4 },
  },
  {
    id: "wg-002",
    name: "Wildgrown Tee — Coral",
    category: "streetwear",
    price: 48,
    sizes: ["S", "M", "L", "XL"],
    badge: "DROP",
    description:
      "Heavyweight 240gsm tee with hand-drawn back graphic. Garment-dyed for that lived-in fade.",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80",
    ],
    stock: { S: 20, M: 30, L: 25, XL: 12 },
  },
  {
    id: "wg-003",
    name: "Vintage Carhartt Chore Jacket",
    category: "thrift",
    price: 165,
    sizes: ["L"],
    badge: "1 OF 1",
    description:
      "Sun-faded duck canvas. Honest patina, original union label. Sourced from a Montana ranch. One only.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80",
    ],
    stock: { L: 1 },
  },
  {
    id: "wg-004",
    name: "Forest Cargo Pants",
    category: "streetwear",
    price: 142,
    sizes: ["28", "30", "32", "34", "36"],
    badge: "NEW",
    description:
      "Twelve-ounce ripstop with bellows pockets and a relaxed taper. Engineered to take a beating.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=900&q=80",
    ],
    stock: { "28": 5, "30": 12, "32": 14, "34": 9, "36": 4 },
  },
  {
    id: "wg-005",
    name: "90s Nike Track Top",
    category: "thrift",
    price: 88,
    sizes: ["M"],
    badge: "1 OF 1",
    description:
      "Genuine 1996 swoosh. Color-blocked nylon, full zip, deadstock condition. Single piece.",
    images: [
      "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=900&q=80",
    ],
    stock: { M: 1 },
  },
  {
    id: "wg-006",
    name: "Cream Knit Beanie",
    category: "streetwear",
    price: 38,
    sizes: ["ONE"],
    badge: null,
    description: "Chunky ribbed merino. Roll-cuff. Embroidered seed-pod logo.",
    images: [
      "https://images.unsplash.com/photo-1580906853149-13c25b3e76e8?w=900&q=80",
    ],
    stock: { ONE: 40 },
  },
  {
    id: "wg-007",
    name: "Patchwork Denim Jacket",
    category: "thrift",
    price: 220,
    sizes: ["L"],
    badge: "1 OF 1",
    description:
      "Hand-mended with kantha stitching and reclaimed fabric squares. No two are alike — this one is yours.",
    images: [
      "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=900&q=80",
    ],
    stock: { L: 1 },
  },
  {
    id: "wg-008",
    name: "Heavyweight Crew",
    category: "streetwear",
    price: 108,
    sizes: ["S", "M", "L", "XL"],
    badge: null,
    description: "Cream-on-forest tonal crew. Drop shoulder, ribbed hem.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=900&q=80",
    ],
    stock: { S: 10, M: 15, L: 12, XL: 8 },
  },
  {
    id: "wg-009",
    name: "Retro Champion Sweats",
    category: "thrift",
    price: 72,
    sizes: ["M"],
    badge: "1 OF 1",
    description:
      "Late-90s reverse-weave gym sweats in college green. Repaired waistband. Soft as butter.",
    images: [
      "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=900&q=80",
    ],
    stock: { M: 1 },
  },
  {
    id: "wg-010",
    name: "Tactical Crossbody",
    category: "streetwear",
    price: 84,
    sizes: ["ONE"],
    badge: "NEW",
    description: "1000D Cordura sling with MOLLE webbing. Roomy enough for a deck and a sketchbook.",
    images: [
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=900&q=80",
    ],
    stock: { ONE: 18 },
  },
  {
    id: "wg-011",
    name: "Faded Band Tee",
    category: "thrift",
    price: 55,
    sizes: ["L"],
    badge: "1 OF 1",
    description: "Real-deal 2003 tour shirt. Cracked print, paper-thin cotton. The good stuff.",
    images: [
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?w=900&q=80",
    ],
    stock: { L: 1 },
  },
  {
    id: "wg-012",
    name: "Quilted Liner Vest",
    category: "streetwear",
    price: 165,
    sizes: ["S", "M", "L"],
    badge: "DROP",
    description:
      "Recycled-down liner vest in cream. Layer it under everything from October to April.",
    images: [
      "https://images.unsplash.com/photo-1591047139756-eaa2da7b1cbf?w=900&q=80",
    ],
    stock: { S: 6, M: 10, L: 7 },
  },
  {
    id: "wg-013",
    name: "Workwear Trucker Cap",
    category: "streetwear",
    price: 42,
    sizes: ["ONE"],
    badge: null,
    description: "Six-panel cotton-canvas cap. Pre-curved brim, snapback. Forest-on-forest patch.",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80",
    ],
    stock: { ONE: 25 },
  },
  {
    id: "wg-014",
    name: "Levi's 501 — Dirty Wash",
    category: "thrift",
    price: 110,
    sizes: ["32"],
    badge: "1 OF 1",
    description: "Mid-2000s 501s with the perfect amount of crud and a busted-in honeycomb fade.",
    images: [
      "https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?w=900&q=80",
    ],
    stock: { "32": 1 },
  },
];
