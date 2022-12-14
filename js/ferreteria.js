/* ---------------------- Funcionalidad para ferreteria --------------------- */
class Productos {

  constructor(id, precio, titulo, descripcion, imagen, tipos, cantidad) {

    this.id = id;
    this.precio = precio;
    this.titulo = titulo.toUpperCase();
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.tipos = tipos;
    this.cantidad = cantidad || 1; //Tomara el 1 porque cantidad esta vacío


  }
  addCantidad() {

    this.cantidad++;

  }
  subTotal() {

    return this.precio * this.cantidad;

  }
  agregarCantidad(valor) {

    this.cantidad += valor; //permite agregar el valor en cantidades y restar el valor

  }
  reiniciarCantidad(){

    this.cantidad = 1;  //seteamos la cantidad en 1

  }

}


let tarjetas = [];


let tipos = ["Trincheta", "Tijera", "Disco", "Electrodo"]

let divTarjetas = document.getElementById("grillaFerre")

let buscarProducto = document.getElementById("inputBuscar")


function tarjetasUI(lista) {

  divTarjetas.innerHTML = "";

  for (const tarjeta of lista) {

    let div = document.createElement("div");

    div.classList.add("tarjetaFerreteria")

    div.innerHTML = `<div class="imgFerreteria">
        <img src = "${tarjeta.imagen}" class="imgFerreteria">
        </div>
        <div class="tarjetaInfo">
          <p class="text-title">${tarjeta.titulo}</p>
          <p class="textCuerpo">${tarjeta.descripcion}</p>
        </div>
        <div class="tarjetaFooter">
        <span class="tarjetaTitle">$  ${tarjeta.precio} C/U</span> 
        <div class="tarjetaButton">
          <button id= "${tarjeta.id}" class = "btnCompra">Agregar</button>
        </div>
      </div></div>`


    divTarjetas.append(div)

  }

  seleccionarProducto();

}




tarjetasUI(tarjetas)


//Seleccionamos el producto (boton)

function seleccionarProducto() { //creamos una función porque la utilizaremos en varias partes del código

  let iconos = document.getElementsByClassName("btnCompra"); //seleccionamos al elemento por la clase

  for (const icono of iconos) {  //por cada icono que recorra le agrego una funcionalidad

    icono.addEventListener("click", function () { //al icono le agregamos la propiedad addEventListener


      let seleccion = carrito.find(producto => producto.id == this.id); //hacemos un find para validar que no se repita en el carrito


      if (seleccion) {

        seleccion.addCantidad(); //en vez de agregarlo de nuevo le agrego la cantidad

      } else {

        seleccion = tarjetas.find(producto => producto.id == this.id) //si no lo puso en el carrito, lo buscara al producto y cuando lo obtiene lo guarda en el carrito
        carrito.push(seleccion)

      }

      localStorage.setItem("Carrito", JSON.stringify(carrito)) //llamamos al localStorage

      carritoHTML(carrito)

      Toastify({

        text: `Se agrego el producto ${seleccion.titulo} al carrito `,

        avatar: "../img/carrito-de-compras.png",

        duration: 2000,

        gravity: "top",

        background: '#fff',

        gravity: "bottom",

        style: {
          background: "black",
        },

      }).showToast();


    })


  }


}



//Creamos una funcion carritoHTML para que se vaya sumando los elementos en el carrito
function carritoHTML(lista) {

  cantidadCarrito.innerHTML = lista.length;
  productosCarrito.innerHTML = "";

  for (const producto of lista) {

    let product = document.createElement("div");
    product.innerHTML = `
    <img class="imagenCarrito" src="${producto.imagen}" height="200"> 
    <h3>${producto.titulo}</h3>
    <h3 class="separar">Precio: $ ${producto.precio}</h3>
    <h3 class="separar2">Cantidad:  ${producto.cantidad}</h3>
    <h3 class="separar3">Subtotal: $ ${producto.subTotal()}</h3>

     
    <a id="${producto.id} " class="btn btn-dark btn-add btn-sm"><i class="fa-solid fa-plus"></i></a>
    <a id="${producto.id} " class="btn btn-dark btn-substraer btn-sm"><i class="fa-solid fa-minus"></i></a>
    <a id="${producto.id} " class="btn btn-dark btn-delete btn-sm"><i class="fa-solid fa-trash"></i></a>
   

    <hr class="colorHr">

    ` //El subtotal es un metodo

    productosCarrito.append(product);



  }
  sumarCarrito(); //llamamos a la función para que se muestre en el html


  //Query selector para cada una de las clases de las etiquetas a 

  document.querySelectorAll(".btn-delete").forEach(boton => boton.onclick = eliminarCarrito);
  document.querySelectorAll(".btn-add").forEach(boton => boton.onclick = addCarrito);
  document.querySelectorAll(".btn-substraer").forEach(boton => boton.onclick = subCarrito);

}


//funcion para eliminar productos del carrito

function eliminarCarrito() {

  let posicion = carrito.findIndex(producto => producto.id == this.id); //recorre el array completo y le pasamos el id
  carrito.splice(posicion, 1); //eliminar una posicion en especifico y eliminamos solo uno, splice es un metodo destructivo
  carritoHTML(carrito);
  localStorage.setItem("Carrito", JSON.stringify(carrito)); //pisamos el valor viejo con el nuevo valor con el nuevo array sin ningun elemento

  Toastify({

    text: "Producto eliminado",

    duration: 2000,

    position: "left",


    style: {
      background: "black",
    },

  }).showToast();

}


