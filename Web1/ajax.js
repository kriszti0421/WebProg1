const API_URL = 'https://jsonplaceholder.typicode.com/posts'; // JSONPlaceholder API URL

let nextId = 1; // Kezdeti ID érték, mindig növekvő szám
let dataStore = []; // Az adatok tárolására szolgáló tömb

// Adatok betöltése
function fetchData() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            dataStore = data.map(item => ({
                id: nextId++, // Automatikusan növekvő ID
                name: item.title, // JSONPlaceholder-ban a 'title' a név
                height: item.body, // 'body' a magasság helyett
            }));
            updateTable();
            updateStatistics();
        })
        .catch(error => console.error('Hiba történt az adatok betöltésekor:', error));
}

// Táblázat frissítése
function updateTable() {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = ""; // Táblázat kiürítése

    dataStore.forEach(item => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.innerText = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.innerText = item.name;
        row.appendChild(nameCell);

        const heightCell = document.createElement("td");
        heightCell.innerText = item.height;
        row.appendChild(heightCell);

        tableBody.appendChild(row);
    });
}

// Statisztikák frissítése
function updateStatistics() {
    if (dataStore.length === 0) {
        return; // Nincs adat, nem frissítjük a statisztikákat
    }

    const sum = dataStore.reduce((acc, item) => acc + parseInt(item.height), 0);
    const avg = sum / dataStore.length;
    const max = Math.max(...dataStore.map(item => parseInt(item.height)));

    document.getElementById("sum").innerText = sum;
    document.getElementById("average").innerText = avg.toFixed(2);
    document.getElementById("max").innerText = max;
}

// Új adat létrehozása
function createData() {
    const name = document.getElementById("newName").value.trim();
    const height = document.getElementById("newHeight").value.trim();

    // Magasság 100 és 250 között
    if (!validateInput(name, height)) return;

    const newData = { id: nextId++, name: name, height: height };
    dataStore.push(newData); // Új adat hozzáadása

    displayFeedback("Új adat sikeresen létrehozva!");
    updateTable(); // Táblázat frissítése
    updateStatistics(); // Statisztikák frissítése
}

// Adat frissítése
function updateData() {
    const id = document.getElementById("updateId").value.trim();
    const name = document.getElementById("updateName").value.trim();
    const height = document.getElementById("updateHeight").value.trim();

    if (!validateInput(name, height) || !id) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    const index = dataStore.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
        alert("A megadott ID nem létezik!");
        return;
    }

    dataStore[index].name = name;
    dataStore[index].height = height;

    displayFeedback("Adat sikeresen frissítve!");
    updateTable(); // Táblázat frissítése
    updateStatistics(); // Statisztikák frissítése
}

// Adat törlése
function deleteData() {
    const id = document.getElementById("deleteId").value.trim();
    if (!id) {
        alert("Az ID mező nem lehet üres!");
        return;
    }

    dataStore = dataStore.filter(item => item.id !== parseInt(id)); // Törlés
    displayFeedback("Adat sikeresen törölve!");
    updateTable(); // Táblázat frissítése
    updateStatistics(); // Statisztikák frissítése
}

// Visszajelzés megjelenítése
function displayFeedback(message) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.innerHTML = `<p>${message}</p>`;
}

// Input validáció
function validateInput(name, height) {
    if (!name || name.length > 30) {
        alert("A név mező nem lehet üres és maximum 30 karakter hosszú!");
        return false;
    }
    if (!height || isNaN(height) || height < 100 || height > 250) {
        alert("A magasság 100 és 250 között kell legyen!");
        return false;
    }
    return true;
}
