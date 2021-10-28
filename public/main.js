let formInfo = document.getElementById('submit-info'); //Obteniendo los elementos del form con id='submit-info'
let searchInfo = document.getElementById('search'); //Obteniendo los elementos del form con el id='search'



//Cuando cargue la ventana
window.onload = () =>{
    renderDataFromSource(getLS('pcWorld')); //Obteniendo los datos de 'pcWorld' desde el localStorage
    
}



//Obtner los datos del localStorage
getLS = (key) =>{
    return JSON.parse(localStorage.getItem(key)); //Convirtiendo el string a un objeto en JS
}

//Setear el objeto como string
setLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

//Función que va a mostrar los datos guardados en cards
renderDataFromSource = (source) => { //Los datos se van a pasar a la función y se van a a guardar en la variable source 


    let pcCard = document.getElementById('pcWorld-card'); //Obtener los elementos de div
    //Vaciar cards
    pcCard.innerHTML = '';

    //Si source tiene datos, entonces: 
    if (source) {
        source.forEach(it => {
            let pcImg = document.createElement('img'); //Crear elementos
            pcImg.className = "w-28 justify-center rounded";
            pcImg.src = it.img;

            let pcName = document.createElement('h2'); //Crear un h2 para el título del producto
            pcName.className = "text-center text-white p-1 mt-1 font-semibold";
            pcName.innerHTML = it.product;

            let pcAtri = document.createElement('h3'); //Crear un h3 para los atributos del producto
            pcAtri.className = "text-center text-sm bg-blue-300 rounded px-1 max-w-28";
            pcAtri.innerHTML = it.atribute;

            let div = document.createElement('div');//Crear elemento div
            div.className = "w-36 bg-gradient-to-r from-blue-800 via-purple-600 to-indigo-500 flex flex-col items-center py-5 px-3 rounded-xl m-2.5";

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

    if (product==""||atribute==""||img=="") // Si los inputs estan vacios o falta uno, avisar a usuario que rellene todos los datos
        return alert('Fill data');

    let newVal = []; //Declarando arreglo para guardar los elementos

    if (!currLs) { //Si el localStorage actual no está vacío
        newVal.push({product, atribute, img}); //Entonces pushear los elementos 
    }
    else{
        newVal = [...currLs, {product, atribute, img}]; // Sino asignar los valores
    }

    //Actualizar el localStorage
    setLS('pcWorld', newVal);

    //Obteniendo los datos de 'pcWorld' desde el localStorage
    renderDataFromSource(getLS('pcWorld')); //Mostrando los datos después de guardar
}




//Campo search 
searchInfo.onsubmit = (event) =>{
    event.preventDefault();

    let searchInp = document.getElementById("searchInp").value; //Otbteniendo la información que introduzca el cliente
    console.log(searchInp);
     
    //Filtrar por nombre del producto
    let filteredInfo = !(searchInp == "") ? getLS('pcWorld').filter(it => it.product.toLowerCase() == searchInp.toLowerCase()) : getLS('pcWorld');

    renderDataFromSource(filteredInfo); //Mostrar los cards que encontró con ese nombre

}