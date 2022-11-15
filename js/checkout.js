const tBody = document.querySelector("tbody")
const boton = document.querySelector('#vaciar-carrito')
const btnDescuento = document.querySelector("#button-discount")
const descuento = document.querySelector("#discount")
const valorDescuento = []
//variables con "let" ya que para vaciar carrito y figure como vacío no podía ser constante
let carrito = []
let totalCarrito = 0


//Recuperar el carrito
const recuperarCarrito = () => {
    if (localStorage.getItem("carrito")) {
        let carritoRecuperado = JSON.parse(localStorage.getItem("carrito"))
        carritoRecuperado.forEach(elemento => {
            carrito.push(elemento)
        });
    }
}
recuperarCarrito()


//Aplico descuento si tengo el voucher --> nutri22
const aplicarDescuento = () => {
    if (descuento.value == "nutri22") {
        let totalDescuento = 0.8 // 20% descuento
        valorDescuento.push(totalDescuento)
        localStorage.setItem("valordescuento", JSON.stringify(valorDescuento))
        return totalDescuento
    }
    return recuperarDescuento()
}


//Recupero el descuento si es que continúo comprando
const recuperarDescuento = () => {
    if (localStorage.getItem("valordescuento")) {
        let descuentoRecuperado = JSON.parse(localStorage.getItem("valordescuento"))
        valorDescuento.push(descuentoRecuperado[0])
        return valorDescuento[0]
    }
    return 1
}


//Botones para eliminar productos
const botonesEliminar = () => {
    const botonEliminar = document.querySelectorAll("#buttonDelete")
    botonEliminar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let eliminar = carrito.findIndex(productos => productos.titulo === e.target.id)
            carrito.splice(eliminar, 1)
            localStorage.setItem("carrito", JSON.stringify(carrito))
            cargarCarrito()
        })
    })
}


//Cargar productos al carrito
const cargarCarrito = () => {
    let tablaBody = ""
    tBody.innerHTML = ""
    console.log()
    carrito.forEach(prod => {
        tablaBody += `  <tr>
                            <th>${prod.titulo}</th>
                            <th>$ ${prod.precio}</th>
                            <th>${prod.cantidad}</th>
                            <th>$ ${prod.precio * prod.cantidad} </th>
                            <th>
                            <i id=buttonDelete class="fa fa-trash" aria-hidden="true"></i>
                            </th>
                        </tr>`
    })
    tBody.innerHTML = tablaBody

    let valorDescuento = aplicarDescuento()

    totalCarrito = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad) * valorDescuento, 0)

    tBody.innerHTML += `<tr>
                            <th></th>
                            <th></th>
                            <th class=total>TOTAL</th>
                            <th class=total>$ ${totalCarrito}</th>
                            <th></th>
                        </tr>`
    botonesEliminar()
}

cargarCarrito()


//Sweet alert
const alerta = (titulo, textoBoton, colorButton) => {
    return Swal.fire({ title: titulo, confirmButtonText: textoBoton, confirmButtonColor: colorButton })
}

const carritoVacio = () => {
    alerta("¡El carrito está vacío!", "VOLVER!", "#ef6277").then(result => {
        if (result.isConfirmed) {
            location.href = 'index.html'
        }
    })
}

const finalizarCompra = () => {
    alerta('Muchas gracias por su compra.', 'SALIR', "#ef6277").then(result => {
        if (result.isConfirmed) {
            localStorage.removeItem("carrito")
            location.href = 'index.html'
        }
    })
}

const continuarComprando = () => {
    location.href = 'index.html'
}

//Botones
btnComprar.addEventListener("click", () => carrito.length === 0 ? carritoVacio() : finalizarCompra()) //proceder a comprar
btnSalir.addEventListener("click", () => continuarComprando()) //continuar comprando, te lleva al index.html
btnDescuento.addEventListener("click", () => cargarCarrito()) //agrega descuento
boton.addEventListener("click", () => {
    tBody.innerHTML = `<tr>
                            <th></th>
                            <th></th>
                            <th>TOTAL</th>
                            <th>$ 0</th>
                        </tr>`

    localStorage.clear()
    carrito = [] //vacía carrito

})



