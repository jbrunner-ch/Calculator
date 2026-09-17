const form = document.querySelector(".calculate");
const output = document.querySelector(".output");
const clearBtn = document.querySelector(".clear"); // WICHTIG: Hier habe ich die Variable in clearBtn umbenannt!

form?.addEventListener("click", (event) => {
  event.preventDefault();

  const number1 = Number(document.querySelector(".number1").value);
  const number2 = Number(document.querySelector(".number2").value);
  const operator = document.querySelector(".operation").value;

  let result = 0;

  if (operator === "+") {
    result = number1 + number2;
  } else if (operator === "-") {
    result = number1 - number2;
  } else if (operator === "*") {
    result = number1 * number2;
  } else {
    result = number1 / number2;
  }
  output.value = result;
  console.log(number1 + operator + number2 + "=" + result);

  const calcText = number1 + " " + operator + " " + number2 + " = " + result;
  let historyArray = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyArray.push(calcText);
  localStorage.setItem("calcHistory", JSON.stringify(historyArray));
});

clearBtn?.addEventListener("click", (event) => {
  event.preventDefault();

  // Prüfen: Sind wir auf der History-Seite?
  if (document.querySelector(".history")) {
    // Ja -> Speicher löschen und Textfeld leeren
    localStorage.removeItem("calcHistory");
    document.querySelector(".history").value = "";
  } else {
    // Nein (Hauptseite) -> Eingabefelder leeren
    document.querySelector(".number1").value = "";
    document.querySelector(".number2").value = "";
    output.value = "";
    document.querySelector(".number1").focus();
  }
});

document.addEventListener("keydown", (event) => {
  // Prüfen, ob die gedrückte Taste "Enter" ist
  if (event.key === "Enter") {
    event.preventDefault(); // Verhindert eventuelles Neuladen der Seite
    form?.click(); // WICHTIG: Fragezeichen hinzugefügt, damit er auf der History-Seite nicht abstürzt
  }
});

// --- History auf der 2. Seite anzeigen ---
const historyOutput = document.querySelector(".history");

if (historyOutput) {
  let historyArray = JSON.parse(localStorage.getItem("calcHistory")) || [];
  historyOutput.value = historyArray.join("\n"); // \n sorgt für den Zeilenumbruch
}
