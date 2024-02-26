const {getDatos, saveDatos} = require("../util/fs");

const path = require('path');
const express = require('express');
const router = express.Router();
const fs = require("fs");
//-----------------------------------------------
const rutaDirectorio = require('../util/path');

//-----------------------------------------------
// remendando ruta hacia data
let rutaCarts = path.join(rutaDirectorio, "data", "carts.json");
// instanciando la clase ProductsManager
const CartsManager = require('../managers/cartsManager')

const cartManager = new CartsManager(rutaCarts);
//------------------------------------------------
//sintetizando llamada
const reedCarts = () => cartManager.getCart();
const obtenerCart = reedCarts();
//------------------------------------------------
//funcion para la lectura de products.json
function loadJSONFile() {
    try {
        const fileContent = fs.readFileSync(path.join(__dirname, '../', 'data', 'products.json'), 'utf-8');
        return  JSON.parse(fileContent);
    } catch (error) {
        console.error('Error al cargar el archivo JSON:', error);
    }
}
//------------------------------------------------
//...............obtener carts x id
router.get('/:cid',
    (req, res) => {
        let {cid} = req.params;
        cid = Number(cid);

        if (isNaN(cid)) {
            return res.status(400).json({error: `El id debe ser numérico`});
        }

        let resultadoId = obtenerCart.find(r => r.id === cid);
        if (!resultadoId) {
            return res.status(400).json({error: `no existe producto con id ${cid}`});
        }

        res.status(201).json({
            resultadoId
        })
})
//...............creando carts
router.post('/',
    (req, res) => {

        let {products = []} = req.body
        if (!products) {
            res.setHeader('Content-Type', 'application/json');
            return res.status(400).json({error: `Complete el nombre`});
        }

        let nuevoCarts = cartManager.addCart(req.body);

        res.status(201).json({
            nuevoCarts
        })
    })
//...............creando array especificos en carts
router.post('/:cid/product/:pid',
    (req, res) => {
        //===============carts id================
        let {cid} = req.params;
        cid = Number(cid);

        if (isNaN(cid)) {
            return res.status(400).json({error: `El id debe ser numérico`});
        }

        let resultadoCartsId = obtenerCart.find(r => r.id === cid);
        if (!resultadoCartsId) {
            return res.status(400).json({error: `no existe producto con id ${cid}`});
        }
        //===============product id================
        let {pid} = req.params;
        pid = Number(pid);

        if (isNaN(pid)) {
            return res.status(400).json({error: `El id debe ser numérico`});
        }

        let resultadoJson = loadJSONFile();

        let resultadoProductId = resultadoJson.find(r => r.id === pid);
        if (!resultadoProductId) {
            return res.status(400).json({error: `no existe producto con id ${pid}`});
        }
        //=========Lógica de Comunicación ids=========
        const obj = resultadoCartsId.products.find(r => r.product === pid)
        const objIndex = resultadoCartsId.products.findIndex(r => r.product === pid)

        if (obj === undefined) {
            resultadoCartsId.products.push({
                product: resultadoProductId.id,
                quantity: 1
            });
        } else {
            if (obj.product === pid) {
                resultadoCartsId.products[objIndex].quantity += 1;
            }
        }

        saveDatos(rutaCarts, obtenerCart);

        res.status(201).json({
            resultadoCartsId
        })
})
//...............

module.exports = router;