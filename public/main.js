

let formInfo = document.getElementById('submit-info'); //Obteniendo los elementos de form



getLS = (key) =>{
    return JSON.parse(localStorage.getItem(key)); //Convirtiendo el localStorage a un string
}

setLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

function renderDataLs(){

    let pcWorld = getLS('pcWorld'); //Bajando datos de localStorage a la función 

    let pcCard = document.getElementById('pcWorld-card'); //Obtener los elementos de div
    pcCard.innerHTML = '';

    //Si pcWorld tiene datos, entonces: 
    if (pcWorld) {
        pcWorld.forEach(it => {
            let pcImg = document.createElement('img'); //Crear elementos
            pcImg.className = "w-28 justify-center rounded".split(' ');
            pcImg.src = it.img;

            let pcName = document.createElement('h2'); //Crear un h2 para el título del producto
            pcName.className = "text-center".split(' ');
            pcName.innerHTML = it.product;

            let pcAtri = document.createElement('h3'); //Crear un h3 para los atributos del producto
            pcAtri.className = "text-center".split(' ');
            pcAtri.innerHTML = it.atribute;

            let div = document.createElement('div');//Crear elemento div
            div.className = "w-36 bg-green-600 flex flex-col items-center py-5 px-3 rounded-xl m-2.5".split(' ');
            

            //Guardando los valores en el div creado
            div.appendChild(pcImg);
            div.appendChild(pcName);
            div.appendChild(pcAtri);

            pcCard.appendChild(div); //Se guarda el div creado anteriormente en el card principal

        });
    }
}
 
//Guardar los elementos del form
formInfo.onsubmit = (event) => {
    event.preventDefault(); //Cancela el evento, sinn detener el resto del evento https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault

    let product = document.getElementById("product").value;
    let atribute = document.getElementById('atribute').value;
    let img = document.getElementById('img').value;

    

   let currLs = getLS('pcWorld'); //Añadiendo key al local storage  

   let newVal = []; //Declarando arreglo para guardar los elementos

   if (!currLs) { //Si el localStorage actual no está vacío
       newVal.push({product, atribute, img}); //Entonces pushear los elementos 
   }
   else{
       newVal = [...currLs, {product, atribute, img}]; // Si no asginar los valores
   }

   setLS('pcWorld', newVal);

   renderDataLs(); //Mostrando los datos después de guardar

   
}


//Mostrar cuando se carga la página

window.onload = () =>{
    renderDataLs();
    
}



