//Mensaje de bienvenida

let nombre= prompt("ingrese su nombre");

alert("Bienvenido " + nombre + ", a la tienda de SneakerT👟, porfavor seleccione la silueta que desea adquirir. Cualquier compra mayor a $65.000 tendra un descuento del 10%");

//Variables

let sneaker=0;
let totalFinal=0;
const carrito =[]

//Funciones
function elegirSneaker() {
    sneaker = parseInt(prompt("ingrese el numero del sneaker que desea comprar: /N 1- Retro 1 $42.000/N 2- NikeSB low $12.000/N 3- Air force 1 $25.000/N 4- Retro 3 $55.000/N 5- Listo"));
}

function zapatilla(modelo,precio,año) {
    this.modelo=modelo;
    this.precio=precio;
    this.año=año;
}

const retro1= new zapatilla("Jordan Retro 1", 42000, 2014);
const nikesb= new zapatilla("NikeSB low", 12000, 2004);
const airforce1= new zapatilla("Air Force 1", 25000, 2010);
const retro3= new zapatilla("Jordan Retro 3", 55000, 2017);

function agregarCarrito(zapatilla) {
    carrito.push(zapatilla)
}

function sumaFinal() {
    switch (sneaker) {
        case 1:
            alert("Usted selecciono las Jordan Retro 1, se sumara el valor de $42.000 a su compra");
            totalFinal += retro1.precio;
            agregarCarrito(retro1)
            break;
        case 2: 
            alert("Usted selecciono las NikeSB low, se sumara el valor de $12.000 a su compra");
            totalFinal += nikesb.precio;
            agregarCarrito(nikesb)
            break;
        case 3:
            alert("Usted selecciono las Air Force 1, se sumara el valor de $25.000 a su compra");
            totalFinal += airforce1.precio;
            agregarCarrito(airforce1)
            break;
        case 4:
            alert("Usted selecciono las Jordan Retro 3, se sumara el valor de $55.000 a su compra");
            totalFinal += retro3.precio;
            agregarCarrito(retro3)
        default:
            alert("Opcion no valida, porfavor ingrese un numero del 1-4 para poder seguir con su compra");
            break;
    }
    alert("su total hasta el momento es de: $" + totalFinal);
    return totalFinal;
}

function sumarZapatillas() {
    const total = carrito.reduce(
      (acc, el) => (acc += el.precio),0
    );
    const descuento = total - total * 0.1;
    if (total > 65000) {
        alert("Usted realizo una compra mayor a $65.000, por lo que tiene un descuento del 10% y debe pagar $"+ descuento);
        console.log("Usted realizo una compra mayor a $65.000, por lo que tiene un descuento del 10% y debe pagar $"+ descuento);
    } else {
        alert("Su total final es de: $", total);
        console.log("Su total final es de: $", total);
    }
  }

elegirSneaker();

while (sneaker !=5){
    sumaFinal();
    elegirSneaker()
}

sumarZapatillas();

console.log(carrito);

