const container = document.querySelector("div.products-container")
const carrito = []

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
                    <button class="button-buy" id="${producto.titulo}">Comprar</a>
                </div>
            </div>`        
}
    

const activarBotonesAdd = ()=> {
    const botonesAdd = document.querySelectorAll(".button-buy")
          botonesAdd.forEach(btn => {
            btn.addEventListener("click", ()=> {
                console.log(btn.id)
                agregarAlCarrito(btn.id)
            })
          })
}


const cargarMisProductos = ()=> {
    container.innerHTML = ""
    productos.forEach(producto => {
        container.innerHTML += retornoCard(producto)
    })
    activarBotonesAdd()
}
cargarMisProductos()


const agregarAlCarrito = (titulo)=> {
    let resultado = productos.find(prod => prod.titulo === titulo)
    console.log(resultado)
        if (resultado !== undefined) {
            carrito.push(resultado)
        }
}