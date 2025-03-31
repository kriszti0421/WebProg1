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

// Geolocation API
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

// Web Workers számláló
var worker;
function startWorker() {
    if (typeof(Worker) !== "undefined") {
        if (!worker) {
            worker = new Worker("worker.js");
            worker.onmessage = function(event) {
                document.getElementById("workerOutput").innerText = "Számolás: " + event.data;
            };
        }
    } else {
        alert("A böngésződ nem támogatja a Web Workers API-t!");
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = null;
    }
}

// Server-Sent Events (SSE)
function connectSSE() {
    if (typeof(EventSource) !== "undefined") {
        var source = new EventSource("server.php");
        source.onmessage = function(event) {
            document.getElementById("sseOutput").innerText = "SSE Üzenet: " + event.data;
        };
    } else {
        alert("A böngésződ nem támogatja az SSE-t!");
    }
}

// Drag & Drop API
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    var dropZone = document.getElementById("dropZone");
    var draggedElement = document.getElementById(data);
    
    if (!dropZone.contains(draggedElement)) {
        dropZone.appendChild(draggedElement);
    }
}

// Canvas rajzolás
function drawOnCanvas() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Háttér szín
    ctx.fillStyle = "#ddd";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Piros téglalap
    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 50);

    // Kék kör
    ctx.beginPath();
    ctx.arc(200, 75, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.fill();

    // Szöveg
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Rajzolás kész!", 100, 130);
}

// SVG átméretezés
function resizeSVG() {
    var svgElement = document.querySelector("svg rect");
    svgElement.setAttribute("width", "150");
    svgElement.setAttribute("height", "80");
}
