/* Minimalistisk kalkylator
Funktioner:
Addera tal 
Subtrahera tal 
Multiplikation
Division 
Knapp för att rensa allt (Clear)
*/

let result = 0;
let currentInput = "";
let lastOperator = null;
let resultLine = [];

const resultDisplay = document.getElementById("result");
const inputDisplay = document.getElementById("input");
const historyList = document.querySelector(".history");

const digitButtons = document.querySelectorAll(".digit");
const opButtons = document.querySelectorAll(".op");

// Visa uppdaterat resultat och input
function updateDisplay() {
  resultDisplay.textContent = result;
  inputDisplay.textContent = currentInput || lastOperator || "";
}

// Uppdatera historiken
function updateHistory() {
  let line = `${resultLine.join(" ")} = ${result}`;
  const li = document.createElement("li");
  const code = document.createElement("code");
  code.textContent = line;
  li.appendChild(code);
  historyList.appendChild(li);
}

// Utför själva räkningen
function performOperation(a, b, operator) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return b !== 0 ? a / b : 0;
    default:
      return b;
  }
}

// Klick på siffror
digitButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentInput += btn.textContent.trim();
    updateDisplay();
  });
});

// Klick på operatorer
opButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const op = btn.classList.contains("clear")
      ? "Clear"
      : btn.textContent.trim();

    // Återställ kalkylatorn
    if (op === "Clear") {
      result = 0;
      currentInput = "";
      lastOperator = null;
      resultLine = [];
      historyList.innerHTML = "";
      updateDisplay();
      return;
    }

    // Förhindra att två operatorer trycks i rad
    if (currentInput === "" && lastOperator !== null) return;

    const num = parseFloat(currentInput);

    if (!isNaN(num)) {
      if (lastOperator === null) {
        result = num;
      } else {
        result = performOperation(result, num, lastOperator);
      }
      resultLine.push(currentInput);
    }

    if (["+", "-", "*", "/"].includes(op)) {
      lastOperator = op;
      resultLine.push(op);
    }

    updateHistory();
    currentInput = "";
    updateDisplay();
  });
});
