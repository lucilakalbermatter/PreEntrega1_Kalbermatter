const tBody = document.querySelector("tbody")
const boton = document.querySelector('#vaciar-carrito')
const carrito = []

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
                        </tr>`
    })
    tBody.innerHTML = tablaBody
    let totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0)

    tBody.innerHTML += `<tr>
                            <th></th>
                            <th></th>
                            <th class=total>TOTAL</th>
                            <th class=total>$ ${totalCarrito}</th>
                        </tr>`
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

const salirDeCarrito = () => {
    location.href = 'index.html'
}

btnComprar.addEventListener("click", () => carrito.length === 0 ? carritoVacio() : finalizarCompra())
btnSalir.addEventListener("click", () => salirDeCarrito())

//Vaciar carrito
boton.addEventListener("click", () => {
    tBody.innerHTML = `<tr>
                            <th></th>
                            <th></th>
                            <th>TOTAL</th>
                            <th>$ 0</th>
                        </tr>`
    localStorage.clear()
})
