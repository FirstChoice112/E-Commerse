import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

/**
 * Denna komponent hanterar visningen av en produktkategori i applikationen.
 * Den hämtar alla produkter från ShopContext och filtrerar dem baserat på den aktuella kategorin.
 * Kategorins bannerbild och en lista över produkter som tillhör kategorin visas.
 *
 * Funktionalitet:
 * - useContext används för att hämta `all_products` från ShopContext, som innehåller en lista över alla tillgängliga produkter.
 * - `map` används för att iterera över alla produkter och filtrera dem baserat på den kategori som skickas via props.
 * - Om produktens kategori matchar den aktuella, renderas en `Item`-komponent som visar produktens namn, bild, pris och annan relevant information.
 * - En knapp för att "Explorera mer" visas längst ned på sidan.
 *
 * Importerar:
 * - useContext: Används för att hämta alla produkter från ShopContext.
 * - ShopContext: Används för att hämta produktinformationen globalt i applikationen.
 * - Item: En komponent som används för att visa en individuell produkt.
 * - dropdown_icon: En bildikon som används för sorteringsmenyn.
 *
 * Returnerar:
 * - En div som innehåller en banner, en sorteringsmeny, en lista med produkter i kategorin och en "Explore More"-knapp.
 *
 * FÖRBÄTTRING:
 * 1. **Felhantering om inga produkter hittas för kategorin**:
 *    - Lägg till felhantering för att visa ett användarvänligt meddelande om det inte finns några produkter för den valda kategorin.
 * 2. **Prestandaoptimering**:
 *    - Förbättra prestanda genom att använda `React.memo` eller `useMemo` för att optimera renderingen av varje `Item` för att förhindra onödiga omrenderingar.
 * 3. **Loading state**:
 *    - Lägg till en laddningsindikator som visas tills produkterna är hämtade och renderade för att förbättra användarupplevelsen vid långsamma nätverksanrop.
 * 4. **Förbättrad säkerhet**:
 *    - Säkerställ att all data som används i komponenten (särskilt användarinmatning eller data som kommer från externa källor) är korrekt validerade och desinficerade för att undvika säkerhetsproblem som XSS-attacker.
 */

const ShopCategory = (props) => {
  const { all_products } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="img" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="icon" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_products.map((item, i) => {
          if (props.category === item.category) {
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
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
