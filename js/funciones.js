function saludar() {
    let nombre = prompt("Ingrese su nombre por favor:")
    alert("Bienvenid@ a Allonutrición " + nombre + " !")
}

function servicios() {
    let serviciosDisponibles = "Planes y recetarios disponibles: \n" +
        "Nº 1: Plan Inicio \n" +
        "Nº 2: Plan Pro \n" +
        "Nº 3: Plan Expert \n" +
        "Nº 4: Receta Vegana \n" +
        "Nº 5: Receta Vegetariana \n" +
        "Nº 6: Receta Carnívora \n"

    alert(serviciosDisponibles)
}

// Proceso de compra
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

// Cálculo del precio total en función de descuentos
function precioTotal() {

    let myVoucher = descuento()
    const descuento_voucher = 0.85 //Descuento del 15%
    const producto_precio = { 1: 60, 2: 108, 3: 168, 4: 10, 5: 10, 6: 19 };

    for (let x in producto_precio) {
        if (numero == x) {
            if (myVoucher == true) {
                precioFinal = producto_precio[x] * cantidad * descuento_voucher
                alert("El precio con descuento es de: " + precioFinal)
            } else {
                precioFinal = producto_precio[x] * cantidad
                alert("El precio es de: " + precioFinal)
            }
        }
    }
}








