var apiUrl = "https://jsonplaceholder.typicode.com/users"; // Teszt API URL

// Adatok betöltése
function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateTable(data);
        })
        .catch(error => console.error("Hiba történt az adatok betöltésekor:", error));
}

// Táblázat frissítése
function updateTable(data) {
    var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Táblázat kiürítése
    data.forEach(user => {
        var row = document.createElement("tr");

        var idCell = document.createElement("td");
        idCell.innerText = user.id;
        row.appendChild(idCell);

        var nameCell = document.createElement("td");
        nameCell.innerText = user.name;
        row.appendChild(nameCell);

        var heightCell = document.createElement("td");
        heightCell.innerText = user.height || "N/A"; // JSONPlaceholder nem tartalmaz height-et
        row.appendChild(heightCell);

        tableBody.appendChild(row);
    });
}

// Új adat létrehozása
function createData() {
    var name = document.getElementById("newName").value.trim();
    var height = document.getElementById("newHeight").value.trim();
    if (!validateInput(name, height)) return;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, height: parseInt(height, 10) })
    })
    .then(response => response.json())
    .then(data => {
        alert("Új adat sikeresen létrehozva!");
        fetchData(); // Táblázat frissítése
    })
    .catch(error => console.error("Hiba történt az adat létrehozásakor:", error));
}

// Adat frissítése
function updateData() {
    var id = document.getElementById("updateId").value.trim();
    var name = document.getElementById("updateName").value.trim();
    var height = document.getElementById("updateHeight").value.trim();
    if (!validateInput(name, height) || !id) {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    fetch(apiUrl + "/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, height: parseInt(height, 10) })
    })
    .then(response => response.json())
    .then(data => {
        alert("Adat sikeresen frissítve!");
        fetchData(); // Táblázat frissítése
    })
    .catch(error => console.error("Hiba történt az adat frissítésekor:", error));
}

// Adat törlése
function deleteData() {
    var id = document.getElementById("deleteId").value.trim();
    if (!id) {
        alert("Az ID mező nem lehet üres!");
        return;
    }

    fetch(apiUrl + "/" + id, {
        method: "DELETE"
    })
    .then(response => {
        if (response.ok) {
            alert("Adat sikeresen törölve!");
            fetchData(); // Táblázat frissítése
        } else {
            alert("Hiba történt az adat törlésekor.");
        }
    })
    .catch(error => console.error("Hiba történt az adat törlésekor:", error));
}

// Input validáció
function validateInput(name, height) {
    if (!name || name.length > 30) {
        alert("A név mező nem lehet üres és maximum 30 karakter hosszú!");
        return false;
    }
    if (!height || isNaN(height)) {
        alert("A magasság mező számot kell tartalmazzon!");
        return false;
    }
    return true;
}
