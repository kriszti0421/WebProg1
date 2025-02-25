var table = document.getElementById("dataTable");

function addRow() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var city = document.getElementById("city").value;
    var email = document.getElementById("email").value;

    if (name === "" || age === "" || city === "" || email === "") {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    var newRow = table.insertRow();
    
    newRow.innerHTML =
        "<td>" + name + "</td>" +
        "<td>" + age + "</td>" +
        "<td>" + city + "</td>" +
        "<td>" + email + "</td>" +
        "<td>" +
            '<button onclick="editRow(this)">Szerkesztés</button>' +
            '<button onclick="deleteRow(this)">Törlés</button>' +
        "</td>";

    // Mezők ürítése
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";
    document.getElementById("email").value = "";
}

// Sor szerkesztése
function editRow(button) {
    var row = button.parentNode.parentNode;
    document.getElementById("name").value = row.cells[0].innerText;
    document.getElementById("age").value = row.cells[1].innerText;
    document.getElementById("city").value = row.cells[2].innerText;
    document.getElementById("email").value = row.cells[3].innerText;

    table.deleteRow(row.rowIndex);
}

// Sor törlése
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    table.deleteRow(row.rowIndex);
}
