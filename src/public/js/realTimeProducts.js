console.log('abriste vista realtime aun no funcionando socket...conectalo con un post');
const socket = io();

socket.on('nuevoProducto', nuevoProducto => {
    console.log('socket <<cliente>> conectado')
    console.log(nuevoProducto);
    let newProduct = document.querySelector('#nuevo__producto');
    newProduct.innerHTML += `
        <li class="card">
            <p><b>id</b>: ${nuevoProducto.id}</p>
            <p><b>title</b>: ${nuevoProducto.title}</p>
            <p><b>description</b>: ${nuevoProducto.description}</p>
            <p><b>price</b>: ${nuevoProducto.price}</p>
            <p><b>thumbnail</b>: ${nuevoProducto.thumbnail}</p>
            <p><b>code</b>: ${nuevoProducto.code}</p>
            <p><b>stock</b>: ${nuevoProducto.stock}</p>
            <p><b>status</b>: ${nuevoProducto.status}</p>
            <p><b>category</b>: ${nuevoProducto.category}</p>
        </li>
        <hr>
    `
})