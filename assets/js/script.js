// ziffern + komma -> Zahl
// C -> alles zurücksetzen
// operator -> merken was aktuelle zahl ist
//   -> neue zahl kann getippt werden
// --> "ist gleich" --> zum errechnen des resultats

let result = "0"
let interimResult = "" // zwischenergebnis
let currentOperator = ""
let savedResultToInterim = false

function calculateNewResult () {
    const resultNr = parseFloat(result)
    const interimResultNr = parseFloat(interimResult)
    switch(currentOperator) {
        case "+":
            return interimResultNr + resultNr;
        case "–":
            return interimResultNr - resultNr;
        case "×":
            return interimResultNr * resultNr;
        case "÷":
            return interimResultNr / resultNr;
        default:
            return resultNr;
    }
}

function updateResultView() {
    document.getElementById("result").innerText = result
    console.log("state:", { result, interimResult, currentOperator })
}

//=== set up
// number buttons konfigurieren
const numbers = document.getElementsByClassName("number")
for(let numberButton of numbers) {
    numberButton.addEventListener("click", () => {
        const numberString = numberButton.textContent

        if(result === "0" || savedResultToInterim) {
            // einfach die zahl übernehmen
            result = numberString
            savedResultToInterim = false
        } else {
            // die zahl anhängen
            result += numberString
        }

        updateResultView()
    })
}

// comma button konfigurieren
document.getElementById("comma").addEventListener("click", () => {
    const resultHatBereitsEinComma = result.includes(".")
    if(!resultHatBereitsEinComma) {
        result += "."
        updateResultView()
    }
})

// clear button konfigurieren
document.getElementById("clear").addEventListener("click", () => {
    result = "0"
    interimResult = ""
    currentOperator = ""
    updateResultView()
})

// configure operators
const operators = document.getElementsByClassName("operator")
for(let operator of operators) {
    operator.addEventListener("click", () => {
        savedResultToInterim = true
        if(operator.textContent === "=") {
            result = calculateNewResult() + ""
            // reset interim result and operator...
            interimResult = ""
            currentOperator = ""
        } else {
            if(interimResult) {
                // zwischenergbenis exisitiert bereits,
                // es wurde aber ein operator geklickt...
                // -> zwischenergebnis muss calculiert werden...
                result = calculateNewResult()
            }

            interimResult = result // zwischenspeichern
            currentOperator = operator.textContent
        }

        console.log("state:", { result, interimResult, currentOperator })
        updateResultView()
    })
}

// end set up