//funcion para sumar la cantidad del producto
function addCarrito() {

  let producto = carrito.find(producto => producto.id == this.id) //find porque solo queremos el objeto

  producto.agregarCantidad(1);

  this.parentNode.children[3].innerHTML = "Cantidad: " + producto.cantidad; //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

  this.parentNode.children[4].innerHTML = "Subtotal: " + producto.subTotal(); //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

  sumarCarrito();

  localStorage.setItem("Carrito", JSON.stringify(carrito)); //modificamos el localstorage



}


function subCarrito() {

  let producto = carrito.find(producto => producto.id == this.id) //find porque solo queremos el objeto

  if (producto.cantidad > 1) { //tiene que ser mayor de uno para restar


    producto.agregarCantidad(-1) //decrementar la cantidad

    this.parentNode.children[3].innerHTML = "Cantidad: " + producto.cantidad; //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

    this.parentNode.children[4].innerHTML = "Subtotal: " + producto.subTotal(); //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

    sumarCarrito();

    localStorage.setItem("Carrito", JSON.stringify(carrito)); //modificamos el localstorage


  } else {


    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se puede agregar 0 cantidades!',
    })


  }



}




//Buscamos el producto con el addEventListener
buscarProducto.addEventListener("input", function () {

  const encontrados = tarjetas.filter(producto => producto.titulo.includes(this.value.toUpperCase()))
  console.log(encontrados);


  if (encontrados.length > 0) {

    tarjetasUI(encontrados)

  } else {

    divTarjetas.innerHTML =
      `<h1 class="txtNodispo">Producto no disponible</h1>
    <img class="noDispo" src=../img/72gi.gif>`

  }


})


//Alert confirmar del carrito para que salga un alert que diga (fetch)

confirmamos.onclick = () => {

  enviarDatos();

}


//funcion para sumar el total del carrito para ferreteria

function sumarCarrito() {

  //Creamos variable total, a carrito le pasamos reduce para que recorra y sume cada uno de los elementos que hay, += sumale lo que ya hay y suma producto.subTotal() y decirle en cuanto va a empezar la variable que quiero sumar

  let total = carrito.reduce((totalCompra, producto) => totalCompra += producto.subTotal(), 0);
  //no tenemos que pasarle llaves porque dara undefined, las llaves no puede interpetrar donde empieza y termina la estructura

  totalCarritoInterfaz.innerHTML = `Total: $ ${total}`; //modificamos su html y concatenamos el precio total

  return total; //retornamos para que se actualice la interfaz

}



//Guardar el carrito para que no tengamos que estar recargando, para que el usuario no pierda lo del carrito

if ("Carrito" in localStorage) { //si existe en el localstorage

  let guardados = JSON.parse(localStorage.getItem("Carrito")); //lo guardamos en el localstorage, parse para pasar de JSON  a objeto

  for (const generico of guardados) { //recorremos

    carrito.push(new Productos(generico.id, generico.precio, generico.titulo, generico.descripcion, generico.imagen, generico.tipos, generico.cantidad)); //guardar de nuevo en el carrito

  }
  carritoHTML(carrito); //lo mostramos


}



//Función para cargar datos para ferreteria con async await, le decimos a js que es una función asincrona y todo lo que se trabaja dentro es asincrono

async function cargarDatos() {

  //Se ocupa la palabra await para simular sincronia, await espera a que la operacion termine para pasar a la siguiente actividad
  const pedido = await fetch("../json/ferreteria.json"); //guardamos los datos de los productos de ferreteria
  const datosJson = await pedido.json(); //datosJson para transformar a json

  for (const generico of datosJson) { //recorremos en un for of y lo pasamos a objeto literal

    tarjetas.push(new Productos(generico.id, generico.precio, generico.titulo, generico.descripcion, generico.imagen, generico.tipos, generico.cantidad))

  }

  tarjetasUI(tarjetas) //generación de la interfaz

}

cargarDatos(); //llamamos a la función cargarDatos




//Función para realizar un POST para ferreteria (fetch necesita la url y el segundo parametro es opcional)


function enviarDatos(lista) {

  fetch("https://jsonplaceholder.typicode.com/posts", {

      method: "POST", //metodo POST
      body: JSON.stringify({
        carrito: lista,
        userID: 20
      }), //le puedo mandar cualquier tipo de información al body pero primero lo transformamos en JSON
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      } //informacion que necesito enviar para ver que información es (tipo de contenido,charset)


    }).then((respuesta) => {
      return respuesta.json()
    }) //primero lo pasamos a JSON
    .then((datos) => { //para recibir los datos

      Swal.fire(
        'Compra realizada',
        `Compra nro ${datos.id} realizada correctamente`, //si sale todo bien dira compra realizada
        'success'
      )
      vaciarCarrito(); //cuando apretemos confirmar el carrito se va a vaciar

    }).catch((datos) => {


      Swal.fire(
        'Compra rechazada',
        `Compra nro ${datos.id} fue rechadaza`, //si sale todo mal dira compra rechazada
        'error'
      )


    })

}




//Función para vaciar el carrito completo de ferreteria

function vaciarCarrito() {


  //recorremos el carrito con un forEach y cada producto le pasamos el metodo reiniciarCarrito

  carrito.forEach((producto) => producto.reiniciarCantidad());

  //borramos el localstorage

  localStorage.clear();

  //borramos el array carrito con splice

  carrito.splice(0, carrito.length);

  //llamamos a la función para generar la interfaz vacía

  carritoHTML(carrito);

  

}


