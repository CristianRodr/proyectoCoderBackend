const {getDatos, saveDatos} = require("../util/fs");

const path = require('path');
const express = require('express');
const router = express.Router();
//-----------------------------------------------
// remendando ruta hacia data
const rutaDirectorio = require('../util/path');
let rutaProduct = path.join(rutaDirectorio, "data", "products.json");
//-----------------------------------------------
// instanciando la clase ProductsManager
const ProductsManager = require('../class/ProductManager')
const productManager = new ProductsManager(rutaProduct);
//------------------------------------------------
// función de simplification, llamado de obtención
const reedProduct = () => productManager.getProducts();
const obtenerProduct = reedProduct();
//------------------------------------------------
router.get('/',
    (req, res) => {
        //let productos = productManager.getProducts();
        let resultadoJson = obtenerProduct;

        //- - - - render view home
        res.status(200).render('home', {
            prods: resultadoJson,
            pageTitle: 'Home',
            path: "/",
            hasProducts: resultadoJson.length > 0,
            activeProduct: true,
        });
    });

router.get('/realtimeProducts',
    (req, res) => {
        //let productos = productManager.getProducts();
        let resultadoJson = obtenerProduct;

        //- - - - render view home
        res.status(200).render('realTimeProducts', {
            prods: resultadoJson,
            pageTitle: 'realtime-products',
            path: "/",
            hasProducts: resultadoJson.length > 0,
            activeProduct: true,
        });
    });

module.exports = router;