// Web Storage
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

// Web Workers
var worker;

function startWorker() {
    if (typeof(Worker) !== "undefined") {
        worker = new Worker("worker.js");
        document.getElementById("workerOutput").innerText = "Számolás indult...";
        worker.onmessage = function(event) {
            document.getElementById("workerOutput").innerText = "Eredmény: " + event.data;
        };
    } else {
        alert("A böngésződ nem támogatja a Web Workers API-t!");
    }
}

function stopWorker() {
    if (worker) {
        worker.terminate();
        worker = undefined;
        document.getElementById("workerOutput").innerText = "Worker leállítva!";
    }
}

// Server-Sent Events (SSE)
function connectSSE() {
    if (typeof(EventSource) !== "undefined") {
        var source = new EventSource("server.php");
        document.getElementById("sseOutput").innerText = "Kapcsolódás...";
        source.onmessage = function(event) {
            document.getElementById("sseOutput").innerHTML = `<div style="padding:10px; background:#eee; margin-top:10px;">
                <b>Új adat:</b> ${event.data} <br> <small>${new Date().toLocaleTimeString()}</small>
            </div>`;
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
    var target = event.target;

    if (target.id === "dropZone") {
        target.appendChild(document.getElementById(data));
        target.style.background = "#d4edda";  // Zöld háttér sikeres dobáskor
    } else {
        alert("Csak a kijelölt területre lehet dobni!");
    }
}

// Canvas rajzolás
function drawOnCanvas() {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Törlés

    ctx.fillStyle = "red";
    ctx.fillRect(50, 50, 100, 50); // Piros négyzet

    ctx.beginPath();
    ctx.arc(200, 75, 30, 0, 2 * Math.PI); // Piros kör
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(250, 100);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
}
