import React from "react";
import "./DescriptionBox.css";

/**
 * Denna komponent hanterar visningen av produktbeskrivning och recensioner i applikationen.
 * Den hjälper användaren att läsa mer om produkten genom att visa en detaljerad beskrivning och ge möjlighet att navigera mellan beskrivning och recensioner.
 *
 * Funktionalitet:
 * - Komponentens struktur består av en navigeringsrad för att växla mellan "Description" och "Reviews".
 * - Visar produktbeskrivningen i en separat sektion där användaren kan läsa om produkten.
 * - Stöd för visning av recensioner, även om de inte är fullt implementerade ännu.
 * - Dynamisk rendering av beskrivningen, vilket gör att användaren kan få all relevant information om produkten.
 *
 * Importerar:
 * - `DescriptionBox.css`: En CSS-fil för att styla komponenten.
 *
 * Returnerar:
 * - En `div` med en navigeringssektion för "Description" och "Reviews" samt produktbeskrivningen i en separat sektion.
 *
 * FÖRBÄTTRINGAR:
 * 1. **Felhantering om beskrivningen är tom eller saknas**:
 *    - Lägg till felhantering för att hantera fallet där beskrivningen eller andra produktuppgifter saknas, så att användaren inte ser en tom eller felaktig visning.
 * 2. **Prestandaoptimering**:
 *    - Förbättra prestanda genom att använda `React.memo` för att förhindra onödiga omrenderingar om beskrivningen inte ändras.
 * 3. **Användarvänlighet**:
 *    - Gör det möjligt för användaren att växla mellan beskrivning och recensioner på ett smidigt sätt genom att lägga till funktionalitet för att visa recensioner när de klickar på "Reviews".
 * 4. **Responsiv design**:
 *    - Se till att beskrivnings- och recensionerna fungerar bra på alla skärmstorlekar, särskilt på mobila enheter. Använd CSS-media queries för att justera layouten på mindre skärmar.
 * 5. **Förbättrad säkerhet**:
 *    - Säkerställ att all användardata som används i beskrivningen eller recensionerna (om någon) är korrekt validerad för att förhindra potentiella säkerhetsproblem, särskilt om recensionerna kommer från externa källor.
 */

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          An e-comerce website is an online platform that facilitates buying and
          selling products or services over the internet. This serves as a
          viritual marketplace where businesses and individuals showcase their
          products, interact with customers, and conduct transactions without
          the need for a physical presence. E-com websites have gained immense
          popularity due to their convenient accessibility, and the global reach
          they offer.
        </p>
        <p>
          E-commerce websites typically display products or services along with
          detailed descriptions, images, prices, and any available variations
          (e.g., sizes, colors). Each product usually has its own dedicated page
          with relevant information
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
