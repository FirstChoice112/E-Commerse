import React, { useEffect } from "react";
import "./Popular.css";

/**
 * Denna komponent hanterar visningen av populära produkter inom kategorin "Kvinnor" i applikationen.
 * Syftet med komponenten är att lyfta fram produkter som är särskilt populära och uppmuntra användaren att utforska dessa.
 *
 * Funktionalitet:
 * - Hämtar data om populära produkter från en API-endpoint (`/popularinwomen`) vid komponentens inladdning.
 * - Renderar varje produkt med hjälp av en `Item`-komponent, som visar produktinformation som namn, bild, och priser.
 * - UI innehåller en rubrik, en horisontell linje och en grid som listar de populära produkterna.
 *
 * State och Hooks:
 * - `popularProducts`: Ett state som lagrar de populära produkterna som hämtas från API:t.
 * - `useEffect`: Används för att utföra ett API-anrop och fylla state med data vid inladdning.
 *
 * Props:
 * - Denna komponent tar inga props, men varje `Item`-komponent tar emot flera props för att visa individuella produkter.
 *
 * Importerar:
 * - `Popular.css`: En CSS-fil för att styla komponenten.
 * - `Item`: En komponent som ansvarar för att visa en enskild produkts information.
 *
 * Förbättringar:
 * 1. **Felhantering**:
 *    - Lägg till felhantering för API-anropet, t.ex. visa ett felmeddelande om data inte kan hämtas.
 *    - Hantera tomma svar genom att visa en fallback-text om inga populära produkter finns att visa.
 * 2. **Förbättrad användarupplevelse**:
 *    - Lägg till en laddningsindikator som visas medan data hämtas från API:t.
 *    - Lägg till hover-effekter på varje produkt för att öka interaktiviteten.
 * 3. **Tillgänglighet**:
 *    - Lägg till ARIA-attribut för att förbättra tillgängligheten, t.ex. beskrivningar av produktgridden och individuella produkter.
 *    - Säkerställ att bilderna har beskrivande alt-texter för att stödja skärmläsare.
 * 4. **Prestandaoptimering**:
 *    - Memoisera `Item`-komponenterna för att förhindra onödig rendering.
 *    - Optimera bildstorlekar och använd lazy-loading för att förbättra prestanda.
 * 5. **SEO-optimering**:
 *    - Använd semantiska HTML-element som `<section>` eller `<article>` för att bättre strukturera innehållet.
 *    - Lägg till metadata för rubriken och produkterna för att förbättra sökbarheten.
 *
 * Returnerar:
 * - En `div` som innehåller en rubrik, en horisontell linje, och en lista över populära produkter representerade av `Item`-komponenter.
 */

import Item from "../Item/Item";
import { useState } from "react";
const Popular = () => {
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
      .then((res) => res.json())
      .then((data) => {
        setPopularProducts(data);
      });
  }, []);

  return (
    <div className="popular">
      <h1>POPULAR IN WOMAN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
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

export default Popular;
