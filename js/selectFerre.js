/* ------------------------ Select para Ferreteria ------------------------ */

let seleccion = document.getElementById("selectTipos")


function selectUI (lista){

    seleccion.innerHTML += `<option selected>Todos</option>` //para mostrar todos


    for (const titulo of lista) { //por cada tipo que yo encuentre en esa lista
        
        seleccion.innerHTML += `<option> ${titulo} </option>` //modificar el html interno y el += a lo que ya hay le agrego uno
    }
    
}

selectUI(tipos)
tarjetasUI(tarjetas)



//Recorremos el select
seleccion.onchange = function(){ //cuando cambie haga tal cosa

    if(this.value != "Todos"){ //si es distinto de todos queremos filtrar


        const encontramos = tarjetas.filter(product => product.tipos == this.value) //buscamos por filter porque queremos encontrar uno o mas elementos

        tarjetasUI(encontramos) //llamamos a la funcion y le pasamos como parametro encontramos

    }
    else{ //si seleccionamos todos es porque queremos ver el array completo

        tarjetasUI(tarjetas) //le pasamos el array completo sin filtrar

    }

}