var apiUrl = "https://github.com/MolnarMateK/WebProg1/blob/main/ajax.js"; // Az API URL

// Adatok betöltése
function fetchData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", apiUrl, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            updateTable(data);
            updateStatistics(data);
        }
    };
    xhr.send();
}

// Táblázat frissítése
function updateTable(data) {
    var tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];
    tableBody.innerHTML = ""; // Táblázat kiürítése
    for (var i = 0; i < data.length; i++) {
        var row = document.createElement("tr");

        var idCell = document.createElement("td");
        idCell.innerText = data[i].id;
        row.appendChild(idCell);

        var nameCell = document.createElement("td");
        nameCell.innerText = data[i].name;
        row.appendChild(nameCell);

        var heightCell = document.createElement("td");
        heightCell.innerText = data[i].height;
        row.appendChild(heightCell);

        tableBody.appendChild(row);
    }
}

// Új adat létrehozása
function createData() {
    var name = document.getElementById("newName").value.trim();
    var height = document.getElementById("newHeight").value.trim();
    if (!validateInput(name, height)) return;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", apiUrl, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            alert("Új adat sikeresen létrehozva!");
            fetchData(); // Táblázat frissítése
        }
    };
    xhr.send(JSON.stringify({ name: name, height: parseInt(height, 10) }));
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

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", apiUrl + "/" + id, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Adat sikeresen frissítve!");
            fetchData(); // Táblázat frissítése
        }
    };
    xhr.send(JSON.stringify({ name: name, height: parseInt(height, 10) }));
}

// Adat törlése
function deleteData() {
    var id = document.getElementById("deleteId").value.trim();
    if (!id) {
        alert("Az ID mező nem lehet üres!");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", apiUrl + "/" + id, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert("Adat sikeresen törölve!");
            fetchData(); // Táblázat frissítése
        }
    };
    xhr.send();
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
function updateStatistics(data) {
    var heights = [];
    for (var i = 0; i < data.length; i++) {
        heights.push(data[i].height);
    }

    var sum = 0;
    for (var j = 0; j < heights.length; j++) {
        sum += heights[j];
    }

    var average = heights.length > 0 ? (sum / heights.length) : 0;
    var max = heights.length > 0 ? Math.max.apply(null, heights) : 0;

    document.getElementById("sum").innerText = sum;
    document.getElementById("average").innerText = average.toFixed(2);
    document.getElementById("max").innerText = max;
}
