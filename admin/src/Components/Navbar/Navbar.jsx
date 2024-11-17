import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";
/**
 * Navbar-komponenten representerar den övre navigeringsbaren i applikationen.
 * Den innehåller en logotyp och en profilbild.
 *
 * @component
 * @returns {JSX.Element} Navigeringsbar med logotyp och profilbild
 *
 * FÖRBÄTTRING
 * -Lägg till mer beskrivande alt-texter för bilderna för att förbättra tillgängligheten.
 * Responsiv design:
 * -Se till att Navbar fungerar bra på olika skärmstorlekar genom att lägga till CSS för responsiv design i Navbar.CSS.
 * -För semantisk HTML kan du överväga att använda en <header>-tagg istället för en <div>. Detta kan förbättra sidans SEO och tillgänglighet.
 */
const Navbar = () => {
  return (
    <div className="navbar">
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navProfile} alt="nav-profile" className="nav-profile" />
    </div>
  );
};

export default Navbar;
