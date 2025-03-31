var localData = []; // Lokális adatokat tároló tömb

// Adatok betöltése
function fetchData() {
    updateTable();
}

// Táblázat frissítése
function updateTable() {
    var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Táblázat kiürítése

    localData.forEach((item) => {
        var row = document.createElement("tr");

        var idCell = document.createElement("td");
        idCell.innerText = item.id;
        row.appendChild(idCell);

        var nameCell = document.createElement("td");
        nameCell.innerText = item.name;
        row.appendChild(nameCell);

        var heightCell = document.createElement("td");
        heightCell.innerText = item.height;
        row.appendChild(heightCell);

        tableBody.appendChild(row);
    });

    updateStatistics(); // Frissíti a statisztikákat
}

// Új adat létrehozása
function createData() {
    var name = document.getElementById("newName").value.trim();
    var height = document.getElementById("newHeight").value.trim();
    
    if (!validateInput(name, height)) return;

    var newId = localData.length > 0 ? localData[localData.length - 1].id + 1 : 1;
    var newUser = { id: newId, name: name, height: parseInt(height, 10) };

    localData.push(newUser);
    updateTable();

    document.getElementById("newName").value = "";
    document.getElementById("newHeight").value = "";

    alert("Új adat sikeresen létrehozva!");
}

// Adat frissítése
function updateData() {
    var id = parseInt(document.getElementById("updateId").value.trim(), 10);
    var name = document.getElementById("updateName").value.trim();
    var height = document.getElementById("updateHeight").value.trim();

    if (!id || !validateInput(name, height)) return;

    var user = localData.find(item => item.id === id);
    if (!user) {
        alert("Nincs ilyen ID-jű adat!");
        return;
    }

    user.name = name;
    user.height = parseInt(height, 10);
    updateTable();

    alert("Adat sikeresen frissítve!");
}

// Adat törlése
function deleteData() {
    var id = parseInt(document.getElementById("deleteId").value.trim(), 10);
    if (!id) {
        alert("Az ID mező nem lehet üres!");
        return;
    }

    var index = localData.findIndex(item => item.id === id);
    if (index === -1) {
        alert("Nincs ilyen ID-jű adat!");
        return;
    }

    localData.splice(index, 1);
    updateTable();

    alert("Adat sikeresen törölve!");
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

// Statisztikák frissítése
function updateStatistics() {
    var heights = localData.map(item => item.height);

    var sum = heights.reduce((acc, val) => acc + val, 0);
    var average = heights.length > 0 ? (sum / heights.length) : 0;
    var max = heights.length > 0 ? Math.max(...heights) : 0;

    document.getElementById("sum").innerText = sum;
    document.getElementById("average").innerText = average.toFixed(2);
    document.getElementById("max").innerText = max;
}
