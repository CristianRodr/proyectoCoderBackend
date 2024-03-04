const {getDatos, saveDatos} = require("../util/fs");

const fs = require("fs");

class CartsManager {
    constructor(rutaArchivo) {
        this.path = rutaArchivo;
    }

    getCart() {
        return getDatos(this.path)
    }

    addCart(product) {
        let compras = this.getCart();

        let id = 1
        if (compras.length > 0) {
            id = Math.max(...compras.map(p => p.id)) + 1;
        }

        let nuevoCart = {
            id,
            ...product
        };

        compras.push(nuevoCart);
        saveDatos(this.path, compras);

        return nuevoCart;
    }

}

module.exports = CartsManager;