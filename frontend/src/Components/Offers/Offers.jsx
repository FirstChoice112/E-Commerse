import React from "react";
import "./Offers.css";
import exclusive_image from "../Assets/exclusive_image.png";

/**
 * Denna komponent hanterar visningen av exklusiva erbjudanden i applikationen.
 * Syftet med komponenten är att informera användaren om kampanjer och uppmana till att utforska produkterbjudanden.
 *
 * Funktionalitet:
 * - Visar en sektion med marknadsföringstext och en knapp som uppmanar användaren att utforska erbjudanden.
 * - Innehåller en bild för att visuellt förstärka meddelandet.
 *
 * Struktur:
 * - Vänster sektion (`offers-left`) innehåller en rubrik, beskrivande text och en knapp för interaktion.
 * - Höger sektion (`offers-right`) visar en bild relaterad till erbjudandena.
 *
 * Props:
 * - Denna komponent tar inga props.
 *
 * State och Events:
 * - Inga states eller events används i komponenten, men knappens `onClick`-event kan utökas för att navigera till en produktöversiktssida eller visa mer information.
 *
 * Importerar:
 * - `Offers.css`: En CSS-fil för att styla komponenten.
 * - En bildfil (`exclusive_image`) som används för att illustrera erbjudandena.
 *
 * Förbättringar:
 * 1. **Felhantering**:
 *    - Lägg till en fallback-mekanism för bilden, t.ex. visa en standardbild eller text om bilden inte kan laddas.
 * 2. **Förbättrad användarupplevelse**:
 *    - Lägg till en hover-effekt på knappen för att ge visuell feedback vid interaktion.
 * 3. **Tillgänglighet**:
 *    - Använd mer beskrivande alt-text för bilden, t.ex. `alt="Exclusive offers on best sellers"`, för att förbättra förståelsen för skärmläsare.
 *    - Lägg till ARIA-attribut för att beskriva knappens funktion, t.ex. `aria-label="Check exclusive offers now"`.
 * 4. **SEO-optimering**:
 *    - Använd semantiska HTML-element som `<section>` för att strukturera innehållet bättre.
 *    - Lägg till metadata och struktur för bättre sökmotoroptimering.
 *
 * Returnerar:
 * - En `div` med två sektioner: en vänstersektion för text och knapp, och en högersektion för bild.
 */

const Offers = () => {
  return (
    <div className="offer">
      <div className="offers-left">
        <h1>Exlusive</h1>
        <h1>Offers For You</h1>
        <p>ONLY ON BEST SELLERS PRODUCTS</p>
        <button>Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_image} alt="exclusive" />
      </div>
    </div>
  );
};

export default Offers;
