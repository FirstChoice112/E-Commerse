import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";

/**
 * Denna komponent hanterar visningen av huvudsektionen (Hero) på startsidan.
 * Den presenterar de senaste produkterna och samlingarna för användaren.
 *
 * Funktionalitet:
 * - Komponentens struktur består av en vänstersektion med rubriker, ikoner och en knapp för att visa den senaste kollektionen.
 * - En ikon med en hand används för att markera "ny" och ge visuell uppmärksamhet till nya produkter.
 * - Högersektionen visar en bild som representerar produkterna eller temat för den aktuella kollektionen.
 * - Knappen "Latest Collection" innehåller en pilikon som antyder att användaren kan scrolla eller interagera för att få mer information.
 *
 * Importerar:
 * - `Hero.css`: En CSS-fil för att styla komponenten.
 * - Bildfiler för hand-ikonen, pil-ikonen och hero-bilden.
 *
 * Returnerar:
 * - En `div` med layouten för Hero-sektionen som innehåller en vänstersektion med text och en knapp samt en högersektion med en bild.
 *
 * FÖRBÄTTRINGAR:
 * 1. **Tillgänglighet**:
 *    - Lägg till mer beskrivande alt-texter för bilder och ikoner för att förbättra tillgängligheten för skärmläsare och användare med synnedsättning.
 * 3. **Förbättra interaktivitet**:
 *    - Lägg till länkar eller knappfunktioner för att navigera till den senaste kollektionen när användaren klickar på knappen.
 * 4. **SEO-optimering**:
 *    - Se till att använda relevanta ARIA-attribut för att förbättra sidans synlighet och tillgänglighet i sökmotorer.
 * 5. **Prestandaoptimering**:
 *    - Optimera bildstorlekarna för `hero_image` och ikonerna för att minska sidans laddningstid, särskilt på mobila enheter.
 */
const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image} alt="img" />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  );
};

export default Item;
