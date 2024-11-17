import "./Sidebar.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import add_product_icon from "../../assets/Product_Cart.svg";
import list_product_icon from "../../assets/Product_list_icon.svg";
/**
 * Sidebar-komponenten representerar navigeringsmenyn i adminpanelen.
 * Den innehåller länkar för att lägga till en ny produkt och för att visa produktlistan.
 *
 * @component
 * @returns {JSX.Element} En sidmeny med två navigeringslänkar
 *
 *
 * FÖRBÄTTRING
 * Konsekvent URL-struktur:
 * -Ändra URL-strukturen för att följa "kebab-case", vilket är standard inom URL-namnkonventioner.
 * Aktiv länkmarkering:
 * -För att förbättra användarupplevelsen kan du markera vilken länk som är aktiv med hjälp av NavLink från react-router-dom istället för Link.
 * Inline styling:
 * -För att hålla styling separat kan du flytta inline-styling (style={{ textDecoration: "none" }}) till CSS-filen.
 * Hantera ikoner dynamiskt:
 * -Om du lägger till fler länkar i framtiden kan det vara bättre att hantera ikoner och text dynamiskt. 

 */

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to={"/Addproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={add_product_icon} alt="add product" />
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={"/listproduct"} style={{ textDecoration: "none" }}>
        <div className="sidebar-item">
          <img src={list_product_icon} alt="list product" />
          <p>Product List</p>
        </div>
      </Link>
    </div>
  );
}

export default Sidebar;
