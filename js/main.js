
// Variables
const carrito = document.querySelector('#carrito');
const listaZapatillas = document.querySelector('#lista-zapatillas');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const comprarBtn= document.querySelector("#compra")
let articulosCarrito = [];
let totalCarrito=0;
let inicio= 100;
let fin=999;
let numeroRandom= inicio+ Math.floor(Math.random()*fin);


cargarEventListeners();

function cargarEventListeners() {
     
     listaZapatillas.addEventListener('click', agregarZapatilla);

     carrito.addEventListener('click', eliminarSneaker);

     comprarBtn.addEventListener('click', finalizarCompra);

     vaciarCarritoBtn.addEventListener('click', vaciarCarritoNotificacion);

     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse( localStorage.getItem('articulosCarrito') ) || []  ;
          console.log(articulosCarrito);
          carritoHTML();
     });
}

function calcularTotalCarrito() {
     totalCarrito = articulosCarrito.reduce((anterior, articulo) => { return anterior + (articulo.precio * articulo.cantidad) }, 0);
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
               <td>${sneaker.precio*sneaker.cantidad}</td>
               <td>${sneaker.cantidad} </td>
               <td>
                    <a href="#" class="borrar-sneaker cross" data-id="${sneaker.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     document.querySelector('#total-carrito').innerHTML = '$' + totalCarrito;

     sincronizarStorage();
}

function vaciarCarrito() {
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
          vaciarStorage();
      }

      calcularTotalCarrito();
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

function finalizarCompra(){
     Swal.fire({
          title:"Desea finalizar la compra? Se le asignara un numero de pedido para retirar en el local",
          showDenyButton:true,
          showCancelButton:false,
          confirmButtonText:"Si",
          denyButtonText:"No",
     }).then((result)=>{
          if(result.isConfirmed){
               Swal.fire({
                    title:"Muchas Gracias!",
                    text:"Su numero de pedido es: N°" + numeroRandom,
                    showCancelButton: true,
                    confirmBUttonColor:"#3085d6",
                    cancelButtonColor:"#d33",
                    confirmButtonText:"Finalizar"
               }).then((result)=>{
                    if (result.isConfirmed){
                         vaciarCarrito()
                    }
               })
          }
     })
}

const section=document.getElementById("lista-zapatillas")

fetch("./js/data.json")
.then(response=>response.json())
.then(data=>{
data.forEach(post=>{
     const div=document.createElement("div");
     div.innerHTML=`
     <div class="card" style="width: 18rem;">
     <img src="${post.imagen}"  class="card-img-top" alt="...">
     <div class="card-body">
        <h4>${post.nombre}</h4>
       <p class="card-text año">${post.año}</p>
       <p class="card-text precio">${post.precio}</p>
       <a href="#" class="agregar-carrito agregar-css" data-id="${post.id}">Agregar Al Carrito</a>
     </div>
   </div>
     
     `;
     section.append(div)
});
})

