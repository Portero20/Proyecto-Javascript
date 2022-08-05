//Funcionalidad para construcción en seco
class Enseco {

  constructor(id, precio, titulo, descripcion, imagen, tipos, cantidad) {

    this.id = id;
    this.precio = precio;
    this.titulo = titulo;
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

    this.cantidad += valor;

  }

}


let seco = [];


let tipos = ["Solera", "Montante", "Cinta", "Placa"]


//Ferreteria productos
seco.push(new Enseco(1, 570, "Durlock Solera".toUpperCase(), "35 BAJA C/PEST X 2600MM PERFIL DE ACERO GALVANIZADO", "../img/solera-gal-35.webp", tipos[0]))
seco.push(new Enseco(2, 650, "Durlock Montante".toUpperCase(), "34X35X2600 MM PARA CIELORRASOS", "../img/durockmontante.jpg", tipos[1]))
seco.push(new Enseco(3, 780, "Durlock Solera".toUpperCase(), "70 BAJA C/PEST X 2600MM DE ALUMINIO", "../img/solera70.jpg", tipos[0]))
seco.push(new Enseco(4, 850, "Durlock Montante".toUpperCase(), "69X35X2600 MM ACERO ZINCADA ", "../img/montante69.jpg", tipos[1]))
seco.push(new Enseco(5, 2600, "Cinta Microperforada".toUpperCase(), "Rollo de 160M DE USO SIMPLE PARA JUNTA DE PLACAS", "../img/cintamicro.webp", tipos[2]))
seco.push(new Enseco(6, 1600, "Durlock Placa".toUpperCase(), "12.5MM EST REF 1.20 X 2.40M CON RESISTENCIA AL FUEGO", "../img/placadurlock.jpg", tipos[3]))

console.log(seco);




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
buscarProducto.addEventListener("input", function () {

  const encontrados = seco.filter(producto => producto.titulo.includes(this.value.toUpperCase()))


  if (encontrados.length > 0) {

    ensecoUI(encontrados)

  } else {

    divTarjetas.innerHTML =
      `<h1 class="txtNodispo">Producto no disponible</h1>
    <img class="noDispo" src=../img/72gi.gif>`

  }



})




//Seleccionamos el producto en seco

function seleccionamosProducto() {

  let botones = document.getElementsByClassName("btnCompra")

  for (const boton of botones) {


    boton.addEventListener("click", function () {


      let seleccionamos = carritoEnseco.find(producto => producto.id == this.id)



      if (seleccionamos) {

        seleccionamos.addCantidad();

      } else {

        seleccionamos = seco.find(producto => producto.id == this.id)
        carritoEnseco.push(seleccionamos)


      }

      localStorage.setItem("CarritoSeco", JSON.stringify(carritoEnseco))

      carritoMostrar(carritoEnseco)

      Toastify({

        text: `Se agrego el producto ${seleccionamos.titulo} al carrito `,

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

function carritoMostrar(lista) {

  cantidadEnseco.innerHTML = lista.length;
  productosCarritoSeco.innerHTML = "";


  for (const product of lista) {


    let producto = document.createElement("div")

    producto.innerHTML = ` ${product.titulo}:
    <span class="badge bg-warning text-dark separar">Precio: $ ${product.precio}</span>
    <span class="badge bg-primary">Cantidad:  ${product.cantidad}</span>
    <span class="badge bg-dark">Subtotal: $ ${product.subTotal()}</span>
    

    <a id="${product.id} " class="btn btn-secondary btn-añadir">+</a>
    <a id="${product.id} " class="btn btn-secondary btn-restar">-</a>
    <a id="${product.id} " class="btn btn-secondary btn-borrar">x</a>

    `


    productosCarritoSeco.append(producto);



  }
  sumardelCarrito();

  //Query selector para cada una de las clases de las etiquetas a 

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

}


//funcion para sumar la cantidad del producto
function añadirCarrito() {

  let producto = carritoEnseco.find(producto => producto.id == this.id) //find porque solo queremos el objeto

  producto.agregarCantidad(1);

  this.parentNode.children[1].innerHTML = "Cantidad: " + producto.cantidad; //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

  this.parentNode.children[2].innerHTML = "Subtotal: " + producto.subTotal(); //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html


  localStorage.setItem("CarritoSeco", JSON.stringify(carritoEnseco)); //modificamos el localstorage



}


//Funcion restar la cantidad del carrito
function restarCarrito() {

  let producto = carritoEnseco.find(producto => producto.id == this.id) //find porque solo queremos el objeto

  if (producto.cantidad > 1) { //tiene que ser mayor de uno para restar


    producto.agregarCantidad(-1) //decrementar la cantidad

    this.parentNode.children[1].innerHTML = "Cantidad: " + producto.cantidad; //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html

    this.parentNode.children[2].innerHTML = "Subtotal: " + producto.subTotal(); //parentNode es para subir de nivel y children para obtener el hijo y modificamos el html


    localStorage.setItem("CarritoSeco", JSON.stringify(carritoEnseco)); //modificamos el localstorage


  } else {


    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se puede agregar 0 cantidades!',
    })


  }

}



//Alert de compra confirmada cuando se haga click en el boton

confirm.onclick = () => {


  Swal.fire(
    'Felicitaciones!',
    'Usted a comprado el producto!',
    'success'
  )


}




//funcion para sumar el total del carrito para construcción en seco

function sumardelCarrito() {

  //Creamos variable total, a carrito le pasamos reduce para que recorra y sume cada uno de los elementos que hay, += sumale lo que ya hay y suma producto.subTotal() y decirle en cuanto va a empezar la variable que quiero sumar

  let total = carritoEnseco.reduce((totalCompra, producto) => totalCompra += producto.subTotal(), 0)
  //no tenemos que pasarle llaves porque dara undefined, las llaves no puede interpetrar donde empieza y termina la estructura

  totalCarritoSeco.innerHTML = `Total: $ ${total}`; //modificamos su html y concatenamos el precio total

  return total; //retornamos para que se actualice la interfaz

}


//Guardar el carrito para que no tengamos que estar recargando, para que el usuario no pierda lo del carrito

if ("CarritoSeco" in localStorage) { //si existe en el localstorage

  let guardados = JSON.parse(localStorage.getItem("CarritoSeco")); //lo guardamos en el localstorage

  for (const generico of guardados) { //recorremos

    carritoEnseco.push(new Enseco(generico.id, generico.precio, generico.titulo, generico.descripcion, generico.imagen, generico.tipos, generico.cantidad)); //guardar de nuevo en el carrito

  }
  carritoMostrar(carritoEnseco); //lo mostramos


}