const fs = require('fs')

function getDatos(ruta) {
    if (fs.existsSync(ruta)) {
        return JSON.parse(fs.readFileSync(ruta, 'utf8'))
    } else {
        return []; // si no me muestra un arreglo vació
    }
}

function saveDatos(ruta, datos) {
    fs.writeFileSync(ruta, JSON.stringify(datos, null, 3));
}

module.exports = {getDatos, saveDatos};