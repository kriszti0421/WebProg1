var table = document.getElementById("crudTable").getElementsByTagName("tbody")[0];

function addRow() {
    var name = document.getElementById("name").value.trim();
    var age = document.getElementById("age").value.trim();
    var city = document.getElementById("city").value.trim();
    var email = document.getElementById("email").value.trim();

    if (name === "" || age === "" || city === "" || email === "") {
        alert("Minden mezőt ki kell tölteni!");
        return;
    }

    if (isNaN(age) || age < 1 || age > 99) {
        alert("A kor 1 és 99 között kell legyen!");
        return;
    }

    var newRow = table.insertRow();
    newRow.innerHTML =
        "<td>" + name + "</td>" +
        "<td>" + age + "</td>" +
        "<td>" + city + "</td>" +
        "<td>" + email + "</td>" +
        "<td>" +
            '<button onclick="editRow(this)">Szerkeszt</button>' +
            '<button onclick="deleteRow(this)">Törlés</button>' +
        "</td>";

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("city").value = "";
    document.getElementById("email").value = "";
}

function editRow(button) {
    var row = button.parentNode.parentNode;
    document.getElementById("name").value = row.cells[0].innerText;
    document.getElementById("age").value = row.cells[1].innerText;
    document.getElementById("city").value = row.cells[2].innerText;
    document.getElementById("email").value = row.cells[3].innerText;
    table.deleteRow(row.rowIndex - 1);
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    table.deleteRow(row.rowIndex - 1);
}

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
