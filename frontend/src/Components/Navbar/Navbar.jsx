import React, { useState, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { useRef } from "react";
import nav_dropdown from "../Assets/nav_dropdown.png";

/**
 * Denna komponent hanterar visningen och funktionaliteten för navigationsfältet (Navbar) i applikationen.
 * Navigationsfältet innehåller logotyp, meny för navigering mellan olika sektioner, en inloggnings-/utloggningsknapp och en varukorgsikon med räkning.
 *
 * Funktionalitet:
 * - Menyn innehåller navigeringslänkar till sektioner: Shop, Men, Women och Kids.
 * - En dropdown-meny aktiveras i mindre skärmstorlekar via en hamburgarikon.
 * - Visar en dynamisk "Login"/"Logout"-knapp beroende på användarens autentiseringsstatus.
 * - Varukorgsikonen visar antalet varor som användaren har i sin varukorg.
 * - Navigeringslänkar markerar visuellt den aktuella sidan med hjälp av en linje (hr-element).
 *
 * State och Context:
 * - `menu`: Lokal state som håller koll på vilken meny som är aktiv.
 * - `ShopContext`: Kontext som används för att hämta antalet varor i varukorgen via `getTotalCartItems`.
 *
 * Referenser:
 * - `menuRef`: En referens till menyn som används för att visa och dölja dropdown-menyn.
 *
 * Props:
 * - Inga props används direkt, men `ShopContext` ger relevant data via kontext.
 *
 * Importerar:
 * - `Navbar.css`: En CSS-fil för att styla komponenten.
 * - Bildfiler för logotypen (`logo`), varukorgsikonen (`cart_icon`) och dropdown-ikonen (`nav_dropdown`).
 * - `Link` från `react-router-dom` för att skapa navigeringslänkar.
 * - `ShopContext` från applikationens kontext för att hantera varukorgsdata.
 *
 * Returnerar:
 * - En `div` som representerar navigationsfältet med logotyp, meny, inloggnings-/utloggningsknapp och varukorg.
 *
 * FÖRBÄTTRINGAR:
 * 1. **Tillgänglighet**:
 *    - Lägg till mer beskrivande `alt`-texter för bilder och ikoner för att förbättra tillgängligheten för skärmläsare.
 *    - Se till att knappar och länkar har klara och tydliga fokus-stilar för tangentbordsnavigering.
 * 2. **Förbättrad användarupplevelse**:
 *    - Lägg till en animation när dropdown-menyn öppnas/stängs.
 *    - Visa en bekräftelse-popup vid utloggning för att undvika oavsiktliga klick.
 * 3. **SEO-optimering**:
 *    - Använd ARIA-attribut för att definiera menyn som en navigationslandmärke och förbättra sidans struktur för sökmotorer.
 * 4. **Prestandaoptimering**:
 *    - Optimera bildstorlekar för logotypen och ikonerna för att minska laddningstiden.
 *    - Begränsa onödig rendering genom att memoizea komponenter där det är relevant.
 */

export const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt="nav-dropdown"
      />
      <ul ref={menuRef} className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/mens">
            Men
          </Link>
          {menu === "mens" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("women");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/womens">
            Women
          </Link>
          {menu === "women" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/kids">
            Kids
          </Link>
          {menu === "kids" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token") ? (
          <button
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace(`/`);
            }}
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="cart icon" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};
