function generateTable() {
    var table = document.getElementById("chartTable");

    for (var i = 0; i < 5; i++) {
        var row = table.insertRow();
        for (var j = 0; j < 5; j++) {
            var cell = row.insertCell();
            cell.innerText = Math.floor(Math.random() * 100);
        }
    }
}

function drawChart() {
    var table = document.getElementById("chartTable");
    var selectedRow = table.rows[0]; // Első sor alapértelmezett
    var labels = ["1", "2", "3", "4", "5"];
    var data = [];

    for (var i = 0; i < selectedRow.cells.length; i++) {
        data.push(parseInt(selectedRow.cells[i].innerText, 10));
    }

    var ctx = document.getElementById("chartCanvas").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Adatok",
                data: data,
                borderColor: "blue",
                fill: false
            }]
        }
    });
}
