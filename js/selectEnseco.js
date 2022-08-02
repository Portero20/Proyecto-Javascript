//Select para construcción en seco
let seleccion = document.getElementById("selectTipos")


function selectUI (lista){

    seleccion.innerHTML += `<option selected>Todos</option>`


    for (const titulo of lista) {
        
        seleccion.innerHTML += `<option> ${titulo} </option>`
    }
    
}

selectUI(tipos)
ensecoUI(seco)



//Recorremos el select
seleccion.onchange = function(){

    if(this.value != "Todos"){

        const encontramos = seco.filter(product => product.tipos == this.value)

        ensecoUI(encontramos)

    }
    else{

        ensecoUI(seco)

    }

}