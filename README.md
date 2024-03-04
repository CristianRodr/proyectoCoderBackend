# proyecto Coder Backend
## PARA PRUEBAS DE USO EN POSTMAN
***
### Pruebas en socket

http://localhost:8080/realtimeproducts

### Prueba usa de motor de plantillas handlebars

http://localhost:8080

***

### Pruebas en product

``{ "title": "cafe", 
    "description": "bebida", 
    "price": 5, 
    "thumbnail": "prueba15", 
    "code": "abc15", 
    "stock": 10, 
    "status": true, 
    "category": "grano" }``

http://localhost:8080/api/products 

http://localhost:8080/api/products/8

http://localhost:8080/api/products?limit=3
***
### Pruebas en Carts

`{"products": []}`

http://localhost:8080/api/carts/

http://localhost:8080/api/carts/1

http://localhost:8080/api/carts/4/product/7
