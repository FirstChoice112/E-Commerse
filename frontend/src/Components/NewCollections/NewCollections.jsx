import React, { useEffect } from "react";
import "./NewCollections.css";
import new_collections from "../Assets/new_collections";
import Item from "../Item/Item";
import { useState } from "react";

/**
 * Denna komponent hanterar visningen av nya kollektioner i applikationen.
 * Den hämtar data om nya produkter från en backend och visar varje produkt med hjälp av en `Item`-komponent.
 *
 * Funktionalitet:
 * - Komponentens data hämtas från en API-endpoint (`/newcollections`) när komponenten laddas.
 * - Varje produkt representeras av en `Item`-komponent som visar information om produkten, inklusive namn, bild, och pris.
 * - Komponentens UI består av en rubrik, ett horisontellt linjeelement, och en grid av produkter.
 *
 * State:
 * - `new_collection`: Ett state som lagrar de nya kollektionerna som hämtas från backend.
 *
 * Hooks:
 * - `useEffect`: Används för att hämta data från API:t när komponenten mountas.
 * - `useState`: Hanterar state för listan över nya kollektioner.
 *
 * Props:
 * - Inga props används i denna komponent, men `Item`-komponenten tar emot flera props för att visa produktinformation.
 *
 * Importerar:
 * - `NewCollections.css`: En CSS-fil för att styla komponenten.
 * - Bilddata för kollektionerna från `../Assets/new_collections` (används inte här, eventuellt redundant).
 * - `Item`: En komponent som ansvarar för att visa en individuell produkt.
 *
 * Förbättringar:
 * 1. **Felkontroll**:
 *    - Lägg till felhantering om API-anropet misslyckas, t.ex. visa ett felmeddelande.
 * 2. **Förbättrad användarupplevelse**:
 *    - Visa en laddningsindikator medan data hämtas.
 *    - Lägg till fallback-innehåll om `new_collection` är tom.
 * 3. **Prestandaoptimering**:
 *    - Använd memoization för att förhindra onödig rendering av `Item`-komponenter.
 *    - Cachea API-svaret för att minska antal anrop till servern.
 * 4. **Tillgänglighet**:
 *    - Lägg till ARIA-attribut för att förbättra tillgängligheten, exempelvis på listan med produkter.
 * 5. **SEO-optimering**:
 *    - Använd semantiska HTML-element som `<section>` eller `<article>` för att strukturera innehållet bättre.
 *
 * Returnerar:
 * - En `div` som innehåller rubrik, en horisontell linje, och en lista av nya produkter.
 */

const NewCollections = () => {
  const [new_collections, setNew_collection] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/newcollections")
      .then((res) => res.json())
      .then((data) => {
        setNew_collection(data);
      });
  }, []);

  return (
    <div className="New-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
