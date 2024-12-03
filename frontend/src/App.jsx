import { Navbar } from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import LoginSignup from "./Pages/LoginSignup";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Footer from "./Components/Footer/Footer";
import men_banner from "./Components/Assets/banner_mens.png";
import woman_banner from "./Components/Assets/banner_women.png";
import kid_banner from "./Components/Assets/banner_kids.png";
/**
 * App Component
 *
 * Huvudkomponenten för applikationen som hanterar routing och struktur för en mockup E-commerce webbutik.
 * Den ansvarar för att sätta upp routing med React Router, inkludera navigerings- och footer-komponenter,
 * samt rendera sidor och kategorier baserat på URL-paths.
 *
 * Importerar:
 * - Navbar och Footer: Delar av layouten som finns på varje sida.
 * - BrowserRouter, Routes, Route: Används för att hantera klientbaserad routing.
 * - Shop, ShopCategory, LoginSignup, Product, Cart: Sidor som renderas beroende på URL.
 * - Bannerbilder för kategorier (men_banner, woman_banner, kid_banner).
 *
 * Funktionalitet:
 * - BrowserRouter kapslar in applikationen och möjliggör routing.
 * - Routes och Route definierar de olika sidorna i applikationen:
 *   - `/`: Shop-sidan som visar alla produkter.
 *   - `/mens`, `/womens`, `/kids`: Visar kategorisidor med respektive banner och kategori.
 *   - `/product/:productId`: Visar en enskild produkt baserat på `productId` från URL.
 *   - `/cart`: Visar kundvagnssidan.
 *   - `/login`: Visar login- och signup-sidan.
 *
 * Returnerar:
 * - En applikation som innehåller:
 *   - Navbar (top navigation bar).
 *   - Olika sidor beroende på den aktuella URL-pathen.
 *   - Footer (sidfot som visas på varje sida).
 *
 * FÖRBÄTTRING:
 * 1. **Lazy-loading av sidor**:
 *    - Optimera laddning genom att implementera `React.lazy` och `Suspense` för att ladda sidorna asynkront.
 * 2. **Felhantering vid routing**:
 *    - Lägg till en `404`-sida för att hantera ogiltiga URL-paths.
 * 3. **State Management**:
 *    - Om Navbar eller Footer ska reagera på globala tillstånd (t.ex. om användaren är inloggad),
 *      implementera en global state-lösning som Redux eller Context API.
 * 4. **Kategoridata**:
 *    - Flytta banners och kategoridata till en separat konfigurationsfil eller backend-API
 *      för att undvika hårdkodade värden i komponenten.
 * 5. **SEO och Accessibility**:
 *    - Lägg till `<title>` och `<meta>`-taggar dynamiskt baserat på sidan som laddas.
 *    - Kontrollera att komponenten är tillgänglighetsanpassad (ARIA-attribut, navigerbarhet).
 */

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route
            path="/mens"
            element={<ShopCategory banner={men_banner} category="men" />}
          />
          <Route
            path="/womens"
            element={<ShopCategory banner={woman_banner} category="women" />}
          />
          <Route
            path="/kids"
            element={<ShopCategory banner={kid_banner} category="kid" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
