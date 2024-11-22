import React from "react";
import "./Footer.css";
import footer_logo from "../Assets/logo.png";
import instagram_icon from "../Assets/instagram_icon.png";
import pinterest_icon from "../Assets/pintester_icon.png";
import whatsapp_icon from "../Assets/whatsapp_icon.png";

/**
 * Denna komponent hanterar visningen av sidfoten i applikationen.
 * Den ger användaren viktig information om företaget och länkar till sociala mediekanaler.
 *
 * Funktionalitet:
 * - Komponentens struktur består av en företagslogo, en lista med länkar, sociala medie-ikoner och en upphovsrättssektion.
 * - Länkarna inkluderar information om företaget, produkter, kontor, om oss, och kontakt.
 * - Sociala medie-ikoner för Instagram, Pinterest och WhatsApp.
 * - Upphovsrättsinformation längst ner.
 *
 * Importerar:
 * - `Footer.css`: En CSS-fil för att styla komponenten.
 * - Bildfiler för logotypen och sociala medie-ikonerna.
 *
 * Returnerar:
 * - En `div` med layouten för sidfoten som inkluderar företagslogo, länkar, sociala ikoner och upphovsrättsinformation.
 *
 * FÖRBÄTTRINGAR:
 * 1. **Tillgänglighet**:
 *    - Lägg till alt-texter som bättre beskriver ikoner och bilder för att förbättra tillgängligheten för skärmläsare och användare med synnedsättning.
 * 2. **Responsiv design**:
 *    - Justera layouten för att vara mobilvänlig och säkerställa att alla element är korrekt anpassade på små skärmar.
 * 3. **Förbättra interaktivitet**:
 *    - Lägg till länkar till sociala medie-ikoner så att användare kan interagera direkt från sidfoten.
 * 4. **SEO-optimering**:
 *    - Lägg till relevanta meta-taggar eller ARIA-attribut för att förbättra sidfotens synlighet i sökmotorer och förbättra användarupplevelsen.
 * 5. **Prestandaoptimering**:
 *    - Optimera bildstorlekarna för sociala ikoner och logotypen för att minska sidans laddningstid.
 */

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_logo} alt="footer" />
        <p>SHOPPER</p>
      </div>
      <ul className="footer-links">
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icons">
        <div className="footer-icons-container">
          <img src={instagram_icon} alt="instagram" />
        </div>
        <div className="footer-icons-container">
          <img src={pinterest_icon} alt="instagram" />
        </div>
        <div className="footer-icons-container">
          <img src={whatsapp_icon} alt="instagram" />
        </div>
      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @2024 - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
