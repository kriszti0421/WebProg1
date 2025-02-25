var xhr = new XMLHttpRequest();

function fetchData() {
    xhr.open("GET", "https://api.example.com/data", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("apiOutput").innerText = xhr.responseText;
        }
    };
    xhr.send();
}

function createData() {
    var data = "name=" + encodeURIComponent(document.getElementById("name").value);
    xhr.open("POST", "https://api.example.com/data", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            alert("Sikeresen létrehozva!");
        }
    };
    xhr.send(data);
}
