# proyecto Coder Backend
***
## PARA PRUEBAS DE USO EN POSTMAN 
***
### pruebas en product

``{
    "title": "Fríjol rojo",
    "description": "comestible",
    "price": 5,
    "thumbnail": "prueba5",
    "code": "abc5",
    "stock": 32,
    "status": true,
    "category": "grano"
}``

http://localhost:8080/api/products<br>
http://localhost:8080/api/products/8<br>
http://localhost:8080/api/products?limit=3
***
### Pruebas en Carts

`{"products": []}`

http://localhost:8080/api/carts/<br>
http://localhost:8080/api/carts/1<br>
http://localhost:8080/api/carts/4/product/7
