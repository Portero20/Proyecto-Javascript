//Select para Ferreteria
let seleccion = document.getElementById("selectTipos")


function selectUI (lista){

    seleccion.innerHTML += `<option selected>Todos</option>`


    for (const titulo of lista) {
        
        seleccion.innerHTML += `<option> ${titulo} </option>`
    }
    
}

selectUI(tipos)
tarjetasUI(tarjetas)



//Recorremos el select
seleccion.onchange = function(){

    if(this.value != "Todos"){

        const encontramos = tarjetas.filter(product => product.tipos == this.value)

        tarjetasUI(encontramos)

    }
    else{

        tarjetasUI(tarjetas)

    }

}