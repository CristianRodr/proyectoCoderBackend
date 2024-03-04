const path = require('path');
const express = require('express'); //*importando express
const expressHbs = require('express-handlebars');
const {Server} = require('socket.io');

const PORT = 8080;
let io;
const app = express();

//------------------handlebars---------------------
app.engine('handlebars', expressHbs({
    defaultLayout: 'main-layout',
    extname: 'handlebars',
    layoutsDir: 'src/views/layouts'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, "views"));

//------------------Routes Import---------------------
const vistaRoutes = require('./routes/vistaR');
const productsRoutes = require('./routes/productsR');
const cartsRoutes = require('./routes/cartsR');
//----------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
//----------------------------------------------------

app.use('/api/products',
    (req, res, next) => {
        req.io = io
        next()
    },
    productsRoutes);
app.use('/', vistaRoutes);

app.use('/api/carts', cartsRoutes);

/*app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send('OK');
});*/

//----------------------------------------------------
const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

io = new Server(server);