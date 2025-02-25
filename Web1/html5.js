// LocalStorage mentés
function saveToStorage() {
    var input = document.getElementById("storageInput").value;
    localStorage.setItem("storedText", input);
    alert("Mentve!");
}

// LocalStorage betöltés
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
