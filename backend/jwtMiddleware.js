import jwt from "jsonwebtoken";
/**
 * Middleware: verifyToken
 *
 * En middleware-funktion som autentiserar inkommande förfrågningar med hjälp av JWT (JSON Web Token).
 * Syftet är att säkerställa att endast auktoriserade användare har åtkomst till skyddade resurser.
 *
 * Funktion:
 * 1. Hämtar JWT från "Authorization"-headern i förfrågan.
 * 2. Om ingen token hittas returneras ett 401-statussvar med ett meddelande om att åtkomst nekas.
 * 3. Verifierar token med hjälp av en hemlig nyckel (`JWT_SECRET`) från miljövariabler.
 * 4. Om token är giltig, lägger till användaruppgifterna (`verified.user`) i `req.user` och går vidare till nästa middleware.
 * 5. Returnerar ett 400-statussvar om token är ogiltig.
 *
 * Förbättringar:
 * 1. **Hantera frånvarande eller felaktiga headers**:
 *    - Kontrollera om "Authorization"-headern är korrekt formaterad (t.ex. innehåller "Bearer <token>").
 * 2. **Standardiserade felmeddelanden**:
 *    - Returnera mer konsekventa felmeddelanden som följer en gemensam struktur, t.ex. `{ error: true, message: "Access denied" }`.
 * 3. **Konfigurerbara statuskoder**:
 *    - Lägg till möjlighet att justera statuskoder via en konfigurationsfil för att följa specifika API-standarder.
 * 4. **Tydligare loggning**:
 *    - Logga eventuella fel, t.ex. när token är ogiltig, för enklare felsökning i utvecklings- eller produktionsmiljöer.
 * 5. **Säkrare hantering av miljövariabler**:
 *    - Kontrollera om `process.env.JWT_SECRET` är definierad och kasta ett tydligt fel om den saknas.
 * 6. **Testbarhet**:
 *    - Bryt ut token-verifieringen till en separat funktion för att underlätta enhetstestning.
 *
 * Exempel på anrop:
 * - Denna middleware appliceras på skyddade endpoints i servern. Exempel:
 *   app.get("/protected-route", verifyToken, (req, res) => { res.send("Access granted!"); });
 *
 */

export const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res.status(401).json({ message: "Access denied, token missing!" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
