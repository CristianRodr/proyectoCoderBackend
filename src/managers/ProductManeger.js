const {getDatos, saveDatos} = require("../util/fs");

const fs = require("fs");

class ProductManeger {
    constructor(rutaArchivo) {
        this.ruta = rutaArchivo;
    }

    //lectura de los productos
    getProducts() {
        return getDatos(this.ruta)
    }


    //adicionando productos
    addProduct(articulo) {

        let products =  this.getProducts();

        //id generando automáticamente SIN REPETIRSE
        let id = 1
        if (products.length > 0) {
            id = Math.max(...products.map(p => p.id)) + 1;
        }

        let nuevoProducto = {
            id,
            ...articulo
        }

        products.push(nuevoProducto);
        saveDatos(this.ruta, products);

        return nuevoProducto;
    }
}

module.exports = ProductManeger;