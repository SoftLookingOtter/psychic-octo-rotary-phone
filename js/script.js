/* Minimalistisk kalkylator
Funktioner:
Addera tal 
Subtrahera tal 
Multiplikation
Division 
Knapp för att rensa allt (Clear)
*/

let result = 0; // Håller det aktuella resultatet
let currentInput = ""; // Håller det aktuella inmatade värdet
let lastOperator = null; // Håller den senaste operatorn som använts
let resultLine = []; // Håller historiken över inmatningar och operationer

const resultDisplay = document.getElementById("result"); // Hämtar elementet för att visa resultatet från HTML
const inputDisplay = document.getElementById("input"); // Hämtar elementet för att visa aktuell inmatning från HTML
const historyList = document.querySelector(".history"); // Hämtar elementet för historiken från HTML

const digitButtons = document.querySelectorAll(".digit"); // Hämtar alla knappar för siffror
const opButtons = document.querySelectorAll(".op"); // Hämtar alla knappar för operatorer

// Visa uppdaterat resultat och input
function updateDisplay() {
  resultDisplay.textContent = result; // Uppdaterar resultatdisplayen
  inputDisplay.textContent = currentInput || lastOperator || ""; // Uppdaterar inputdisplayen, visar senaste siffra eller operator / "" tom sträng som default, så att inget oönskat visas om ingenting skrivits in ännu.
}

// Uppdatera historiken
function updateHistory() {
  let line = `${resultLine.join(" ")} = ${result}`; // Skapar en sträng av resultatlinjen
  const li = document.createElement("li"); // Skapar ett nytt list-element för historiken
  const code = document.createElement("code"); // Skapar ett code-element för att visa resultatet i monospace-typsnitt
  code.textContent = line; // Sätter textinnehållet i code-elementet till resultatlinjen
  li.appendChild(code);
  historyList.insertBefore(li, historyList.firstChild);
}

// Utför själva räkningen
function performOperation(a, b, operator) {
  // Tar emot två tal och en operator, och returnerar resultatet av operationen
  switch (
    operator // Använder switch för att avgöra vilken operation som ska utföras
  ) {
    case "+": // Om operatorn är plus
      return a + b; // Returnerar summan av a och b
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : 0; // Om b är noll, returnera 0 för att undvika division med noll
    default:
      return b;
  }
}

// Klick på siffror
digitButtons.forEach((btn) => {
  // Loopar igenom alla sifferknappar
  btn.addEventListener("click", () => {
    // Lägger till en event listener för varje knapp
    currentInput += btn.textContent.trim(); // Lägger till den tryckta siffran till currentInput / trim() tar bort eventuella extra mellanslag
    updateDisplay(); // Uppdaterar displayen med den nya inmatningen
  });
});

// Klick på operatorer
opButtons.forEach((btn) => {
  // Loopar igenom alla operator-knappar
  btn.addEventListener("click", () => {
    // Lägger till en event listener för varje knapp
    const op = btn.classList.contains("clear") // Kollar om knappen har klassen "clear"
      ? "Clear" // Om ja, sätt operatorn till "Clear"
      : btn.textContent.trim(); // Annars, sätt operatorn till knappens textinnehåll

    // Återställ kalkylatorn
    if (op === "Clear") {
      // Om operatorn är "Clear"
      result = 0; // Nollställ resultatet
      currentInput = ""; // Nollställ aktuell inmatning
      lastOperator = null; // Nollställ senaste operator
      resultLine = []; // Nollställ resultatlinjen
      //historyList.innerHTML = ""; // Töm historiken
      updateDisplay(); // Uppdatera displayen
      return; // Avsluta funktionen
    }

    // Förhindra att två operatorer trycks i rad
    if (currentInput === "" && lastOperator !== null) return; // Om ingen aktuell inmatning finns och en operator redan är vald, gör ingenting

    const num = parseFloat(currentInput); // Konvertera aktuell inmatning till ett flyttal, dvs. ett decimaltal

    if (!isNaN(num)) {
      // Om numret är ett giltigt tal ( not not a Number)
      if (lastOperator === null) {
        // Om ingen tidigare operator finns
        result = num; // Sätt resultatet till det aktuella numret
      } else {
        result = performOperation(result, num, lastOperator); // Annars, utför operationen med det aktuella resultatet, numret och den senaste operatorn
      }
      resultLine.push(currentInput); // Lägg till aktuell inmatning i resultatlinjen
    }

    if (["+", "-", "*", "/"].includes(op)) {
      // Om operatorn är en giltig operator
      lastOperator = op; // Sätt den senaste operatorn till den aktuella operatorn
      resultLine.push(op); // Lägg till operatorn i resultatlinjen
    }

    updateHistory(); // Uppdatera historiken med den senaste operationen
    currentInput = ""; // Nollställ aktuell inmatning
    updateDisplay(); // Uppdatera displayen med det nya resultatet
  });
});
