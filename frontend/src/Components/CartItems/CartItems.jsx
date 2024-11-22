import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import cross_icon from "../Assets/cross_icon.png";

/**
 * Denna komponent hanterar visningen och interaktionen med varor i kundvagnen.
 * Den gör det möjligt för användaren att se sina valda produkter, justera kvantiteter, ta bort produkter och se totala priser.
 *
 * Funktionalitet:
 * - Komponentens `props` hämtar alla produkter och kundvagnens objekt via `useContext`-hooken från `ShopContext`.
 * - Produktenas bild, namn, pris, kvantitet, och totalt pris per vara visas i en tabell.
 * - Användaren kan ta bort produkter från kundvagnen via en "ta bort"-ikon.
 * - Totalt pris beräknas baserat på antalet varor och pris per vara, och ett totala belopp visas.
 * - En möjlighet att ange en rabattkod finns.
 * - Komponentens användargränssnitt är responsivt och anpassar sig efter skärmstorlek.
 *
 * Importerar:
 * - `cross_icon`: En bildikon för att ta bort produkter från kundvagnen.
 * - `ShopContext`: För att hämta och manipulera kundvagnens tillstånd (varor, totala belopp etc.).
 *
 * Returnerar:
 * - En `div` som visar alla produkter i kundvagnen samt totalbelopp, möjlighet att ange rabattkod och en "Proceed to Checkout"-knapp.
 *
 * FÖRBÄTTRINGAR:
 * 1. **Felhantering om `cartItems` eller `all_products` inte finns**:
 *    - Lägg till felhantering för att hantera fallet där `cartItems` eller `all_products` inte är tillgängliga eller innehåller ogiltiga värden, vilket kan orsaka att komponenten inte fungerar korrekt.
 * 2. **Prestandaoptimering**:
 *    - Förbättra prestanda genom att använda `React.memo` för att förhindra onödiga omrenderingar när produkter i kundvagnen inte har ändrats.
 * 3. **Responsiv design**:
 *    - Se till att kundvagnslistan och knapparna fungerar bra på alla skärmstorlekar, särskilt på mobila enheter. Använd CSS-media queries för att justera layouten på mindre skärmar.
 * 4. **Förbättrad användartillförlitlighet**:
 *    - Lägg till fallback-värden eller ett meddelande för om produktdata (som bild eller pris) saknas för att ge användaren ett bättre meddelande om något saknas.
 * 5. **Förbättrad säkerhet**:
 *    - Säkerställ att all användardata som används i kundvagnen (t.ex. produktinformation och rabattkod) är korrekt validerad och desinficerad för att undvika potentiella säkerhetsproblem.
 */

const CartItems = () => {
  const { all_products, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);
  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={e.image}
                  alt="cart"
                  className="carticon-product-icon"
                />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img
                  className="cartitems-cross-icon"
                  src={cross_icon}
                  onClick={() => removeFromCart(e.id)}
                  alt="cross"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button>PROCEES TO CHECKOUT</button>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
