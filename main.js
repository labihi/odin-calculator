//#region GET COMPONENTS

//SCREEN COMPONENTS
const firstScreenRow = document.getElementById("screen-first-row");
const secondScreenRow = document.getElementById("screen-second-row");

//ON/OFF/DEL COMPONENTS
const onButton = document.getElementById("on-button");
const offButton = document.getElementById("off-button");
const delButton = document.getElementById("del-button");

//NUMBER COMPONENTS
const zeroButton = document.getElementById("zero-button");
const oneButton = document.getElementById("one-button");
const twoButton = document.getElementById("two-button");
const threeButton = document.getElementById("three-button");
const fourButton = document.getElementById("four-button");
const fiveButton = document.getElementById("five-button");
const sixButton = document.getElementById("six-button");
const sevenButton = document.getElementById("seven-button");
const eightButton = document.getElementById("eight-button");
const nineButton = document.getElementById("nine-button");

//OPERATION COMPONENTS

const plusButton = document.getElementById("plus-button");
const minusButton = document.getElementById("minus-button");
const multiplyButton = document.getElementById("multiply-button");
const divideButton = document.getElementById("divide-button");
const percentageButton = document.getElementById("perc-button");

const dotButton = document.getElementById("dot-button");

const signButton = document.getElementById("sign-button");

const equalButton = document.getElementById("equal-button");

//#endregion

//#region GLOBAL VARIABLES
let currentResult = 0;
let currentOperation = 0;
let lastResult = 0;
let firstNumber = 0;
let secondNumber = 0;
let shouldResetScreen = false;

let onOff = false;

//#endregion
onButton.addEventListener("click", start);

function start() {
    clear();

    if (onOff) return;

    console.log("CALCULATOR ON");

    delButton.addEventListener("click", deleteLastDigit);

    //ADDING EVENT LISTENERS TO NUMBERS
    zeroButton.addEventListener("click", addDigit);
    oneButton.addEventListener("click", addDigit);
    twoButton.addEventListener("click", addDigit);
    threeButton.addEventListener("click", addDigit);
    fourButton.addEventListener("click", addDigit);
    fiveButton.addEventListener("click", addDigit);
    sixButton.addEventListener("click", addDigit);
    sevenButton.addEventListener("click", addDigit);
    eightButton.addEventListener("click", addDigit);
    nineButton.addEventListener("click", addDigit);

    //ADDING EVENT LISTENERS TO OPERATIONS
    plusButton.addEventListener("click", setOperation);
    minusButton.addEventListener("click", setOperation);
    multiplyButton.addEventListener("click", setOperation);
    divideButton.addEventListener("click", setOperation);
    percentageButton.addEventListener("click", setOperation);

    dotButton.addEventListener("click", addDot);

    signButton.addEventListener("click", switchSign);

    equalButton.addEventListener("click", equalButtonClick);
}

function clear() {
    secondScreenRow.innerText = "0";
    firstScreenRow.innerText = "";
    firstNumber = "";
    secondNumber = "";
    currentOperation = null;
}

function deleteLastDigit() {
    secondScreenRow.innerText = secondScreenRow.innerText.slice(0, -1);
    if (secondScreenRow.innerText == "") {
        secondScreenRow.innerText = "0";
    }
}

function addDigit() {
    if (secondScreenRow.innerText.length < 12) {
        console.log(this.id);
        if (secondScreenRow.innerText == 0) {
            secondScreenRow.innerText = this.getAttribute("data-value");
        } else {
            secondScreenRow.innerText += this.getAttribute("data-value");
        }
    }
}

function addDot() {
    if (!secondScreenRow.innerText.includes(".")) {
        secondScreenRow.innerText += ".";
    }
}

function switchSign(){
    if(secondScreenRow.innerText[0] == "-"){
        secondScreenRow.innerText = secondScreenRow.innerText.slice(1);
    }else if(secondScreenRow.innerText != "0"){
        secondScreenRow.innerText = "-" + secondScreenRow.innerText;
    }
}

function setOperation() {
    //first operation check
    if (firstScreenRow.innerText != "") {
        firstScreenRow.innerText = evaluate();
    } else {
        firstScreenRow.innerText = secondScreenRow.innerText;
    }

    currentOperation = this.id;
    console.log(firstNumber);

    secondScreenRow.innerText = "0";
}

function equalButtonClick() {
    let result = evaluate();
    clear();
    secondScreenRow.innerText = result;
}

function evaluate() {
    let first = Number(firstScreenRow.innerText);
    let second = Number(secondScreenRow.innerText);

    let output = 0;

    switch (currentOperation) {
        case "plus-button":
            output = first + second;
            break;

        case "minus-button":
            output = first - second;
            break;

        case "multiply-button":
            output = first * second;
            break;
        case "divide-button":
            output = first / second;
            break;
        case "perc-button":
            output = "ERR!";
            break;
    }
    output = ""+ output;
    let integerPart = output.slice(0,output.indexOf("."));
    let maxLength = output.includes(".") ? 13 : 12;
    if(integerPart.length > maxLength){
        clear();
        output = NaN;
    }else if(output.length > maxLength){
        output = output.slice(0, 12);
    }
    return parseFloat(output);
}
