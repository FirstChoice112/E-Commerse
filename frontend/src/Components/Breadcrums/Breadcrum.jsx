import React from "react";
import "./Breadcrum.css";
import arrow_icon from "../Assets/breadcrum_arrow.png";

/**
 * Denna komponent hanterar visningen av brödsmulnavigering i applikationen.
 * Den hjälper användaren att förstå var de befinner sig i produktkategorierna genom att visa en hierarkisk navigering.
 *
 * Funktionalitet:
 * - Komponentens `props` innehåller ett objekt `products` som används för att visa den aktuella produktens kategori och namn.
 * - Komponentens struktur består av en rad med text och pilar som navigerar användaren från "HOME" till den valda produkten.
 * - Dynamisk rendering av produktens kategori och namn i navigeringen, vilket gör att användaren alltid kan se sin aktuella plats i applikationen.
 *
 * Importerar:
 * - arrow_icon: En bildikon som används för att visa pilen mellan de olika nivåerna i brödsmulnavigeringen.
 *
 * Returnerar:
 * - En div med brödsmulnavigeringen som innehåller "HOME", "SHOP", produktens kategori och produktens namn, med en pilikon mellan varje nivå.
 *
 * FÖRBÄTTRING:
 * 1. **Felhantering om `products` inte finns**:
 *    - Lägg till felhantering för att hantera fallet där `products`-objektet inte är tillgängligt eller innehåller ogiltiga värden, vilket kan orsaka rendering av tomma eller felaktiga data.
 * 2. **Prestandaoptimering**:
 *    - Förbättra prestanda genom att använda `React.memo` för att förhindra onödiga omrenderingar om `products` inte ändras.
 * 3. **Responsiv design**:
 *    - Se till att brödsmulnavigeringen fungerar bra på alla skärmstorlekar, särskilt på mobila enheter. Lägg till CSS-media queries för att justera layouten för olika skärmstorlekar.
 * 4. **Förbättrad användartillförlitlighet**:
 *    - Lägg till fallback-värden eller en platsreserv för om kategorin eller produktnamnet inte är definierade för att ge användaren ett bättre meddelande om något saknas.
 * 5. **Förbättrad säkerhet**:
 *    - Säkerställ att all användardata som används i brödsmulnavigeringen (t.ex. produkt- och kategoriinformation) är korrekt validerad för att undvika potentiella säkerhetsproblem.
 */

const Breadcrum = (props) => {
  const { products } = props;
  return (
    <div className="breadcrum">
      HOME
      <img src={arrow_icon} alt="arrow" />
      SHOP <img src={arrow_icon} alt="arrow" />
      {products.category} <img src={arrow_icon} alt="arrow" /> {products.name}
    </div>
  );
};

export default Breadcrum;
