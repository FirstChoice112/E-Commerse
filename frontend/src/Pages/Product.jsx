import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";

/**
 * Denna komponent hanterar visningen av en specifik produkt i applikationen.
 * Den hämtar produktinformation baserat på produktens ID från URL:en och visar produktens detaljer, beskrivning och relaterade produkter.
 *
 * Funktionalitet:
 * - useContext används för att hämta `all_products` från ShopContext, som innehåller en lista över alla tillgängliga produkter.
 * - useParams används för att hämta `productId` från URL:en, vilket används för att identifiera den specifika produkten som ska visas.
 * - `find` används för att söka upp den produkt i `all_products`-listan som matchar det aktuella `productId`.
 * - Komponenterna `Breadcrum`, `ProductDisplay`, `DescriptionBox` och `RelatedProducts` renderas för att visa produktens detaljer, beskrivning och relaterade produkter.
 *
 * Importerar:
 * - useContext: Används för att hämta global produktinformation från ShopContext.
 * - useParams: Används för att hämta `productId` från URL:en för att identifiera vilken produkt som ska visas.
 * - Breadcrum: Används för att visa en brödsmulnavigering som hjälper användaren att förstå var de befinner sig i applikationen.
 * - ProductDisplay: Används för att visa produktens huvudinformation, t.ex. bild, pris och tillgänglighet.
 * - DescriptionBox: Används för att visa en detaljerad beskrivning av produkten.
 * - RelatedProducts: Används för att visa produkter som är relaterade till den aktuella produkten.
 *
 * Returnerar:
 * - En div som innehåller en brödsmulnavigering, produktens visning, beskrivning och relaterade produkter.
 *
 * FÖRBÄTTRING:
 * 1. **Felhantering om produkt inte hittas**:
 *    - Lägg till felhantering för att visa ett användarvänligt meddelande eller en fallback-komponent om produkten inte finns i `all_products`.
 * 2. **Prestandaoptimering**:
 *    - Förbättra prestanda genom att optimera renderingen av `ProductDisplay`, `DescriptionBox` och `RelatedProducts` med hjälp av `React.memo` eller `useMemo` för att förhindra onödiga omrenderingar.
 * 3. **Loading state**:
 *    - Lägg till en laddningsindikator som visas tills produktinformationen är hämtad och renderad, för att förbättra användarupplevelsen vid långsamma nätverksanrop.
 * 4. **Förbättrad säkerhet**:
 *    - Säkerställ att alla data som används i komponenten (särskilt användarinmatning eller data som kommer från externa källor) är korrekt validerade och desinficerade för att undvika säkerhetsproblem som XSS-attacker.
 */

const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_products.find((e) => e.id === Number(productId));
  return (
    <div>
      <Breadcrum products={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
