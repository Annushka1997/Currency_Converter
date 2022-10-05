"use strict";

const currencyInput = document.getElementById("currencyInput");
const currencyOutput = document.getElementById("currencyOutput");
const inputNumber = document.getElementById("inputNumber");
const outputNumber = document.getElementById("outputNumber");
const button = document.getElementById("btn");

function calculate () {
    outputNumber.addEventListener("input", (e)=> {
        const request = new XMLHttpRequest();
        const input = currencyInput.value;
        const output = currencyOutput.value;
        request.open("GET", "./db/data.json");
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        request.addEventListener("load", () => {
            if (request.status === 200) {
                const data = JSON.parse(request.response);
                inputNumber.value = ((parseFloat(e.target.value) / parseFloat(data.change[input]))*data.change[output]).toFixed(2);
            } else {
                console.log("Error 404 file is not found !!!");
            }
            if (isNaN(inputNumber.value)) {
                inputNumber.value = 0;
            }
        });
    });
    inputNumber.addEventListener("input", (e)=> {
            const request = new XMLHttpRequest();
            const input = currencyInput.value;
            const output = currencyOutput.value;
            request.open("GET", "./db/data.json");
            request.setRequestHeader("Content-Type", "application/json");
            request.send();
            request.addEventListener("load", () => {
                if (request.status === 200) {
                    const data = JSON.parse(request.response);
                    outputNumber.value = ((parseFloat(e.target.value) / parseFloat(data.change[output]))*data.change[input]).toFixed(2);
                } else {
                    console.log("Error 404 file is not found !!!");
                }
                if (isNaN(outputNumber.value)) {
                    outputNumber.value = 0;
                }
            });
        });
}

inputNumber.addEventListener('input', calculate);
outputNumber.addEventListener('input', calculate);
button.addEventListener('click', () => {
    const temp = currencyInput.value;
    const tempN = inputNumber.value;
    currencyInput.value = currencyOutput.value;
    currencyOutput.value = temp;
    inputNumber.value = outputNumber.value;
    outputNumber.value = tempN;
    calculate();
});
