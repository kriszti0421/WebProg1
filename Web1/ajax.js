// CRUD API URL
const API_URL = 'http://localhost:3000/api/data';

// Betölti az adatokat és megjeleníti a táblázatban
async function loadData() {
    const response = await fetch(API_URL);
    const data = await response.json();
    
    let tableBody = document.getElementById("dataTableBody");
    tableBody.innerHTML = "";
    data.forEach(item => {
        let row = `<tr>
            <td>${item.id}</td>
            <td>${item.name}</td>
            <td>${item.height}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });
    
    calculateHeightStats(data);
}

// Magasság összeg, átlag, maximum számítása
function calculateHeightStats(data) {
    if (data.length === 0) return;
    
    let sum = data.reduce((acc, item) => acc + item.height, 0);
    let avg = sum / data.length;
    let max = Math.max(...data.map(item => item.height));
    
    document.getElementById("heightSum").textContent = `Összeg: ${sum}`;
    document.getElementById("heightAvg").textContent = `Átlag: ${avg.toFixed(2)}`;
    document.getElementById("heightMax").textContent = `Max: ${max}`;
}

// Új adat létrehozása
async function createData() {
    let name = document.getElementById("newName").value;
    let height = parseInt(document.getElementById("newHeight").value);
    
    if (!validateInput(name, height)) return;
    
    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, height })
    });
    
    loadData();
}

// Adat módosítása
async function updateData() {
    let id = document.getElementById("updateId").value;
    let name = document.getElementById("newName").value;
    let height = parseInt(document.getElementById("newHeight").value);
    
    if (!validateInput(name, height)) return;
    
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, height })
    });
    
    loadData();
}

// Adat törlése
async function deleteData() {
    let id = document.getElementById("deleteId").value;
    
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    
    loadData();
}

// ID alapján betölti az adatokat a mezőkbe (Update-hez)
function getDataForId() {
    let id = document.getElementById("updateId").value;
    fetch(`${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("newName").value = data.name;
            document.getElementById("newHeight").value = data.height;
        })
        .catch(() => alert("Nincs ilyen ID!"));
}

// Bevitel ellenőrzése
function validateInput(name, height) {
    if (!name || name.length > 30) {
        alert("A név nem lehet üres és maximum 30 karakter lehet!");
        return false;
    }
    if (!height || isNaN(height) || height < 100 || height > 250) {
        alert("A magasságnak számnak kell lennie (100 és 250 között)!");
        return false;
    }
    return true;
}

// Betöltés indításkor
loadData();