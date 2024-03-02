const {getDatos, saveDatos} = require("../util/fs");

const path = require('path');
const express = require('express');
const router = express.Router();
//-----------------------------------------------
const rutaDirectorio = require('../util/path');
//-----------------------------------------------
// remendando ruta hacia data
let rutaProduct = path.join(rutaDirectorio, "data", "products.json");
// instanciando la clase ProductsManager
const ProductsManager = require('../managers/ProductManeger')
const productManager = new ProductsManager(rutaProduct);
//------------------------------------------------
// función de simplification, llamado de obtención
const reedProduct = () => productManager.getProducts();
const obtenerProduct = reedProduct();
//------------------------------------------------
//...............obtener
router.get('/',
    (req, res) => {
        //let productos = productManager.getProducts();
        let {limit} = req.query;
        let resultadoJson = obtenerProduct;

        if (limit && (limit > 0)) {
            resultadoJson = resultadoJson.slice(0, limit)
        }

        res.status(200).render('home', {
            prods: resultadoJson,
            pageTitle: 'Add Product',
            path: "/",
            hasProducts: resultadoJson.length > 0,
            activeProduct: true,
        });
    });
//...............crear
router.post('/',
    (req, res) => {

        let {title, description, price, thumbnail, code, stock, status = true, category} = req.body
        if (!(title && description && price && code && stock && status && category)) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({error: `Complete el nombre`});
        }

        let codeExiste = obtenerProduct.find((codeValidator) => codeValidator.code === code);
        if (codeExiste) {
            return res.status(400).json({error: `Code ${code} duplicado`});
        }

        let nuevoProducto = productManager.addProduct(req.body);

        res.status(201).json({
            nuevoProducto
        });
    })
//...............obtener x id
router.get('/:pid',
    (req, res) => {
        let {pid} = req.params;
        pid = Number(pid);

        if (isNaN(pid)) {
            return res.status(400).json({error: `El id debe ser numérico`});
        }

        let resultadoId = obtenerProduct.find(r => r.id === pid);
        if (!resultadoId) {
            return res.status(400).json({error: `no existe producto con id ${pid}`});
        }

        res.status(201).json({
            resultadoId
        });
    })
//...............modificar
router.put('/:pid',
    (req, res) => {

        let pid = Number(req.params.pid);
        if (isNaN(pid)) {
            return res.status(400).json({error: "id debe ser numérico"});
        }

        let indiceProduct = obtenerProduct.findIndex(i => i.id === pid);
        if (indiceProduct === -1) {
            return res.status(400).json({error: `no existe producto con id ${pid}`})
        }

        obtenerProduct[indiceProduct] = {
            ...obtenerProduct[indiceProduct],
            ...req.body,
            pid
        }

        saveDatos(rutaProduct, obtenerProduct);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(obtenerProduct[indiceProduct]);
    })
//...............eliminar
router.delete("/:pid",
    (req, res) => {

        let pid = Number(req.params.pid);
        if (isNaN(pid)) {
            return res.status(400).json({error: "id debe ser numérico"});
        }

        let indiceProduct = obtenerProduct.findIndex(i => i.id === pid);
        if (indiceProduct === -1) {
            return res.status(400).json({error: `no existe producto con id ${pid}`})
        }

        let productEliminado = obtenerProduct[indiceProduct];
        obtenerProduct.splice(indiceProduct, 1);

        saveDatos(rutaProduct, obtenerProduct);

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json({productEliminado});
    })

//------------------------------------------------
module.exports = router;
