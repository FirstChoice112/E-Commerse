import React, { createContext, useEffect } from "react";
import all_products from "../Assets/data";
import { useState } from "react";
export const ShopContext = createContext(null);

/**
 * ShopContext Provider
 *
 * Denna komponent hanterar alla globala shop-relaterade funktioner och tillstånd
 * för applikationen, inklusive kundvagnshantering och produktdata.
 * Den använder React Context för att göra dessa funktioner tillgängliga i hela applikationen.
 *
 * Funktionalitet:
 * - `useState` används för att hantera:
 *   - `all_product`: Lista med alla produkter som hämtas från servern.
 *   - `cartItems`: Objekt som representerar produkter i kundvagnen, med produktens ID som nyckel och antal som värde.
 * - `useEffect` används för att hämta produktdata från en server och kundvagnsinformation från servern om användaren är inloggad.
 * - Metoder för att lägga till och ta bort produkter från kundvagnen:
 *   - `addToCart`: Lägg till en produkt i kundvagnen och uppdatera servern om användaren är inloggad.
 *   - `removeFromCart`: Ta bort en produkt från kundvagnen och uppdatera servern om användaren är inloggad.
 * - Funktioner för att beräkna totala beloppet och antal artiklar i kundvagnen.
 *
 * Importerar:
 * - `createContext`, `useState`, `useEffect`: Används för att hantera tillstånd och livscykelhantering i komponenten.
 * - `all_products`: En lista med alla tillgängliga produkter som importeras från en lokal fil.
 *
 * Returnerar:
 * - En `ShopContext.Provider` som gör alla funktioner och tillstånd tillgängliga för alla komponenter som använder `ShopContext`.
 *
 * FÖRBÄTTRING:
 * 1. **Felhantering vid API-anrop**:
 *    - Lägg till felhantering för alla fetch-anrop för att hantera potentiella nätverksfel eller serverfel.
 * 2. **Effektivisering av state-uppdateringar**:
 *    - Tänk på att undvika att uppdatera `cartItems` direkt i både UI och servern samtidigt, vilket kan leda till race conditions.
 *    - Överväg att använda `useReducer` för att hantera mer komplex state-lager för kundvagnen.
 * 3. **Dynamisk uppdatering av produktdata**:
 *    - Lägg till ett sätt att uppdatera produkterna när användaren interagerar med sidan, t.ex. efter att en produkt har lagts till eller tagits bort från kundvagnen.
 * 4. **Säker hantering av användartokens**:
 *    - Förbättra säkerheten genom att lagra och använda `auth-token` på ett mer säkert sätt, t.ex. i `HttpOnly`-cookies istället för `localStorage`.
 * 5. **Prestandaoptimering**:
 *    - Överväg att använda `useMemo` för att cache:a resultat från dyra beräkningar som `getTotalCartAmount` för att undvika onödiga omrenderingar.
 */

const getDefaultCard = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};
const ShopContextProvider = (props) => {
  const [all_product, setAll_product] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCard());

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAll_product(data);
      });

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: "",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setCartItems(data);
        });
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`http://localhost:4000/addtocart/`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`http://localhost:4000/removefromcart/`, {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId: itemId,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    getTotalCartAmount,
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartItems,
  };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
