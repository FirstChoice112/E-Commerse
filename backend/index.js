import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import multer from "multer";
import { verifyToken } from "./jwtMiddleware.js";

/*
 *För bättre organisation kan du dela upp din kod i separata filer, till exempel:
 *
 * -app.js: Innehåller grundläggande Express-setup.
 * -routes/: Innehåller API-rutter, t.ex. productRoutes.js.
 * -models/: Innehåller Mongoose-modeller, t.ex. Product.js.
 * 
 * Generella förbättringar för produktendpoints
Centralisera felhantering: Implementera en standardiserad felhanteringsmekanism för alla endpoints.
Validering: Använd bibliotek som Joi eller express-validator för att validera inkommande data.
Effektiv databasinteraktion: Använd MongoDB
inneboende funktioner för att optimera frågor och uppdateringar.
Säkerhet: Använd rate-limiting och säker autentisering för att skydda endpoints från överbelastningsattacker.
Loggning: Använd ett loggningsbibliotek som winston eller pino istället för att logga till konsolen direkt.
Validering av indata:

Se till att alla indata är korrekt formaterade och uppfyller de krav som behövs för vidare bearbetning.
Felhantering:

Lägg till specifika felmeddelanden för att göra det enklare att identifiera vad som gått fel under exekveringen. T.ex. fel vid hämtning av data, ogiltig indata etc.
Loggning:

Implementera loggning för att kunna följa flödet i applikationen, särskilt för fel och viktiga händelser. Det kan hjälpa till vid felsökning och driftövervakning.
Prestandaoptimering genom caching:

Om samma data begärs ofta, överväg att cachelagra resultat för att minska antalet anrop till databasen och förbättra svarstider.
Asynkron hantering:

Optimera hantering av parallella asynkrona operationer genom att vänta på alla nödvändiga operationer samtidigt där det är möjligt.
Kodstruktur och återanvändbarhet:

Bryt upp lång och komplex kod i mindre, mer hanterbara och återanvändbara funktioner för att förbättra läsbarheten och underhållbarheten.
API-dokumentation:

Kommentera funktioner och API-endpoints för att tydligt förklara deras syfte, ingående parametrar och svar.
Säkerhetsåtgärder:

Implementera säkerhetsåtgärder som att sanera indata för att förhindra attacker såsom SQL-injektion och XSS.
DynamoDB-frågor:

Använd dynamiska frågeuttryck och parametervärden för att skapa säkrare och tydligare frågeställningar till DynamoDB.
Testning:

Implementera enhetstester för att säkerställa att varje funktion fungerar som förväntat och att inga regressionsfel introduceras i koden.
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, "../.env") });
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

const port = 4000;
const app = express();
app.use(express.json());
app.use(cors());

//Lägg till felhantering vid anslutningen. Kanske i middleware?

mongoose.connect(MONGO_URI, {});

//API Creation
app.get("/", (req, res) => {
  res.send("Express Server is up and running");
});

//Image Storage Engine
//Lägg till felhantering av multern! i mniddlewaren?
const storage = multer.diskStorage({
  destination: "/upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
const upload = multer({ storage: storage });

//Creating  Upload Endpoint for images
//Lägg till felhantering av multern! i mniddlewaren?
app.use("/images", express.static("upload/images"));
app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

/////////////////////////////////////////////////////////////////////////////////////////////

//Schema for creating Products
//Din Product-modell kan förbättras med mer detaljerad validering:
//id: {
// type: Number,
//required: [true, "Ett produkt-ID krävs."],
//},
// enum: ["electronics", "clothing", "home", "other"], // Exempel på tillåtna kategorier ??
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

/////////////////////////////////////////////////////////////////////////////////////////////

/*
Vad endpointen gör
Tar emot en begäran via POST med produktdata (name, image, category, new_price, old_price).
Hämtar alla befintliga produkter från databasen för att avgöra vilket ID den nya produkten ska få.
Om databasen redan innehåller produkter, skapas ett nytt ID baserat på den senaste produktens ID. Om databasen är tom, tilldelas ID värdet 1.
Skapar ett nytt produktobjekt med den inkommande datan och sparar det i databasen.
Returnerar en lyckad JSON-respons med produktens namn.
Förbättringsåtgärder
Validering av inkommande data: Kontrollera att alla fält (name, image, category, new_price, old_price) finns och är giltiga innan produkten skapas.
Felhantering: Lägg till try-catch-block för att hantera oväntade fel och returnera användarvänliga felmeddelanden.
Effektivitet: Använd Product.findOne().sort({ id: -1 }) för att hämta den senaste produkten direkt istället för att ladda alla produkter och ta den sista manuellt.
Responsstandardisering: Lägg till ett standardiserat felmeddelande när en begäran misslyckas, t.ex. om datan är ogiltig eller om något går fel vid databasinteraktionen.
*/
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");
  res.json({ success: true, name: req.body.name });
});

