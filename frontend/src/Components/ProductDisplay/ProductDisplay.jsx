import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

/**
 * Denna komponent ansvarar för att visa detaljerad information om en specifik produkt.
 * Den låter användaren se produktens bilder, pris, beskrivning, betyg och storleksalternativ samt lägga till produkten i kundvagnen.
 *
 * Funktionalitet:
 * - Visar produktens huvudbild och en lista av bildalternativ.
 * - Visar produktens namn, priser (nytt och gammalt), beskrivning, betyg med stjärnor, storleksalternativ och kategorier.
 * - Ger användaren möjlighet att lägga till produkten i kundvagnen via en knapp.
 *
 * Props:
 * - `product`: En objektprop som innehåller detaljerad information om produkten (id, namn, bild, gamla priset, nya priset, etc.).
 *
 * Context:
 * - `ShopContext`: Ett globalt sammanhang som ger åtkomst till `addToCart`-funktionen för att hantera kundvagnen.
 *
 * Importerar:
 * - `ProductDisplay.css`: En CSS-fil som ansvarar för att styla komponenten.
 * - `star_icon`: En ikon som representerar en stjärna för produktbetyg.
 * - `star_dull_icon`: En ikon som representerar en "tom" stjärna för produktbetyg.
 * - `ShopContext`: En React Context som används för att hantera shoppingrelaterad logik.
 *
 * Förbättringar:
 * 1. **Felhantering**:
 *    - Lägg till en fallback om `product` inte är definierad eller om viktiga data saknas.
 *    - Hantera fel om `addToCart` inte är tillgängligt via `ShopContext`.
 * 2. **Förbättrad användarupplevelse**:
 *    - Gör bildgalleriet mer interaktivt, t.ex. genom att låta användaren välja och zooma in på en bild.
 *    - Lägg till visuell feedback när användaren lägger till en produkt i kundvagnen, t.ex. en popup eller ett meddelande.
 * 3. **Tillgänglighet**:
 *    - Lägg till ARIA-attribut för att förbättra tillgängligheten, t.ex. beskrivningar av storleksalternativen och bilderna.
 *    - Gör knappar och länkar navigerbara via tangentbordet.
 * 4. **Prestandaoptimering**:
 *    - Optimera bildladdning genom att använda lazy-loading för bilder i galleriet.
 *    - Använd memoization för att förhindra onödig rendering av komponenter.
 * 5. **SEO-optimering**:
 *    - Använd semantiska HTML-element som `<section>`, `<article>` och `<figure>` för att strukturera innehållet.
 *    - Lägg till beskrivande alt-texter till bilderna för att förbättra SEO och tillgänglighet.
 * 6. **Responsivitet**:
 *    - Lägg till touch-stöd för mobila enheter, särskilt för bildgalleriet.
 *
 * Returnerar:
 * - En `div` som innehåller produktens detaljer, inklusive bilder, pris, beskrivning, betyg, storleksval och en knapp för att lägga till produkten i kundvagnen.
 */

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
          <img src={product.image} alt="product" />
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product.image}
            alt="img"
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-star">
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_icon} alt="star" />
          <img src={star_dull_icon} alt="star dull" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          <div className="productdisplay-right-price-old">
            ${product.old_price}
          </div>
          <div className="productdisplay-right-new">${product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
          A lightweight, usually knitted, pullover shirt, close-fitting and
          short sleeves, worn as an undershirt or outer garment..
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span>Woman, T-shirt, Crop Top
        </p>
        <p className="productdisplay-right-category">
          <span>Tags :</span>Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
