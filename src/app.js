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