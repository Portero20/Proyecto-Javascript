/* ----------- Variables globales para el carrito de la ferreteria ---------- */

const carrito = [];

const cantidadCarrito = document.getElementById("cantidad");

const productosCarrito = document.getElementById("productosCarrito");

const confirmamos = document.getElementById("confirmar");


//Variables globales para el carrito de construcción en seco

const carritoEnseco = [];

const cantidadEnseco = document.getElementById("cantidadNum");

const productosCarritoSeco = document.getElementById("productosSeco")

const confirm = document.getElementById("confirmarEnseco")


//Variable global totalCarrito de ferreteria

const totalCarritoInterfaz = document.getElementById("totalCarrito")


//Variable global totalCarritoseco de en seco

const totalCarritoSeco = document.getElementById("totalCarritoEnseco")


//Toastify para el index con whatsapp


setTimeout(() => {


    Toastify({

        text: "¿Necesitas ayuda?",

        duration: 3000,

        onClick: function () {


            location.href = "https://api.whatsapp.com/send?phone=3834901637&text=Hola, Necesito mas información 🏗️🚧!" //redireccionamos la pagina 


        },

        gravity: "bottom",

        style: {
            background: "black",
          },





    }).showToast();





}, 8000);