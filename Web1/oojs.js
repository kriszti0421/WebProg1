// Termék osztály
function Product(name, price) {
    this.name = name;
    this.price = price;
}

// Termékkészlet osztály
function ProductManager() {
    this.products = [];
}

// Termék hozzáadása
ProductManager.prototype.addProduct = function(name, price) {
    var newProduct = new Product(name, price);
    this.products.push(newProduct);
    this.renderProducts();
};

// Termék törlése
ProductManager.prototype.deleteProduct = function(index) {
    this.products.splice(index, 1);
    this.renderProducts();
};

// Termékek megjelenítése
ProductManager.prototype.renderProducts = function() {
    var list = document.getElementById("productList");
    list.innerHTML = "";

    for (var i = 0; i < this.products.length; i++) {
        var li = document.createElement("li");
        li.innerHTML = this.products[i].name + " - " + this.products[i].price + " Ft " +
            "<button onclick='deleteProduct(" + i + ")'>Törlés</button>";
        list.appendChild(li);
    }
};

// Termékkezelő példány létrehozása
var productManager = new ProductManager();

// Termék hozzáadása az űrlapból
function addProduct() {
    var name = document.getElementById("productName").value;
    var price = document.getElementById("productPrice").value;

    if (!name || !price) {
        alert("Adj meg egy nevet és egy árat!");
        return;
    }

    productManager.addProduct(name, price);
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
}

// Termék törlése gombra kattintva
function deleteProduct(index) {
    productManager.deleteProduct(index);
}
