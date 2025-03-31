var apiUrl = "https://jsonplaceholder.typicode.com/users"; // Teszt API URL
var localData = []; // Kliensoldali adatkezelés

// Adatok betöltése
function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            localData = data.map(user => ({ id: user.id, name: user.name, height: Math.floor(Math.random() * 50) + 150 })); // Magasság generálás
            updateTable();
        })
        .catch(error => console.error("Hiba történt az adatok betöltésekor:", error));
}

// Táblázat frissítése
function updateTable() {
    var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Táblázat kiürítése
    localData.forEach(user => {
        var row = document.createElement("tr");

        var idCell = document.createElement("td");
        idCell.innerText = user.id;
        row.appendChild(idCell);

        var nameCell = document.createElement("td");
        nameCell.innerText = user.name;
        row.appendChild(nameCell);

        var heightCell = document.createElement("td");
        heightCell.innerText = user.height;
        row.appendChild(heightCell);

        tableBody.appendChild(row);
    });
}

// Új adat létrehozása
function createData() {
    var name = document.getElementById("newName").value.trim();
    var height = document.getElementById("newHeight").value.trim();
    if (!validateInput(name, height)) return;

    var newUser = { id: localData.length + 1, name: name, height: parseInt(height, 10) };
    localData.push(newUser);
    updateTable();
    alert("Új adat sikeresen létrehozva!");
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

    var user = localData.find(u => u.id == id);
    if (user) {
        user.name = name;
        user.height = parseInt(height, 10);
        updateTable();
        alert("Adat sikeresen frissítve!");
    } else {
        alert("Nem található ilyen ID-jű adat.");
    }
}

// Adat törlése
function deleteData() {
    var id = document.getElementById("deleteId").value.trim();
    if (!id) {
        alert("Az ID mező nem lehet üres!");
        return;
    }

    var index = localData.findIndex(u => u.id == id);
    if (index !== -1) {
        localData.splice(index, 1);
        updateTable();
        alert("Adat sikeresen törölve!");
    } else {
        alert("Nem található ilyen ID-jű adat.");
    }
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

