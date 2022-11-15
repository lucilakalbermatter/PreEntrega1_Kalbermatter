const container = document.querySelector("section.products-container")
const carrito = []
let cantidad = 1
let productos = []
const URL = "../serverinfo/productos.json"

class Producto {
    constructor(numero, titulo, precio, cantidad) {
        this.numero = numero
        this.titulo = titulo
        this.precio = precio
        this.cantidad = cantidad
    }
}

const retornoCard = (producto) => {
    return ` <div class="card">
                <div class="card-body">
                    <h4>Nº ${producto.numero}</h4>
                    <h5 class="card-title">${producto.titulo}</h5>
                    <p class="card-text">Incluye:</p>
                    <ul class="card-text">
                        <li>${producto.detalle1}</li>
                        <li>${producto.detalle2}</li>
                    </ul>
                    <p class="card-price"> USD ${producto.precio}</p>
                    <button class="button-buy" id="${producto.numero}">Comprar</a>
                </div>
            </div>`
}

const errorMessage = () => {
    return `<div id="error-page">
                <div class="content">
                    <h2 class="header" data-text="404">
                    404
                    </h2>
                    <h4>
                    Opps! Página no encontrada
                    </h4>
                    <p>
                    Lo siento, la página que buscas no existe o algo funciona mal.
                    </p>
                <div class="btns">
                    <a href="./index.html">report problem</a>
                </div>
                </div>
            </div>`
}

const activarBotonesAdd = () => {
    const botonesAdd = document.querySelectorAll(".button-buy")
    botonesAdd.forEach(btn => {
        btn.addEventListener("click", (e) => {
            agregarAlCarrito(e)
        })
    })
}

const cargarMisProductos = async () => {
    container.innerHTML = " "

    try {
        const respuesta = await fetch(URL)
        productos = await respuesta.json()
        productos.forEach(producto => {
            container.innerHTML += retornoCard(producto)
        })
    } catch (error) {
        container.innerHTML = errorMessage()
    } finally {
        activarBotonesAdd()
    }

}
cargarMisProductos()


const toast = (mensaje) => {
    Toastify({
        text: mensaje,
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        style: {
            background: "linear-gradient(to right, #eecda3, #ef6277)",
        }
    }).showToast();
}


const agregarAlCarrito = (e) => {
    let resultado = productos.find(prod => prod.numero === parseInt(e.target.id))
    let resultadoCarrito = carrito.find(prod => prod.numero === parseInt(e.target.id))

    if (resultado !== undefined && resultadoCarrito === undefined) {
        let producto = new Producto(resultado.numero, resultado.titulo, resultado.precio, cantidad)
        carrito.push(producto)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        toast(`'${resultado.titulo}' se agregó al carrito.`)
    }

    if (resultadoCarrito !== undefined) {
        resultadoCarrito.cantidad++
        localStorage.setItem("carrito", JSON.stringify(carrito))
        toast(`'${resultado.titulo}' se agregó al carrito.`)
    }
}


const recuperarCarrito = () => {
    if (localStorage.getItem("carrito")) {
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
        carritoRecuperado.forEach(elemento => {
            carrito.push(elemento)
        });
    }
}

recuperarCarrito()
