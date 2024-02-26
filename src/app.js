const path = require('path');
const express = require('express'); //*importando express

const PORT = 8080;
const app = express();

//------------------Routes Import---------------------
const productsRoutes = require('./routes/productsR');
const cartsRoutes = require('./routes/cartsR');
//----------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//----------------------------------------------------

app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
});

//----------------------------------------------------
const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

/* 
################## PARA PRUEBAS DE USO EN POSTMAN ##################                
.........................pruebas en product
{
    "title": "Fríjol rojo",
    "description": "comestible",
    "price": 5,
    "thumbnail": "prueba5",
    "code": "abc5",
    "stock": 32,
    "status": true,
    "category": "grano"
}

http://localhost:8080/api/products
http://localhost:8080/api/products/8
http://localhost:8080/api/products?limit=3

............................Pruebas en Carts
{"products": []}

http://localhost:8080/api/carts/
http://localhost:8080/api/carts/1
http://localhost:8080/api/carts/4/product/7
*/