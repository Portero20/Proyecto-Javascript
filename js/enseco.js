/* ----------------- Funcionalidad para construcción en seco ---------------- */
class Enseco {

  constructor(id, precio, titulo, descripcion, imagen, tipos, cantidad) {

    this.id = id;
    this.precio = precio;
    this.titulo = titulo.toUpperCase();
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.tipos = tipos;
    this.cantidad = cantidad || 1; //Tomara el 1 porque cantidad esta vacío


  }
  addCantidad() { //incrementar la cantidad

    this.cantidad++;

  }
  subTotal() { //multiplica el precio por la cantidad

    return this.precio * this.cantidad;

  }
  agregarCantidad(valor) { //sirve para sumar y restar

    this.cantidad += valor;

  }
  reiniciamosCantidad(){

    this.cantidad = 1;  //seteamos la cantidad en 1

  }

}


let seco = [];


let tipos = ["Solera", "Montante", "Cinta", "Placa"]

let divTarjetas = document.getElementById("grillaFerre")

let buscarProducto = document.getElementById("inputBuscar")


function ensecoUI(lista) {

  divTarjetas.innerHTML = "";

  for (const enseco of lista) {

    let div = document.createElement("div");

    div.classList.add("tarjetaFerreteria")

    div.innerHTML = `<div class="imgFerreteria">
        <img src = "${enseco.imagen}" class="imgFerreteria">
        </div>
        <div class="tarjetaInfo">
          <p class="text-title">${enseco.titulo}</p>
          <p class="textCuerpo">${enseco.descripcion}</p>
        </div>
        <div class="tarjetaFooter">
        <span class="tarjetaTitle">$  ${enseco.precio} C/U</span> 
        <div class="tarjetaButton">
        <button id= "${enseco.id}" class = "btnCompra">Agregar</button>
        </div>
      </div></div>`


    divTarjetas.append(div)

  }
  seleccionamosProducto();

}




ensecoUI(seco) //Lo mostramos en el HTML




//Buscamos el producto de construcción en seco
buscarProducto.addEventListener("input", function () {  //llamamos al evento input y le pasamos tambien una función

  //Buscamos por el nombre del producto, filter para que me busque uno o más productos, le pasamos includes para preguntar si existe el producto, en this.value estan los productos
  const encontrados = seco.filter(producto => producto.titulo.includes(this.value.toUpperCase())) 

  if (encontrados.length > 0) {  //encontrados.length es mayor a cero quiere decir que si hay algun valor y llamamos a la función

    ensecoUI(encontrados)

  } else {  //en caso de que no se encuentre el producto

    divTarjetas.innerHTML =
      `<h1 class="txtNodispo">Producto no disponible</h1>
    <img class="noDispo" src=../img/72gi.gif>`

  }



})




//Seleccionamos el producto en seco (boton)

