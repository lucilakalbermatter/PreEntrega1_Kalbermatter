//Se ejecutan todas las funciones juntas
function ejecutarFunciones() {
    saludar()

    if (confirm("Si desea iniciar el proceso de compra pulse 'OK', caso contrario 'Cancel'")) {
        servicios()
        procesoDeCompra()
        cantidadTotal()
        precioTotal()
    }
}

ejecutarFunciones();