function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    switch (operator) {
        case "+": return add(num1, num2);
        case "-": return subtract(num1, num2);
        case "*": return multiply(num1, num2);
        case "/": return divide(num1, num2);
    }
}

function precision(num) {
    return num.toPrecision(9);
}

function handleOperator(newOperator) {
    if (!operator) {
        num1 = parseFloat(display.textContent);
        operator = newOperator;
    } else if (!refreshDisplay) {
        operator = newOperator;
        return;
    } else {
        num1 = precision(operate(parseFloat(num1), parseFloat(display.textContent), operator));
        display.textContent = parseFloat(num1);
        operator = newOperator;
    }
    refreshDisplay = false;
    operate_isClicked = false;
}

const display = document.querySelector(".display");
const numBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const operateBtn = document.querySelector(".operate");
const clearBtn = document.querySelector(".clear-button");
const deleteBtn = document.querySelector(".delete-button");
const decimalBtn = document.querySelector(".decimal-button");
let num1, num2, operator, lastOperator;
let operate_isClicked = false;
let refreshDisplay = true;

display.textContent = "0";

numBtns.forEach((button) => button.addEventListener('click', () => {
    if (!refreshDisplay || display.textContent === "0") {
        display.textContent = button.textContent;
    } else {
        display.textContent += button.textContent;
    }
    refreshDisplay = true;
}));

operatorBtns.forEach((button) => button.addEventListener('click', () => {
    handleOperator(button.textContent);
}));

operateBtn.addEventListener('click', () => {
    if (!operate_isClicked) {
        num2 = parseFloat(display.textContent);
        display.textContent = parseFloat(precision(operate(parseFloat(num1), num2, operator)));
        lastOperator = operator;
        operator = null;
        operate_isClicked = true;
    } else {
        num1 = parseFloat(display.textContent);
        display.textContent = parseFloat(precision(operate(parseFloat(num1), num2, lastOperator)));
    }
});

clearBtn.addEventListener('click', () => {
    num1 = null;
    num2 = null;
    operator = null;
    lastOperator = null;
    display.textContent = "0";
});

deleteBtn.addEventListener('click', () => {
    if (display.textContent.length !== 1) {
        display.textContent = display.textContent.slice(0, -1);
    } else {
        display.textContent = "0";
    }
    num1 = display.textContent;
})

decimalBtn.addEventListener('click', () => {
    if (!display.textContent.includes(".")) {
        display.textContent += decimalBtn.textContent;
    }
})

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "0": case "1": case "2": case "3":
        case "4": case "5": case "6": case "7":
        case "8": case "9":
            !refreshDisplay || display.textContent === "0" ? display.textContent = event.key : display.textContent += event.key;
            refreshDisplay = true;
            break;
        case "+": case "-": case "*": case "/": 
            handleOperator(event.key);
            break;
        case "Enter":
            operateBtn.click();
            break;
        case "Backspace":
            deleteBtn.click();
            break;
        case "Escape":
            clearBtn.click();
            break;
        case ".":
            decimalBtn.click();
            break;
    }
});
