const display = document.getElementById("display");
const numButton = document.querySelectorAll(".num-btn");
const operButton = document.querySelectorAll(".oper-btn");
const clearButton = document.getElementById("clear-btn");
const equalButton = document.getElementById("equal-btn");
const historyTable = document.getElementById("history-table");
const operators = ["+", "-", "*", "/"];
let currentExpression = "";

numButton.forEach(button => {
    button.addEventListener("click", () => {
        currentExpression += button.textContent;
        display.value = currentExpression;
    });
});

operButton.forEach(button => {
    button.addEventListener("click", () => {
        const lastChar = currentExpression[currentExpression.length - 1];
        if (currentExpression !== "" && operators.includes(lastChar)) {
            currentExpression = currentExpression.slice(0, -1) + button.textContent;
        } else {
            currentExpression += button.textContent;
        }
        
        display.value = currentExpression;
    });
});

clearButton.addEventListener("click", () => {
    currentExpression = "";
    display.value = "";
});

equalButton.addEventListener("click", () => {
    if (currentExpression) {
        const result = eval(currentExpression);
        display.value = result;

        const now = new Date();
        const formattedDate = now.toLocaleString();

        const newRow = historyTable.insertRow(1);
        const dateCell = newRow.insertCell(0);
        const operationCell = newRow.insertCell(1);
        const resultCell = newRow.insertCell(2);

        dateCell.textContent = formattedDate;
        operationCell.textContent = currentExpression;
        resultCell.textContent = result;

        currentExpression = result;

        var lines = historyTable.getElementsByTagName('tr');
        if (lines.length > 5) {
            historyTable.deleteRow(5);
        }
    }

    function handleHistoryRowClick(event) {
        const clickedRow = event.currentTarget;
        const resultCell = clickedRow.querySelector("td:last-child");
        const clickedResult = resultCell.textContent;
        display.value = clickedResult;
        currentExpression = clickedResult;
    }

    const historyRows = historyTable.querySelectorAll("tr");
    historyRows.forEach(row => {
        row.addEventListener("click", handleHistoryRowClick);
    });
});