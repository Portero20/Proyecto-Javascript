//Funcionalidad para construcción en seco
class Enseco {

  constructor(id, precio, titulo, descripcion, imagen, tipos, cantidad) {

    this.id = id;
    this.precio = precio;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;
    this.tipos = tipos;
    this.cantidad = cantidad || 1;  //Tomara el 1 porque cantidad esta vacío


  }
  addCantidad() {

    this.cantidad++;

  }
  subTotal() {

    return this.precio = this.cantidad;

  }

}


let seco = [];


let tipos = ["Solera", "Montante", "Cinta", "Placa"]


//Ferreteria productos
seco.push(new Enseco(1, 570, "Durlock Solera", "35 BAJA C/PEST X 2600MM PERFIL DE ACERO GALVANIZADO", "../img/solera-gal-35.webp", tipos[0]))
seco.push(new Enseco(2, 650, "Durlock Montante", "34X35X2600 MM PARA CIELORRASOS", "../img/durockmontante.jpg", tipos[1]))
seco.push(new Enseco(3, 780, "Durlock Solera", "70 BAJA C/PEST X 2600MM DE ALUMINIO", "../img/solera70.jpg", tipos[0]))
seco.push(new Enseco(4, 850, "Durlock Montante", "69X35X2600 MM ACERO ZINCADA ", "../img/montante69.jpg", tipos[1]))
seco.push(new Enseco(5, 2600, "Cinta Microperforada", "Rollo de 160M DE USO SIMPLE PARA JUNTA DE PLACAS", "../img/cintamicro.webp", tipos[2]))
seco.push(new Enseco(6, 1600, "Durlock Placa", "12.5MM EST REF 1.20 X 2.40M CON RESISTENCIA AL FUEGO", "../img/placadurlock.jpg", tipos[3]))

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




ensecoUI(seco)  //Lo mostramos en el HTML




//Buscamos el producto de construcción en seco
buscarProducto.addEventListener("input", function () {

  const encontrados = seco.filter(producto => producto.titulo.includes(this.value))
  console.log(encontrados);


  if (encontrados.length > 0) {

    ensecoUI(encontrados)

  } else {

    divTarjetas.innerHTML = "No se encontro el producto"

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
          background: "linear-gradient(to right, #868585, #013695)",
        },

      }).showToast();
      



    })


  }

}




//Creamos una funcion carritoMostrar para que se vaya sumando los elementos en el carrito

function carritoMostrar(lista) {

  cantidadEnseco.innerHTML = lista.length;
  productosCarritoSeco.innerHTML = "";


  for (const product of lista) {
    

    let producto = document.createElement("div")
    
    producto.innerHTML = ` ${product.titulo}:
    <span class="badge bg-warning text-dark">Precio: $ ${product.precio}</span>
    <span class="badge bg-primary">Cantidad:  ${product.cantidad}</span>
    <span class="badge bg-dark">Subtotal: $ ${product.subTotal()}</span>`


    productosCarritoSeco.append(producto);



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


//Limpiar carrito función (en seco)


