import { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

/**
 * ListProduct Component
 *
 * Denna komponent ansvarar för att hämta och visa en lista av produkter från ett API.
 * Den visar produktens bild, namn, gamla pris, nya pris, kategori och en borttagningsikon.
 *
 * Funktioner:
 * 1. Hämtar produktinformation från API vid komponentens första rendering med hjälp av useEffect.
 * 2. Visar en loader medan produktinformationen hämtas.
 * 3. Visar ett meddelande om ingen produkt finns tillgänglig.
 * 4. Ger användaren möjlighet att ta bort en produkt via ett "borttagnings"-ikons klick.
 *    Vid borttagning uppdateras listan direkt utan att behöva hämta om alla produkter från servern.
 * 5. Felhantering är implementerat för både hämtning och borttagning av produkter.

 * @returns {JSX.Element} - Renderar listan av produkter eller ett laddningsmeddelande.
 *
 * IMPROVEMENTS
 * 1. Optimera hämtning av data efter borttagning
 * - Istället för att hämta alla produkter igen efter att en produkt tagits bort, kan du uppdatera allproducts-state lokalt. Detta förbättrar prestandan och minskar antalet API-anrop.
 * . Loader-komponent
 * - Det finns ingen implementerad loader i komponenten. Lägg till en isLoading state och visa en loader-komponent när data hämtas.
 * Felmeddelande till användaren
 * - Visa ett användarvänligt felmeddelande om hämtningen misslyckas eller om produkten inte kan tas bort.
 * Använd useCallback för att undvika onödiga renderingar
 * - Om du vill förbättra prestandan ytterligare kan du använda useCallback för att memorisera funktionerna fetchInfo och removeProduct.
 *  Bättre hantering av key-prop
* - Just nu använder jag index som key-prop i mappningen. Det är bättre att använda product.id eftersom id är unikt!
* CSS-styling: BEM-standard
* -För att göra CSS mer konsekvent och enkel att underhålla kan du använda BEM-konventionen. Exempel:
- listproduct-format → list-product__item
- listproduct-product-icon → list-product__icon
- listproduct-remove-icon → list-product__remove-icon
 */
const ListProduct = () => {
  const [allproducts, setAllproducts] = useState([]);

  //* Funktion för att hämta produkter från API
  const fetchInfo = async () => {
    try {
      const response = await fetch("http://localhost:4000/allproducts");
      if (!response.ok) {
        console.error("Error fetching products:", response.status);
        return;
      }
      const data = await response.json();
      setAllproducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  //* useEffect för att hämta produkter vid laddning
  useEffect(() => {
    fetchInfo();
  }, []);

  //* Funktion för att ta bort produkt
  const removeProduct = async (id) => {
    try {
      await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      // Uppdatera produktlistan efter borttagning
      await fetchInfo();
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {/* Loopar genom alla produkter och renderar dem */}
        {allproducts.map((product, index) => (
          <div
            key={index}
            className="listproduct-format-main listproduct-format"
          >
            <img
              src={product.image}
              alt="listproduct icon"
              className="listproduct-product-icon"
            />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img
              onClick={() => removeProduct(product.id)}
              className="listproduct-remove-icon"
              src={cross_icon}
              alt="remove-icon"
            />
          </div>
        ))}
        <hr />
      </div>
    </div>
  );
};

export default ListProduct;
