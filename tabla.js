var table = document.getElementById("crudTable").getElementsByTagName("tbody")[0];

var initialData = [
    { name: "József", age: 25, city: "Budapest", email: "jozsef@example.com" },
    { name: "Anna", age: 32, city: "Szeged", email: "anna@example.com" },
    { name: "Péter", age: 28, city: "Debrecen", email: "peter@example.com" },
    { name: "Katalin", age: 40, city: "Pécs", email: "katalin@example.com" }
];

// Táblázat inicializálása az adatokkal
function loadInitialData() {
    initialData.forEach(data => addRow(data.name, data.age, data.city, data.email, false));
}

// Sor hozzáadása
function addRow(name, age, city, email, clearInputs = true) {
    if (clearInputs) {
        name = document.getElementById("name").value.trim();
        age = document.getElementById("age").value.trim();
        city = document.getElementById("city").value.trim();
        email = document.getElementById("email").value.trim();

        if (name === "" || age === "" || city === "" || email === "") {
            alert("Minden mezőt ki kell tölteni!");
            return;
        }

        if (isNaN(age) || age < 1 || age > 99) {
            alert("A kor 1 és 99 között kell legyen!");
            return;
        }
    }

    var newRow = table.insertRow();
    newRow.innerHTML =
        `<td>${name}</td>
         <td>${age}</td>
         <td>${city}</td>
         <td>${email}</td>
         <td>
            <button onclick="editRow(this)">Szerkeszt</button>
            <button onclick="deleteRow(this)">Törlés</button>
         </td>`;

    if (clearInputs) {
        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("city").value = "";
        document.getElementById("email").value = "";
    }
}

// Sor szerkesztése
function editRow(button) {
    var row = button.parentNode.parentNode;
    document.getElementById("name").value = row.cells[0].innerText;
    document.getElementById("age").value = row.cells[1].innerText;
    document.getElementById("city").value = row.cells[2].innerText;
    document.getElementById("email").value = row.cells[3].innerText;
    row.remove();
}

// Sor törlése
function deleteRow(button) {
    button.parentNode.parentNode.remove();
}

// Keresés a táblázatban
function searchTable() {
    var input = document.getElementById("search").value.toUpperCase();
    var rows = table.getElementsByTagName("tr");

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var match = false;

        for (var j = 0; j < cells.length; j++) {
            if (cells[j].innerText.toUpperCase().includes(input)) {
                match = true;
                break;
            }
        }
        rows[i].style.display = match ? "" : "none";
    }
}

// Táblázat rendezése
function sortTable(n) {
    var rows = Array.from(table.getElementsByTagName("tr"));
    var sortedRows = rows.sort(function (a, b) {
        var x = a.cells[n].innerText.toLowerCase();
        var y = b.cells[n].innerText.toLowerCase();
        return x.localeCompare(y);
    });

    for (var i = 0; i < sortedRows.length; i++) {
        table.appendChild(sortedRows[i]);
    }
}

// Alapértelmezett adatok betöltése
window.onload = loadInitialData;
