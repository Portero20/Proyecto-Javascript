//Funcionalidad para ferreteria
class Productos {

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

}


let tarjetas = [];


let tipos = ["Trincheta", "Tijera", "Disco", "Electrodo"]


//Ferreteria productos
tarjetas.push(new Productos(1, 3200, "Tijera Corta Tubo".toUpperCase(), "PVC CROSSMAN 1-5/8 - AUTOMATICA", "../img/tijeracorta-tubos.jpg", tipos[1]))
tarjetas.push(new Productos(2, 400, "Trincheta Crossman".toUpperCase(), "ECONO C/UNA HOJA - 9932822 - 19 MM", "../img/trincheta-crossman.jpg", tipos[0]))
tarjetas.push(new Productos(3, 300, "Disco Flap".toUpperCase(), "115 MM X 1.0 MM ZIRCONICO PARA LIJADO", "../img/discoflap.jpg", tipos[2]))
tarjetas.push(new Productos(4, 700, "Electrodo Conarco".toUpperCase(), "13 A - 2.5 MM - 2.5 MM SUAVE Y ESTABLE", "../img/electrodo-conarco.jpg", tipos[3]))
tarjetas.push(new Productos(5, 5051, "Trincheta Bahco".toUpperCase(), "Retráctil Comportamiento 6 hojas 17cm", "../img/bahco-trincheta.webp", tipos[0]))
tarjetas.push(new Productos(6, 4190, "Tijera Corta Tubo".toUpperCase(), "Radial Tawak Tkt02 Aluminio PARA USO PROFESIONAL", "../img/tijeratawak.webp", tipos[1]))






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


//Seleccionamos el producto

function seleccionarProducto() {

  let iconos = document.getElementsByClassName("btnCompra");

  for (const icono of iconos) {

    icono.addEventListener("click", function () {


      let seleccion = carrito.find(producto => producto.id == this.id);


      if (seleccion) {

        seleccion.addCantidad();

      } else {

        seleccion = tarjetas.find(producto => producto.id == this.id)
        carrito.push(seleccion)

      }

      localStorage.setItem("Carrito", JSON.stringify(carrito))

      carritoHTML(carrito)

      Toastify({

        text: `Se agrego el producto ${seleccion.titulo} al carrito `,

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
    product.innerHTML = ` ${producto.titulo}:
    <span class="badge bg-warning text-dark">Precio: $ ${producto.precio}</span>
    <span class="badge bg-primary">Cantidad:  ${producto.cantidad}</span>
    <span class="badge bg-dark">Subtotal: $ ${producto.subTotal()}</span>` //El subtotal es un metodo

    productosCarrito.append(product);

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


//Boton confirmar del carrito para que salga un alert que diga "Felicitaciones, usted a comprado el producto"

confirmamos.onclick = () => {

  Swal.fire(
    'Felicitaciones!',
    'Usted a comprado el producto!',
    'success'
  )


}