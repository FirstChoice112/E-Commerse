import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/Addproduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
/**
 * Admin-komponenten ansvarar för att hantera sidlayouten för administratörssidan.
 * Den innehåller en sidomeny (Sidebar) och två rutter för att hantera produkter:
 * - AddProduct: Sida för att lägga till en ny produkt
 * - ListProduct: Sida för att lista alla produkter
 *
 * FÖRBÄTTRING:
 * -Lägg till en Not Found Rutt som visar ett felmeddelande med Styling
 * -azy loading:
 *  -För att optimera laddningstiden kan du överväga att använda lazy loading för komponenterna:
 * @component
 * @returns {JSX.Element} Admin-sidans layout med sidomeny och routade sidor
 */
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar />
      <Routes>
        <Route path="/Addproduct" element={<AddProduct />} />
        <Route path="/Listproduct" element={<ListProduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
