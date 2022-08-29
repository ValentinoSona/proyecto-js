//Mensaje de bienvenida

let nombre= prompt("ingrese su nombre");

alert("Bienvenido " + nombre + ", a la tienda de SneakerT👟, porfavor seleccione la silueta que desea adquirir. Cualquier compra mayor a $65.000 tendra un descuento del 10%");

//Variables

let sneaker=0;
let totalFinal=0;

//Funciones
function elegirSneaker() {
    sneaker = parseInt(prompt("ingrese el numero del sneaker que desea comprar: /N 1- Retro 1 $42.000/N 2- NikeSB low $12.000/N 3- Air force 1 $25.000/N 4- Retro 3 $55.000/N 5- Listo"));
}

function sumaFinal() {
    switch (sneaker) {
        case 1:
            alert("Usted selecciono las Jordan Retro 1, se sumara el valor de $42.000 a su compra");
            totalFinal += 42000;
            break;
        case 2: 
            alert("Usted selecciono las NikeSB low, se sumara el valor de $12.000 a su compra");
            totalFinal += 12000;
            break;
        case 3:
            alert("Usted selecciono las Air Force 1, se sumara el valor de $25.000 a su compra");
            totalFinal += 25000;
            break;
        case 4:
            alert("Usted selecciono las Jordan Retro 3, se sumara el valor de $55.000 a su compra");
            totalFinal += 55000;
        default:
            alert("Opcion no valida, porfavor ingrese un numero del 1-4 para poder seguir con su compra");
            break;
    }
    alert("su total hasta el momento es de: $" + totalFinal);
    return totalFinal;
}

function descuento(){
    if (totalFinal >= 65000) {
        totalFinal= totalFinal -(totalFinal*0.1);
        alert("Debido a que su compra supera los $65000 se le aplicara un descuento del 10%");
        return totalFinal;
    }
}

elegirSneaker();

while (sneaker !=5){
    sumaFinal();
    elegirSneaker()
}

descuento()

alert("El costo final de su compra es de: $" + totalFinal);