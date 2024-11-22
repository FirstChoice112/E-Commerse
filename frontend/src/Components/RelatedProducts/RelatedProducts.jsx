import React from "react";
import "./RelatedProducts.css";
import data_product from "../Assets/data";
import Item from "../Item/Item";

/**
 * Denna komponent ansvarar för att visa relaterade produkter på produktdetaljsidan.
 * Den hämtar och visar en lista med relaterade produkter, inklusive namn, bilder och priser.
 *
 * Funktionalitet:
 * - Visar en lista med relaterade produkter baserat på data från `data_product`.
 * - Varje produkt visas med namn, bild, nytt pris och gammalt pris.
 *
 * Props:
 * - Ingen direkt prop skickas till denna komponent.
 *
 * Context:
 * - Ingen Context används i denna komponent.
 *
 * Importerar:
 * - `RelatedProducts.css`: En CSS-fil som ansvarar för att styla komponenten.
 * - `data_product`: En array med produktdata som används för att visa relaterade produkter.
 * - `Item`: En separat komponent som används för att rendera varje individuell produkt i listan.
 *
 * Förbättringar:
 * 1. **Felhantering**:
 *    - Lägg till en fallback ifall `data_product` är tom eller inte definierad.
 *    - Hantera fel om `Item`-komponenten inte kan renderas korrekt.
 * 2. **Förbättrad användarupplevelse**:
 *    - Lägg till en loader eller en tom status om det inte finns några relaterade produkter.
 *    - Ge användaren möjlighet att se mer information om de relaterade produkterna (t.ex. genom att klicka för att visa detaljer).
 * 3. **Tillgänglighet**:
 *    - Lägg till ARIA-attribut på produkterna för att förbättra tillgängligheten (t.ex. beskrivande alt-texter för bilder).
 *    - Gör att användaren kan navigera mellan produkterna via tangentbordet (tabb-funktionalitet).
 * 4. **Prestandaoptimering**:
 *    - Använd lazy loading för bilderna i `Item`-komponenten för att minska initial laddningstid.
 *    - Memoize listan av relaterade produkter för att förhindra onödig rendering om datan inte har ändrats.
 * 5. **SEO-optimering**:
 *    - Använd semantiska HTML-element som `<section>`, `<article>`, och `<figure>` för att strukturera innehållet.
 *    - Lägg till beskrivande alt-texter till bilderna för att förbättra SEO och tillgänglighet.
 * 6. **Responsivitet**:
 *    - Gör komponenten responsiv så att den fungerar bra på både desktop och mobila enheter.
 *    - Använd flexbox eller grid för att ordna de relaterade produkterna på ett responsivt sätt.
 *
 * Returnerar:
 * - En `div` som innehåller en rubrik och en lista med relaterade produkter. Varje produkt renderas via `Item`-komponenten.
 */

const RelatedProducts = () => {
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item, i) => {
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

export default RelatedProducts;
