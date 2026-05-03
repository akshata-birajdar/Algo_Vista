let bars = [];
let delay = 300;

function drawBars(array) {
    const svg = document.getElementById("bar-container");
    svg.innerHTML = "";
    const width = svg.clientWidth / array.length;
    const max = Math.max(...array);

    array.forEach((val, i) => {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", i * width);
        rect.setAttribute("y", 300 - (val / max) * 280);
        rect.setAttribute("width", width - 2);
        rect.setAttribute("height", (val / max) * 280);
        rect.setAttribute("fill", "#56fa28");
        svg.appendChild(rect);
        bars[i] = rect;
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSortVisual(array) {
    let len = array.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - i - 1; j++) {
            bars[j].setAttribute("fill", "red");
            bars[j + 1].setAttribute("fill", "red");

            await sleep(delay);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                drawBars(array);
                await sleep(delay);
            }

            bars[j].setAttribute("fill", "#56fa28");
            bars[j + 1].setAttribute("fill", "#56fa28");
        }
    }
}

function generateCustomArray() {
    const input = document.getElementById("custom-data").value;
    const arr = input.split(",").map(Number);
    if (arr.every(num => !isNaN(num))) {
        drawBars(arr);
        window.currentArray = arr;
    } else {
        alert("Please enter valid comma-separated numbers.");
    }
}

function startSort() {
    delay = document.getElementById("speed").value;
    if (window.currentArray && window.currentArray.length > 1) {
        bubbleSortVisual([...window.currentArray]);
    }
}

window.onload = () => {
    const defaultArray = [30, 10, 50, 20, 40, 60];
    drawBars(defaultArray);
    window.currentArray = defaultArray;
};

function generateCustomArray() {
    const input = document.getElementById("custom-data").value;
    const arr = input.split(",").map(Number);
    if (arr.every(num => !isNaN(num))) {
        drawBars(arr);
        window.currentArray = arr;

        // Auto-start sorting after generating array
        delay = document.getElementById("speed").value;
        bubbleSortVisual([...arr]);
    } else {
        alert("Please enter valid comma-separated numbers.");
    }
}