function seleccionamosProducto() {

  let botones = document.getElementsByClassName("btnCompra")

  for (const boton of botones) {


    boton.addEventListener("click", function () {


      let seleccionamos = carritoEnseco.find(producto => producto.id == this.id) //find para buscar por el id (find busca un unico resultado)



      if (seleccionamos) {

        seleccionamos.addCantidad();  //Me suma la cantidad solamente

      } else {

        seleccionamos = seco.find(producto => producto.id == this.id)  //me busca el producto por el id 
        carritoEnseco.push(seleccionamos)


      }

      localStorage.setItem("CarritoSeco", JSON.stringify(carritoEnseco)) //Actualizamos el localStorage

      carritoMostrar(carritoEnseco)  //llamamos a la función

      Toastify({

        text: `Se agrego el producto ${seleccionamos.titulo} al carrito `,

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




//Creamos una funcion carritoMostrar para que se vaya sumando los elementos en el carrito y mostrando

function carritoMostrar(lista) { //le pasamos como parametro la lista de productos que esta en el carrito

  cantidadEnseco.innerHTML = lista.length; //lista.length porque length tiene la cantidad de posiciones que tiene el carrito
  productosCarritoSeco.innerHTML = ""; //borramos lo que ya hay


  for (const product of lista) { //recorremos


    let producto = document.createElement("div")

    producto.innerHTML = ` 
    <img class="imagenCarrito" src="${product.imagen}" height="200"> 
    <h3>${product.titulo}:</h3>
    <h3 class="separar">Precio: $ ${product.precio}</h3>
    <h3 class="separar2">Cantidad:  ${product.cantidad}</h3>
    <h3 class="separar3">Subtotal: $ ${product.subTotal()}</h3>
    

    <a id="${product.id} " class="btn btn-dark btn-añadir btn-sm"><i class="fa-solid fa-plus"></i></a>
    <a id="${product.id} " class="btn btn-dark btn-restar btn-sm"><i class="fa-solid fa-minus"></i></a>
    <a id="${product.id} " class="btn btn-dark btn-borrar btn-sm"><i class="fa-solid fa-trash"></i></a>

    <hr class="colorHr">

    `


    productosCarritoSeco.append(producto);



  }
  sumardelCarrito(); //agregamos la llamada a la función para que se muestre el total

  //Query selector para cada una de las clases de las etiquetas a, hacer un forEach con una función flecha y por cada boton le va a agregar la propiedad onClick y pasarle una función

  document.querySelectorAll(".btn-borrar").forEach(boton => boton.onclick = borrardelCarrito);
  document.querySelectorAll(".btn-añadir").forEach(boton => boton.onclick = añadirCarrito);
  document.querySelectorAll(".btn-restar").forEach(boton => boton.onclick = restarCarrito);

}





//Funcion borrar del carrito
function borrardelCarrito() {

  let posicion = carritoEnseco.findIndex(producto => producto.id == this.id); //recorre el array completo y le pasamos el id
  carritoEnseco.splice(posicion, 1); //eliminar una posicion en especifico y eliminamos solo uno, splice es un metodo destructivo
  carritoMostrar(carritoEnseco);
  localStorage.setItem("CarritoSeco", JSON.stringify(carritoEnseco)); //pisamos el valor viejo con el nuevo valor con el nuevo array sin ningun elemento

  Toastify({ //toastify para mostrar el producto eliminado

    text: "Producto eliminado",

    duration: 2000,

    position: "left",


    style: {
      background: "black",
    },

  }).showToast();

}


//funcion para sumar la cantidad del producto
function añadirCarrito() {

  let producto = carritoEnseco.find(producto => producto.id == this.id) //find porque solo queremos el objeto

  producto.agregarCantidad(1);

  this.parentNode.children[3].innerHTML = "Cantidad: " + producto.cantidad; //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

  this.parentNode.children[4].innerHTML = "Subtotal: " + producto.subTotal(); //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

  sumardelCarrito(); //lo mostramos para que se modifique el total

  localStorage.setItem("CarritoSeco", JSON.stringify(carritoEnseco)); //modificamos la cantidad en el localstorage



}


//Funcion restar la cantidad del carrito
function restarCarrito() {

  let producto = carritoEnseco.find(producto => producto.id == this.id) //find porque solo queremos el objeto

  if (producto.cantidad > 1) { //tiene que ser mayor de uno para restar


    producto.agregarCantidad(-1) //decrementar la cantidad

    this.parentNode.children[3].innerHTML = "Cantidad: " + producto.cantidad; //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

    this.parentNode.children[4].innerHTML = "Subtotal: " + producto.subTotal(); //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

    sumardelCarrito();

    localStorage.setItem("CarritoSeco", JSON.stringify(carritoEnseco)); //modificamos el localstorage


  } else {  //si no mostrara un alert que diga que no se puede agregar 0 cantidades


    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se puede agregar 0 cantidades!',
    })


  }

}



//Alert de compra confirmada cuando se haga click en el boton (fetch)

confirm.onclick = () => {

  enviarLosDatos(); //llamamos a la función

}



//funcion para sumar el total del carrito para construcción en seco

function sumardelCarrito() {

  //Creamos variable totalEnseco, a carrito le pasamos reduce para que recorra y sume cada uno de los elementos que hay, producto seria el producto que estoy recorriendo, += sumale lo que ya hay y suma producto.subTotal() y decirle en cuanto va a empezar la variable que quiero sumar

  let totalEnseco = carritoEnseco.reduce((totalCompra, producto) => totalCompra += producto.subTotal(), 0)
  //no tenemos que pasarle llaves porque dara undefined, las llaves no puede interpetrar donde empieza y termina la estructura

  totalCarritoSeco.innerHTML = `Total: $ ${totalEnseco}`; //modificamos su html y concatenamos el precio total

  return totalEnseco; //retornamos para que se actualice la interfaz

}


//Guardar el carrito para que no tengamos que estar recargando, para que el usuario no pierda lo del carrito

if ("CarritoSeco" in localStorage) { //si existe en el localstorage

  let guardados = JSON.parse(localStorage.getItem("CarritoSeco")); //lo guardamos en el localstorage

  for (const generico of guardados) { //recorremos

    carritoEnseco.push(new Enseco(generico.id, generico.precio, generico.titulo, generico.descripcion, generico.imagen, generico.tipos, generico.cantidad)); //guardar de nuevo en el carrito

  }
  carritoMostrar(carritoEnseco); //lo mostramos


}


//Función para cargar datos enseco con async (forma mas simplificada de escribir el fetch)

async function cargarDatosSeco() {

  //Se ocupa la palabra await para simular sincronia, await espera a que la operacion termine para pasar a la siguiente actividad
  const pedido = await fetch("../json/enseco.json"); //lo traemos de manera local
  const datosJson = await pedido.json(); // lo transformamos en json

  for (const generico of datosJson) { //lo recorremos con un for of

    seco.push(new Enseco(generico.id, generico.precio, generico.titulo, generico.descripcion, generico.imagen, generico.tipos, generico.cantidad)) //pusheamos en un nuevo array

  }

  ensecoUI(seco, "productosEnseco")

}

cargarDatosSeco(); //lo mostramos en la interfaz de construcción en seco




//Función para realizar un POST para en seco (enviar datos)

function enviarLosDatos(lista) { 

  fetch("https://jsonplaceholder.typicode.com/posts", {

      method: "POST", //metodo POST
      body: JSON.stringify({
        carrito: lista,
        userID: 30
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
      vaciarElCarrito(); //llamamos a la función vaciarElCarrito para cuando apriete confirmar vacie el carrito


    }).catch((datos) => {


      Swal.fire(
        'Compra rechazada',
        `Compra nro ${datos.id} fue rechazada`, //si sale todo mal dira compra rechazada
        'error'
      )


    })

}




//Función para vaciar el carrito de ferreteria

function vaciarElCarrito() {


  //recorremos el carrito con un forEach y cada producto le pasamos el metodo reiniciarCarrito

  carritoEnseco.forEach((producto) => producto.reiniciamosCantidad());

  //borramos el localstorage

  localStorage.clear();

  //borramos el array carrito con splice

  carritoEnseco.splice(0, carritoEnseco.length);

  //llamamos a la función para generar la interfaz vacía

  carritoMostrar(carritoEnseco);


  
}