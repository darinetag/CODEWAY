let display = document.getElementById("inputtext");
let currentInput = "";

function clearDisplay() {
  currentInput = "";
  updateDisplay();
}

function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  updateDisplay();
}

function appendSymbol(symbol) {
  if (currentInput === "" && (symbol === "*" || symbol === "/")) {
    return; // Avoid starting with * or /
  }
  appendCharacter(symbol);
}

function appendNumber(number) {
  appendCharacter(number.toString());
}

function appendDot() {
  if (!currentInput.includes(".")) {
    appendCharacter(".");
  }
}

function appendCharacter(char) {
  currentInput += char;
  updateDisplay();
}

function calculateResult() {
  try {
    currentInput = calculateExpression(currentInput).toString();
    updateDisplay();
  } catch (error) {
    display.value = "Error";
  }
}

function calculateExpression(expression) {
  const operators = ["+", "-", "*", "/"];
  const numbers = expression.split(/[\+\-\*\/]/).map(Number);
  const operations = expression
    .split("")
    .filter((char) => operators.includes(char));

  let result = numbers[0];

  for (let i = 0; i < operations.length; i++) {
    const operator = operations[i];
    const nextNumber = numbers[i + 1];

    switch (operator) {
      case "+":
        result += nextNumber;
        break;
      case "-":
        result -= nextNumber;
        break;
      case "*":
        result *= nextNumber;
        break;
      case "/":
        if (nextNumber !== 0) {
          result /= nextNumber;
        } else {
          throw new Error("Division by zero");
        }
        break;
      default:
        break;
    }
  }

  return result;
}

function updateDisplay() {
  display.value = currentInput || "0";
}
