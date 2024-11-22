import React from "react";
import "./LoginSignup.css";
import { useState } from "react";

/**
 * Denna komponent hanterar inloggning och registrering av användare för applikationen.
 * Den låter användare välja mellan att logga in eller registrera ett nytt konto.
 *
 * Funktionalitet:
 * - useState används för att hantera:
 *   - state: Håller reda på om användaren är i "Login"- eller "Sign Up"-läge.
 *   - formData: Objekt som innehåller användarens input för användarnamn, e-postadress och lösenord.
 * - Metoder för inloggning och registrering:
 *   - login: Skickar en POST-förfrågan till servern för att logga in användaren och spara en autentiseringstoken i localStorage om inloggningen lyckas.
 *   - signup: Skickar en POST-förfrågan till servern för att skapa ett nytt konto och spara en autentiseringstoken i localStorage om registreringen lyckas.
 * - En funktion för att hantera förändringar i formulärfälten (`changeHandler`).
 * - Dynamisk rendering av inloggnings- och registreringsformulär beroende på `state`.
 *
 * Importerar:
 * - useState: Används för att hantera lokalt tillstånd för formulärdata och visningsläge.
 * - fetch: Används för att skicka API-anrop för inloggning och registrering.
 *
 * Returnerar:
 * - Ett formulär där användaren kan logga in eller registrera sig beroende på vilket läge som är aktivt.
 * - En knapp som antingen kör `login` eller `signup` beroende på läget.
 * - Länkar för att växla mellan inloggning och registrering.
 *
 * FÖRBÄTTRING:
 * 1. **Felhantering vid API-anrop**:
 *    - Lägg till felhantering för alla fetch-anrop för att hantera potentiella nätverksfel eller serverfel, t.ex. genom att använda try-catch eller kolla om `response.ok` är true innan vidare bearbetning.
 * 2. **Förbättrad användartillförlitlighet**:
 *    - Lägg till fältvalidering på användarnamn, e-postadress och lösenord innan API-anropet görs, för att ge en bättre användarupplevelse och säkerställa att data är korrekt.
 * 3. **Förbättrad säkerhet**:
 *    - Förbättra säkerheten genom att lagra och använda auth-token på ett säkrare sätt, t.ex. i HttpOnly-cookies istället för localStorage, för att minska risken för XSS-attacker.
 * 4. **Användarfeedback**:
 *    - Lägg till användarfeedback, såsom en laddningsindikator eller meddelande, när API-anrop görs för att förbättra användarupplevelsen.
 * 5. **Prestandaoptimering**:
 *    - Förbättra prestanda genom att minimera onödiga omrenderingar genom att optimera användningen av useState och useEffect.
 */

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log("Login function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/signup", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };
  const signup = async () => {
    console.log("Signup function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? (
            <input
              name="username"
              value={formData.username}
              type="text"
              placeholder="Your Name"
              onChange={changeHandler}
            />
          ) : (
            <></>
          )}

          <input
            name="email"
            value={formData.email}
            onChange={changeHandler}
            type="email"
            placeholder="Email Adress"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}
        >
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginsignup-login">
            Already have an account?{" "}
            <span onClick={() => setState("Login")}>Login here</span>
          </p>
        ) : (
          <p className="loginsignup-login">
            Create an account?{" "}
            <span onClick={() => setState("Sign Up")}>Click here</span>
          </p>
        )}

        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continueing, i agree to terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
