// LocalStorage mentés és betöltés
function saveToStorage() {
    var input = document.getElementById("storageInput").value;
    localStorage.setItem("storedText", input);
    alert("Mentve!");
}

function loadFromStorage() {
    var output = document.getElementById("storageOutput");
    output.innerText = localStorage.getItem("storedText") || "Nincs adat!";
}

// Geolocation lekérése
function getLocation() {
    var locationOutput = document.getElementById("locationOutput");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                locationOutput.innerText =
                    "Szélesség: " + position.coords.latitude +
                    ", Hosszúság: " + position.coords.longitude;
            },
            function () {
                locationOutput.innerText = "Nem sikerült lekérni a helyzetet!";
            }
        );
    } else {
        locationOutput.innerText = "A böngésző nem támogatja a geolokációt.";
    }
}

// Web Workers
var worker;
function startWorker() {
    if (typeof(Worker) !== "undefined") {
        worker = new Worker("worker.js");
        worker.onmessage = function(event) {
            document.getElementById("workerOutput").innerText = "Számolás: " + event.data;
        };
    } else {
        alert("A böngésződ nem támogatja a Web Workers API-t!");
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = undefined;
        document.getElementById("workerOutput").innerText = "Számolás: 0";
    }
}

// Server-Sent Events (SSE)
function connectSSE() {
    if (typeof(EventSource) !== "undefined") {
        var source = new EventSource("server.php");
        source.onmessage = function(event) {
            document.getElementById("sseOutput").innerText = event.data;
        };
    } else {
        alert("A böngésződ nem támogatja az SSE-t!");
    }
}

// Drag & Drop API vizuális frissítéssel
function allowDrop(event) {
    event.preventDefault();
    event.target.classList.add("hovered");
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    event.target.classList.remove("hovered");
    var data = event.dataTransfer.getData("text");
    var draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
    draggedElement.style.backgroundColor = "lightgreen"; // Sikeres dobás után színváltozás
}

function dragLeave(event) {
    event.target.classList.remove("hovered");
}

// Canvas rajzolás
function drawOnCanvas() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 50);
    ctx.beginPath();
    ctx.arc(150, 75, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();
}

// SVG átméretezés
function resizeSVG() {
    var svgElement = document.querySelector("svg rect");
    svgElement.setAttribute("width", "150");
    svgElement.setAttribute("height", "80");
}
