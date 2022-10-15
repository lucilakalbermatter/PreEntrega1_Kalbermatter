//Declaración de variables generales
let numero = 0
let cantidad = 0
let precio = 0
let preciofinal = 0
let nombreVoucher = ""
let comprar = false
let string_productos = ""
let ArrayProductos = []
let sumaTotal = 0


class Producto{
    constructor(numero, nombre, precio, cantidad){
        this.numero = numero
        this.nombre = nombre
        this.precio = precio
        this.cantidad = cantidad
    }
}


function saludar() {
    let nombre = prompt("Ingrese su nombre por favor:")
    alert("Bienvenid@ a Allonutrición " + nombre + " !")
}

saludar()


function productosDisponibles() {
    for (let producto of productos){
        string_productos += `Nº ${producto.numero} : ${producto.titulo} , incluye: \n
        ${producto.detalle1}\n
        ${producto.detalle2}\n
        Precio: $ ${producto.precio}\n`
    }
    alert(string_productos)
}


// Proceso de compra
do{
    comprar = confirm("Si desea comprar pulse 'OK', caso contrario 'Cancel'")
    if(comprar == false){
        break
    }else{
        productosDisponibles()
        procesoDeCompra()
        cantidadTotal()
        precioIndividualProducto()
    }

}
while (comprar == true)


function procesoDeCompra() {
    numero = parseInt(prompt("Ingresa el numero de plan o recetario que desea comprar(1 al 6):"))

    if (numero > 0 && numero < 7) {
        confirm("Ha seleccionado el número " + numero)
    } else {
        alert("Ingresa valores numéricos del 1 al 6, por favor")
        procesoDeCompra()
    }
}

// Cálculo de la cantidad total a comprar
function cantidadTotal() {
    cantidad = parseInt(prompt("Ingresa la cantidad que desea comprar"))
    confirm("Ud. ha seleccionado la cantidad de: " + cantidad)
}

// Preguntamos si tiene algun voucher de descuento (Código: NUTRI22)
function descuento() {
    let voucher = prompt("Tiene algún voucher de descuento? Responda SI o NO")
    voucher = voucher.toLowerCase()

    if (voucher == "si") {
        nombreVoucher = prompt("Por favor escriba el nombre del voucher:")
        nombreVoucher = nombreVoucher.toLowerCase()
        if (nombreVoucher == "nutri22" && nombreVoucher !== "") {
            return true
        } else if (nombreVoucher !== "nutri22") {
            alert("El voucher es incorrecto")
        } else {
            return false
        }
    }
}

// Cálculo del precio inidividual en función de descuentos
function precioIndividualProducto() {

    let myVoucher = descuento()
    const descuento_voucher = 0.85 //Descuento del 15%;
    let resultado = productos.find(prod => prod.numero === numero)
    
    if (myVoucher == true) {
        precio = resultado.precio * cantidad * descuento_voucher
        console.log(resultado.precio)
        ArrayProductos.push(new Producto(numero, resultado.titulo , precio, cantidad))
        console.table(ArrayProductos)

        precioTotalCarrito()
        alert("¡Se ha agregado correctamente al carrito!\n La suma total de la compra es : " + sumaTotal)

    } else {
        precio = resultado.precio * cantidad
        ArrayProductos.push(new Producto(numero, resultado.titulo , precio, cantidad))
        console.table(ArrayProductos)

        precioTotalCarrito()
        alert("¡Se ha agregado correctamente al carrito!\n La suma total de la compra es : " + sumaTotal)
    }
}

// Cálculo del precio total del carrito
function precioTotalCarrito() {
    sumaTotal = 0
    ArrayProductos.forEach(prod => {
        sumaTotal += prod.precio
    })
}



