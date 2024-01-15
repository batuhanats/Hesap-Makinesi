// Elementleri seçmek

const calculatorEl = document.querySelector("#calculator");
const resultEl = document.querySelector(".result");
const clearAllEl = document.querySelector("#clearAll");
const deleteACharEll = document.querySelector("#deleteAChar");


let firstNumber = '';
let selectedOperator = '';
let afterNumber = '';
let isWaitingANewValue = false;



runEventListeners();

function runEventListeners() {
    calculatorEl.addEventListener("click", write);
    clearAllEl.addEventListener("click", clearAll);
    deleteACharEll.addEventListener("click", deleteAChar);


};

function deleteAChar() {
    if (isWaitingANewValue) {
        afterNumber = Calculator.deleteLastCharacter(afterNumber);
    } else {
        firstNumber = Calculator.deleteLastCharacter(firstNumber);
    }
    resultEl.innerHTML = Calculator.deleteLastCharacter(resultEl.innerHTML);

}

function clearAll() {
    firstNumber = '';
    selectedOperator = '';
    afterNumber = '';
    isWaitingANewValue = false;
    clearResultPanel();


}

function write(e) {
    const element = e.target;

    if (element.classList.contains("number")) {
        if (isWaitingANewValue) {
            afterNumber += element.value;
        } else {
            firstNumber += element.value;
        }

        updateResultPanel(element.value);
    }
    else if (element.classList.contains("operator")) {
        if (!Calculator.isHaveOperator(resultEl.innerHTML)) {
            selectedOperator = element.value;
            isWaitingANewValue = true;

            updateResultPanel(element.value);
        }


    }
    else if (element.classList.contains("equals")) {
        let result = calculate(firstNumber, selectedOperator, afterNumber).toString();
        firstNumber = result;
        isWaitingANewValue = false;
        clearOperatorAndAfterNumber();
        clearResultPanel();
        updateResultPanel(result);
    }
};



function calculate(firstNumber, operator, secondNumber) {
    let result;
    let dotResult = Calculator.isDotHave(firstNumber) || Calculator.isDotHave(secondNumber);
    dotResult = true;

    switch (operator) {
        case "+":
            result = dotResult ? parseFloat(firstNumber) + parseFloat(secondNumber) : parseInt(firstNumber) + parseInt(secondNumber);
            break;
        case "-":
            result = dotResult ? parseFloat(firstNumber) - parseFloat(secondNumber) : parseInt(firstNumber) - parseInt(secondNumber);
            break;
        case "*":
            result = dotResult ? parseFloat(firstNumber) * parseFloat(secondNumber) : parseInt(firstNumber) * parseInt(secondNumber);
            break;
        case "/":
            result = dotResult ? parseFloat(firstNumber) / parseFloat(secondNumber) : parseInt(firstNumber) / parseInt(secondNumber);
            break;
    }
    return result;

}

function updateResultPanel(value) {
    if (value.length >= 6) {
        value = parseFloat(value).toFixed(2);
    }
    resultEl.innerHTML += value;
}

function clearResultPanel() {
    resultEl.innerHTML = "";
}

function clearOperatorAndAfterNumber() {
    selectedOperator = "";
    afterNumber = "";


}