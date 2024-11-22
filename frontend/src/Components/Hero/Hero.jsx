import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow_icon.svg";
import hero_image from "../Assets/hero_image.png";

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
 * 2. **Responsiv design**:
 *    - Justera layouten för att vara mobilvänlig, så att text och bilder anpassar sig korrekt på olika skärmstorlekar.
 * 3. **Förbättra interaktivitet**:
 *    - Lägg till länkar eller knappfunktioner för att navigera till den senaste kollektionen när användaren klickar på knappen.
 * 4. **SEO-optimering**:
 *    - Se till att använda relevanta ARIA-attribut för att förbättra sidans synlighet och tillgänglighet i sökmotorer.
 * 5. **Prestandaoptimering**:
 *    - Optimera bildstorlekarna för `hero_image` och ikonerna för att minska sidans laddningstid, särskilt på mobila enheter.
 */

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="hand" />
          </div>
          <p>collections</p>
          <p>for everyone</p>
        </div>
        <div className="hero-latest-btn">
          <div>Latest Collection</div>
          <img src={arrow_icon} alt="arrow" />
        </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
