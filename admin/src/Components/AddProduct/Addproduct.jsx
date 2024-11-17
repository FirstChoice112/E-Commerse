/**
 * Addproduct Component
 *
 * En React-komponent för att lägga till en ny produkt genom att skicka produktinformation och en bild
 * till backend. Komponentens syfte är att ge användaren möjlighet att fylla i produktens namn, kategori,
 * pris, erbjudandepris och ladda upp en bild. Produktinformationen skickas till backend för vidare bearbetning
 * och lagring i databasen.
 *
 * State:
 * - image: Lagrar den uppladdade bilden som en fil.
 * - productDetails: Objekt som innehåller produktens namn, bild-URL, kategori, nypris och gammalpris.
 *
 * Funktioner:
 * - imageHandler: Hanterar bilduppladdning och lagrar den uppladdade filen i state.
 * - changeHandler: Uppdaterar `productDetails` state när användaren skriver i inputfält eller ändrar kategori.
 * - Add_product: Asynkron funktion som hanterar API-anrop för att först ladda upp bilden och sedan skicka
 *   produktinformationen till backend. Om bilduppladdningen lyckas, läggs produktens URL till i `productDetails`
 *   och skickas sedan vidare för att skapa produkten i backend.
 *
 * Returnerar:
 * - Ett formulär där användaren kan ange produktinformation (namn, pris, kategori, erbjudandepris) och ladda upp en bild.
 * - En knapp för att skicka formuläret som kallar på funktionen `Add_product`.
 *
 * FÖRBÄTTRING:
 * 1. **Felsökning och användarfeedback**:
 *    - Lägg till bättre felhantering för att visa felmeddelanden om API-anropen misslyckas eller om fält saknas.
 * 2. **Formulärvalidering**:
 *    - Inför enkel validering, t.ex. att inga fält är tomma, innan `Add_product` anropas.
 * 3. **Återställ formuläret efter skickning**:
 *    - Återställ alla state-variabler (`productDetails` och `image`) efter att produkten har lagts till.
 * 4. **Bättre tillståndshantering**:
 *    - Använd React Hook Form eller liknande bibliotek för hantering och validering av formulärfält.
 * 5. **Förbättrad UI/UX**:
 *    - Lägg till laddningsindikator på knappen under API-anropet för bättre användarupplevelse.
 * 6. **Optimering av bilduppladdning**:
 *    - Gör bilduppladdningen valfri eller tillåt förhandsvisning innan bild skickas till backend.
 */

import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";

const Addproduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const Add_product = async () => {
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formdata = new FormData();
    formdata.append("product", image);

    await fetch("http://localhost:4000/Addproduct", {
      method: "POST",
      body: formdata,
    })
      .then((res) => res.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch("http://localhost:4000/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),

        //* arrow function
      })
        .then((res) => res.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  return (
    <div className="add-product">
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="add-product-selector"
          value={productDetails.category}
          onChange={changeHandler}
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            className="addproduct-thumbnail-img"
            alt="upload image"
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          id="file-input"
          name="image"
          hidden
        />
      </div>

      <button
        onClick={() => {
          Add_product();
        }}
        className="addproduct-btn"
      >
        ADD
      </button>
    </div>
  );
};

export default Addproduct;
