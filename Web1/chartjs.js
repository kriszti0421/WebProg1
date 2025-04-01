window.onload = function () {
    var table = document.getElementById("dataTable");
    var rows = table.getElementsByTagName("tr");
    var ctx = document.getElementById("chartCanvas").getContext("2d");
    var chart = null;

    function drawChart(data) {
        var labels = ["Érték 1", "Érték 2", "Érték 3", "Érték 4", "Érték 5"];

        if (chart !== null) {
            chart.destroy(); // Régi diagram törlése
        }

        chart = new Chart(ctx, {
            type: "line",
            data: {
                labels: labels,
                datasets: [{
                    label: "Kiválasztott adatsor",
                    data: data,
                    borderColor: "blue",
                    borderWidth: 2,
                    fill: false
                }]
            },
            options: {
                responsive: false,  // Nem lesz túl nagy
                maintainAspectRatio: false
            }
        });
    }

    function getRowData(row) {
        var cells = row.getElementsByTagName("td");
        var data = [];
        for (var j = 1; j < cells.length; j++) {
            data.push(parseInt(cells[j].innerHTML, 10));
        }
        return data;
    }

    // Alapértelmezett diagram (első sor adataival)
    drawChart(getRowData(rows[1]));

    // Táblázatsorok eseménykezelője
    for (var i = 1; i < rows.length; i++) {
        rows[i].onclick = function () {
            drawChart(getRowData(this));
        };
    }
};
