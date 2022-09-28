/* //Variables
let totalFinal=0;
//Funciones


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


while (sneaker !=5){
    sumaFinal();
    elegirSneaker()
} */

// Variables
const carrito = document.querySelector('#carrito');
const listaZapatillas = document.querySelector('#lista-zapatillas');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];


cargarEventListeners();

function cargarEventListeners() {
     
     listaZapatillas.addEventListener('click', agregarZapatilla);

     carrito.addEventListener('click', eliminarSneaker);

    
     vaciarCarritoBtn.addEventListener('click', vaciarCarritoNotificacion);

     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('articulosCarrito') ) || []  ;
          console.log(articulosCarrito);
          carritoHTML();
     });
}



function agregarZapatilla(e) {
     e.preventDefault();
     
     if(e.target.classList.contains('agregar-carrito')) {
          const sneaker = e.target.parentElement.parentElement;
          
     leerDatosSneaker(sneaker);
     }
}


function leerDatosSneaker(sneaker) {
     const infoSneaker = {
          imagen: sneaker.querySelector('img').src,
          titulo: sneaker.querySelector('h4').textContent,
          año: sneaker.querySelector('.año').textContent,
          precio: sneaker.querySelector('.precio').textContent,
          /* total: ()=>{
               
          }, */
          id: sneaker.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( sneaker => sneaker.id === infoSneaker.id ) ) { 
          const sneakers = articulosCarrito.map( sneaker => {
               if( sneaker.id === infoSneaker.id ) {
                    sneaker.cantidad++;
                     return sneaker;
                } else {
                     return sneaker;
             }
          })
          articulosCarrito = [...sneakers];
     }  else {
          articulosCarrito = [...articulosCarrito, infoSneaker];
     }

     console.log(articulosCarrito)


     carritoHTML();
}

function eliminarSneaker(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-sneaker') ) {
          const sneakerId = e.target.getAttribute('data-id')
          
          articulosCarrito = articulosCarrito.filter(sneaker => sneaker.id !== sneakerId);

          carritoHTML();
     }
}

function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(sneaker => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${sneaker.imagen}" width=100>
               </td>
               <td>${sneaker.titulo}</td>
               <td>${sneaker.precio}</td>
               <td>${sneaker.cantidad} </td>
               <td>
                    <a href="#" class="borrar-sneaker" data-id="${sneaker.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     sincronizarStorage();
}

function vaciarCarrito() {
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
          vaciarStorage();
      }
}

function sincronizarStorage() {
     localStorage.setItem('articulosCarrito', JSON.stringify(articulosCarrito));
}

function vaciarStorage() {
     localStorage.clear();
     location.reload();
}

function vaciarCarritoNotificacion(){
     Swal.fire({
          title: "Desea vaciar el carrito?",
          showDenyButton:true,
          showCancelButton:false,
          confirmButtonText:"Si",
          denyButtonText:"No",
     }).then((result) =>{
          if(result.isConfirmed){
               vaciarCarrito()
          }
     })
}