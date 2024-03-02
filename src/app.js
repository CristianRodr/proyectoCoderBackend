const path = require('path');
const express = require('express'); //*importando express
const expressHbs = require('express-handlebars');

const PORT = 8080;
const app = express();

//------------------handlebars---------------------
app.engine('handlebars', expressHbs({layoutsDir: 'src/views/layouts', defaultLayout: 'main-layout', extname: 'handlebars'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

//------------------Routes Import---------------------
const productsRoutes = require('./routes/productsR');
const cartsRoutes = require('./routes/cartsR');
//----------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
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