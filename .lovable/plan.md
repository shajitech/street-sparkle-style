# Streetwear & Thrift — Pure Vite + React (JSX), Frontend-Only

Rebuild as a plain Vite + React app (`.jsx` files, no TypeScript, no TanStack). All "backend" features are mocked in `localStorage`.

> Heads up: this strips the current TanStack Start foundation. Everything under `src/routes/`, `src/router.tsx`, `src/start.ts`, `src/integrations/`, `routeTree.gen.ts`, and the TS configs gets removed and replaced.

## Stack

- **Vite + React 19** with `.jsx` only
- **react-router-dom** for routing
- **Plain CSS file** for styling (forest green / cream / coral tokens)
- **@fontsource/bebas-neue** + **@fontsource/barlow** for type
- No TS, no TanStack, no server code

## Pages

```
/                     Home
/shop                 Shop with filter (All / Streetwear / Thrift)
/product/:id          Product detail
/cart                 Cart
/checkout             Mock checkout (shipping form, order summary, "place order")
/order-confirmation   Post-checkout success with order #
/account              Account dashboard (logged-in only)
/account/orders       Order history list
/account/orders/:id   Order detail
/login                Mock login / signup
/admin                Admin dashboard (inventory)
/about                Brand story
```

## File structure

```
src/
  main.jsx
  App.jsx                       Routes + global providers
  styles.css                    Tailwind tokens, fonts, grain
  data/
    products.seed.js            ~14 mock products (streetwear + 1-of-1 thrift) with initial stock
  context/
    AuthContext.jsx             mock signup/login/logout, current user in localStorage
    CartContext.jsx             cart in localStorage, persisted per device
    InventoryContext.jsx        product list + stock levels, persisted in localStorage
    OrdersContext.jsx           orders list per user in localStorage
  hooks/
    useRequireAuth.js           redirect to /login if no user
  components/
    Header.jsx                  nav, cart count, account menu
    Footer.jsx
    ProductCard.jsx             broken-grid card + rotated sticker badge
    Hero.jsx
    FilterBar.jsx
    QuantityStepper.jsx
    EmptyState.jsx
    ProtectedRoute.jsx
    AdminRoute.jsx
  pages/
    Home.jsx
    Shop.jsx
    ProductDetail.jsx
    Cart.jsx
    Checkout.jsx
    OrderConfirmation.jsx
    Login.jsx
    About.jsx
    account/
      AccountHome.jsx
      Orders.jsx
      OrderDetail.jsx
    admin/
      AdminDashboard.jsx        inventory table: edit stock, mark sold, add product
```

## Mock "backend" behavior

- **Auth**: signup/login stores `{ id, email, name, role }` in `localStorage`. Passwords stored hashed-ish (not real security — it's a demo). One seeded admin account: `admin@demo / admin`.
- **Inventory**: seeded from `products.seed.js` into `localStorage` on first load. Stock decrements on successful checkout. Thrift items have stock = 1 ("1 of 1"). Admin page can edit stock, price, and add/remove products.
- **Cart**: stored per device in `localStorage`. Validates against current stock before checkout.
- **Checkout**: shipping form (name, address, email) + order summary. "Place order" creates an order, decrements stock, clears cart, redirects to confirmation.
- **Orders**: stored per user; viewable on `/account/orders`. Status is always "Processing" → "Shipped" (admin can toggle).

## Design

- Palette: forest `#1F3A2E`, cream `#F4EBD9`, coral `#FF5A3C`, ink `#0F1B14`
- Fonts: Bebas Neue (display) + Barlow (body)
- Broken-grid layout with offset cards, rotated sticker badges, oversized type, subtle paper grain background
- Focus more on Ui/Ux. it should be in modern animation design

## Cleanup before rebuild

Remove: `src/routes/`, `src/router.tsx`, `src/start.ts`, `src/integrations/`, `src/routeTree.gen.ts`, `tsconfig*.json`, all `.tsx` files. Update `vite.config` to plain `@vitejs/plugin-react` and `index.html` to mount `/src/main.jsx`. Add `react-router-dom` and the two font packages.

## Out of scope

- Real payments / real shipping
- Real authentication or password security
- Multi-device sync (everything lives in localStorage on one device)