/////////////////////////////////////////////////////////////////////////////////////////////

/*
Vad endpointen gör
Tar emot en begäran via POST med ett produkt-ID (id) som ska raderas.
Söker i databasen efter en produkt med det angivna ID
.
Om produkten hittas, tas den bort från databasen.
Returnerar en lyckad JSON-respons om raderingen lyckades.

. Förbättringsåtgärder
Validering av ID: Kontrollera att id skickas i begäran och att det är ett giltigt nummer innan en databasoperation görs.
Felhantering: Lägg till ett try-catch-block för att hantera oväntade fel och returnera användarvänliga felmeddelanden.
Kontrollera om produkten existerar: Om produkten inte hittas, returnera ett felmeddelande snarare än att anta att raderingen alltid lyckas.
Responsstandardisering: Använd en standardiserad struktur för både lyckade och misslyckade operationer, t.ex. { success: true/false, message: "..." }.
*/

//Creating API for deleting product
app.post("/deleteproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product Deleted");
  res.json({ success: true, name: req.body.name });
});

/////////////////////////////////////////////////////////////////////////////////////////////

/*
. Vad endpointen gör
Tar emot en POST-begäran med användarens registreringsinformation (username, email, password).
Kontrollerar om en användare med samma e-postadress redan existerar i databasen.
Om användaren redan finns, returneras en statuskod 400 och ett felmeddelande.
Hashar det inkommande lösenordet med bcrypt för säker lagring.
Skapar en tom kundvagn (cart) med 300 nycklar där alla är initierade till 0.
Skapar ett nytt användarobjekt med inkommande data och sparar det i databasen.
Skapar en JWT-token som innehåller användarens ID och skickar tillbaka token i en lyckad respons.
2. Förbättringsåtgärder
Validering av inkommande data: Säkerställ att username, email, och password är inkluderade och giltiga i begäran innan bearbetning.
Felhantering: Lägg till ett try-catch-block för att hantera oväntade fel under databasinteraktioner eller hashingprocessen.
Effektivitet i kundvagnsskapande: Använd Array eller en annan metod för att generera standardiserade värden för kundvagnen istället för en for-loop.
Standardisera respons: Returnera ett konsekvent JSON-format för både lyckade och misslyckade operationer, t.ex. { success: true/false, message: "..." }.
Token-expiration: Lägg till en utgångstid för JWT-token för ökad säkerhet.
Lösenordslängd: Kontrollera att lösenordet uppfyller en viss minsta längd och eventuellt innehåller komplexitet.
*/
//Schema creating for User model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: { type: Object },
  date: { type: Date, default: Date.now },
});

//Creating Endpoint for registering the user
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user found with the same email adress",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    cartData: cart,
  });

  await user.save();

  const data = { user: { id: user.id } };

  const token = jwt.sign(data, JWT_SECRET);
  res.json({ success: true, token });
});

/////////////////////////////////////////////////////////////////////////////////////////////

