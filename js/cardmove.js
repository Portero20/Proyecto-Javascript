/* --------------- Sección "los más vendidos" para los botones -------------- */

const imagenes = [

    {

        id:1,
        name: "Tijera Corta Tubo",
        img: "https://http2.mlstatic.com/D_NQ_NP_907258-MLA45299882767_032021-O.jpg",
        text: "Producto",

    },

    {

        id:2,
        name: "Cemento Holcim",
        img: "https://arcencohogar.vtexassets.com/arquivos/ids/283133-800-800?v=637651638952800000&width=800&height=800&aspect=true",
        text: "Producto",

    },

    {

        id:3,
        name: "Ceramico Salteña",
        img: "https://http2.mlstatic.com/D_NQ_NP_949261-MLA46527145005_062021-W.jpg",
        text: "Producto",

    },

    {

        id:4,
        name: "Disco Flap",
        img: "https://http2.mlstatic.com/D_NQ_NP_820126-MLA33071828250_122019-O.jpg",
        text: "Producto",

    },

];


//Seleccionamos items

const img = document.getElementById("persona-img")
const author = document.getElementById("author")
const description = document.getElementById("description")

const prevBtn = document.querySelector(".prev-btn")
const nextBtn = document.querySelector(".next-btn")
const randomBtn = document.querySelector(".randomBtn")


//Seteamos el item

let currentItem = 0;


//Cargamos el item inicial

window.addEventListener("DOMContentLoaded",function () {

    mostrarPersona();
    
})


//Creamos funcion mostrar persona

function mostrarPersona() {

    const item = imagenes[currentItem];
    img.src = item.img
    author.textContent = item.name;
    description.textContent = item.text;
    
}


//Mostrar siguiente imagen
//Funcionalidad para la seccion de "Los más vendidos - index"
nextBtn.addEventListener("click",function(){


    currentItem++;

    if(currentItem > imagenes.length -1){

        currentItem = 0;

    }

    mostrarPersona();


});


//Mostrar imagen anterior

prevBtn.addEventListener("click", function(){


    currentItem--;

    if(currentItem < 0){

        currentItem = imagenes.length - 1;

    }

    mostrarPersona();


})

//Mostrar imagen random

randomBtn.addEventListener("click",function(){

    currentItem = Math.floor(Math.random() * imagenes.length);

    mostrarPersona();


})