/*
Vad endpointen gör
Tar emot en POST-begäran med användarens inloggningsinformation (email, password).vc
  
Hämtar användaren från databasen baserat på den angivna e-postadressen.
Om användaren finns:
Jämför det angivna lösenordet med det lagrade hashade lösenordet med hjälp av bcrypt.compare.
Om lösenorden matchar:
Genererar en JWT-token som innehåller användarens ID.
Returnerar en lyckad respons med token.
Om lösenorden inte matchar:
Returnerar en respons med ett felmeddelande om fel lösenord.
Om användaren inte hittas i databasen:
Returnerar en respons med ett felmeddelande om att användaren inte finns.
2. Förbättringsåtgärder
Validering av inkommande data: Kontrollera att både email och password finns i begäran innan några operationer utförs.
Felhantering: Lägg till ett try-catch-block för att hantera oväntade fel, såsom databasproblem eller kryptografiska fel.
Token-expiration: Inkludera en utgångstid för JWT-token för att öka säkerheten, t.ex. genom expiresIn-alternativet.
Standardisera respons: Returnera ett konsekvent JSON-format oavsett om operationen lyckas eller misslyckas, t.ex. { success: true/false, message: "..." }.
Krypteringslogik: Hantera eventuella problem med att bcrypt.compare returnerar oväntade värden.
Känslig data i felmeddelanden: Undvik att exponera känsliga detaljer, som "Fel lösenord", då detta kan ge angripare ledtrådar. Använd istället ett generiskt meddelande, t.ex. "Ogiltiga inloggningsuppgifter".
Effektiv sökning: Optimera databasens indexering av email-fältet för snabbare sökning.
*/
//Creating endpoint for user-login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = await bcrypt.compare(req.body.password, user.password);
    if (passCompare) {
      const data = { user: { id: user.id } };
      const token = jwt.sign(data, JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password 🥲" });
    }
  } else {
    res.json({ success: false, errors: "User not found" });
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////

/*
/allproducts Endpoint
1. Vad endpointen gör
Hämtar alla produkter från databasen.
Kräver en giltig JWT-token för autentisering (använder middleware verifyToken).
Returnerar en lista över alla produkter till klienten.
2. Förbättringsåtgärder
Lägg till felhantering för att hantera databasfel eller problem med tokenvalidering.
Begränsa antalet produkter som returneras vid stora dataset, eller implementera paginering.
Undvik att logga varje förfrågan i konsolen om inte felsökning krävs.
*/

//Creating API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All products fetched");
  res.send(products);
});

/*
 Vad endpointen gör
Hämtar alla produkter från databasen.
Returnerar de senaste 8 produkterna (exkluderar den första produkten i listan).
2. Förbättringsåtgärder
Optimera databasfrågan för att returnera endast de 8 senaste produkterna (t.ex. genom sortering och begränsning i frågan).
Lägg till felhantering för att hantera eventuella databasfel.
*/

//Creating endpoint for newcollection data

app.get(`/newcollections`, async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("New collection fetched");
  res.send(newcollection);
});

/*
1. Vad endpointen gör
Hämtar produkter som tillhör kategorin "women".
Returnerar de första 4 produkterna från resultatet.
2. Förbättringsåtgärder
Använd sortering eller taggar för att bättre definiera "populära" produkter istället för att returnera de första fyra.
Optimera databasfrågan för att inkludera endast relevanta datafält om så behövs.
*/
//Creating endpoint for popular in women section
app.get(`/popularinwoman`, async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
});

/*
Vad middleware gör
Hämtar JWT-token från begäransrubriken auth-token.
Verifierar tokenens giltighet och hämtar användarens ID.
Lägger till användarens information (req.user) för efterföljande endpoints.
2. Förbättringsåtgärder
Gör felmeddelandena mer informativa och användarvänliga.
Lägg till kontroll för tom eller ogiltig token utan att kasta generiska fel.
Logga inte känsliga detaljer i serverkonsolen.

*/

//Creating middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      console.error(error);
      res
        .status(401)
        .send({ error: "Please authenticate using a valid token" });
    }
  }
};

/*
 Vad endpointen gör
Lägger till en produkt i användarens kundvagn.
Uppdaterar användarens cartData-fält i databasen.
2. Förbättringsåtgärder
Kontrollera att itemId är giltigt och existerar innan det läggs till.
Optimera databasanrop genom att direkt uppdatera den specifika produkten utan att hämta hela kundvagnen.
Hantera situationer där produkten redan har maxantal i kundvagnen.
*/
//Creating endpoint for adding products in cartdata
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});

/*
1. Vad endpointen gör
Minskar antalet av en specifik produkt i användarens kundvagn.
Uppdaterar användarens cartData-fält i databasen.
2. Förbättringsåtgärder
Förhindra att produktantalet går under noll i databasen.
Lägg till validering för att säkerställa att itemId är korrekt.
Kombinera logik för att effektivt hantera fall där produkten redan saknas i kundvagnen.
*/

//Creating endpoint for removing products in cartdata
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] < 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );

  res.send("Removed");
});

/*
 Vad endpointen gör
Hämtar och returnerar användarens kundvagnsinformation (cartData) från databasen.
2. Förbättringsåtgärder
Lägg till felhantering för att hantera fall där användaren inte har någon kundvagn.
Begränsa data som returneras för att undvika exponerande av onödiga eller känsliga detaljer.
Implementera cachehantering för att förbättra prestandan vid frekventa anrop.
*/
//Creating endpoint to get cartdata
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("getcart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log(
      "Server is Successfully Running, and App is listening on port ",
      port
    );
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
