let searchInfo = document.getElementById('search'); //Obteniendo los elementos del form con el id='search'
let addInfo = document.getElementById('add'); // Agregando boton que ayudara a guardar los datos
let filters = document.getElementById('filters');
let searchBtn = document.getElementById('search-btn');

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
            pcImg.className = "w-28 rounded";
            pcImg.src = it.img;

            let pcName = document.createElement('h2'); //Crear un h2 para el título del producto
            pcName.className = "text-center text-white text-2xl p-1 m-1 font-semibold w-full max-h-8";
            pcName.innerHTML = it.product;

            let pcAtribute = document.createElement('p'); //Crear un p para la categoría del producto
            pcAtribute.className = "text-center text-sm m-1 p-0.5 font-semibold bg-indigo-400 rounded max-h-6";
            pcAtribute.innerHTML =  it.atribute;

            let pcType = document.createElement('p'); //Crear un p para el tipo de producto
            pcType.className = "text-center  text-sm font-semibold bg-yellow-400 m-1 rounded p-0.5 max-h-6";
            pcType.innerHTML = it.type;

            let pcPrice = document.createElement('p'); //Crear un p para el precio del producto
            pcPrice.className = "text-center  text-sm  font-semibold bg-green-600 m-1 rounded p-0.5 max-h-6";
            pcPrice.innerHTML = '$' + it.price;

            let pcWeight = document.createElement('p'); // crear un p para el peso del producto
            pcWeight.className = "text-center text-sm font-semibold bg-red-400 m-1 rounded p-0.5 max-h-6";
            pcWeight.innerHTML = it.weight+' kg';

            let pcYear = document.createElement('p'); // Crear un p para el año de lanzamiento del producto
            pcYear.className = "text-center text-sm font-semibold bg-purple-400 m-1 rounded p-0.5 max-h-6";
            pcYear.innerHTML = it.year;

            let div = document.createElement('div');//Crear elemento div
            div.className = "w-40 bg-gradient-to-br from-blue-800 via-purple-600 to-indigo-900 flex flex-wrap justify-center py-5 px-3 rounded-xl m-2.5";

            //Guardando los valores en el div creado
            div.appendChild(pcImg);
            div.appendChild(pcName);
            div.appendChild(pcAtribute);
            div.appendChild(pcType);
            div.appendChild(pcPrice);
            div.appendChild(pcWeight);
            div.appendChild(pcYear);

            pcCard.appendChild(div); //Se guarda el div creado anteriormente en el card principal

        });
    }
}
 
//Guardar los elementos del form por medio de onclick del boton add


addInfo.onclick = (event) => {
    event.preventDefault(); //Cancela el evento, sin detener el resto del evento https://developer.mozilla.org/es/docs/Web/API/Event/preventDefault

    let product = document.getElementById("product").value;
    let atribute = document.getElementById('atribute').value;
    let type = document.getElementById('type').value;
    let price = document.getElementById('price').value;
    let img = document.getElementById('img').value;
    let weight = document.getElementById('weight').value;
    let year = document.getElementById('year').value;


    let currLs = getLS('pcWorld'); //Añadiendo key al local storage  

    if (product==""||atribute==""||type==""||(price=="" || isNaN(price))||
        img==""||(year=="" || isNaN(year) && year < 1500)||(weight=="" || isNaN(weight) || weight < 0)) // Si hay inputs vacios o hay carecteres no correspondientes, avisar a usuario que rellene todos los datos
        return alert('Check data');

    let newVal = []; //Declarando arreglo para guardar los elementos
    
    if (!currLs) { //Si el localStorage actual no está vacío
        newVal.push({product, atribute, type, price, img, year, weight}); //Entonces pushear los elementos 
    }
    else{
        newVal = [...currLs, {product, atribute, type, price, img, year, weight}]; // Sino asignar los valores
    }
    
    //Actualizar el localStorage
    setLS('pcWorld', newVal);

    //Obteniendo los datos de 'pcWorld' desde el localStorage
    renderDataFromSource(getLS('pcWorld')); //Mostrando los datos después de guardar
    product.value = ""; //Limpiar los inputs
    atribute.value = '';
    type.value = '';
    price.value = '';
    img.value = '';
    weight.value = '';
    year.value = '';
}

//Campo search con sus filtros
searchBtn.onclick = (event) =>{
    event.preventDefault();
    
    let searchInp = document.getElementById("searchInp").value; //Obteniendo la información que introduzca el cliente
    
    if(filters.value == "productName")
    {
        //Filtrar por nombre del producto
        let filteredInfo = !(searchInp == "") ? getLS('pcWorld').filter(it => it.product.toLowerCase() == searchInp.toLowerCase()) : getLS('pcWorld');
        renderDataFromSource(filteredInfo); //Mostrar los cards que encontró con ese nombre
    } 
    else if(filters.value == "atribute")
    {
        let filteredInfo = !(searchInp == "") ? getLS('pcWorld').filter(it => it.atribute.toLowerCase() == searchInp.toLowerCase()) : getLS('pcWorld');
        renderDataFromSource(filteredInfo); //Mostrar los cards que encontró con ese atributo
    }
    else if(filters.value == "type")
    {
        let filteredInfo = !(searchInp == "") ? getLS('pcWorld').filter(it => it.type.toLowerCase() == searchInp.toLowerCase()) : getLS('pcWorld');
        renderDataFromSource(filteredInfo); //Mostrar los cards que encontró de ese tipo
    }
    else if(filters.value == "price")
    {
        let filteredInfo = !(searchInp == "") ? getLS('pcWorld').filter(it => it.price.toLowerCase() == searchInp.toLowerCase()) : getLS('pcWorld');
        renderDataFromSource(filteredInfo); //Mostrar los cards que encontró de ese precio
    }  
    else if(filters.value == "year")
    {
        let filteredInfo = !(searchInp == "") ? getLS('pcWorld').filter(it => it.year.toLowerCase() == searchInp.toLowerCase()) : getLS('pcWorld');
        renderDataFromSource(filteredInfo); //Mostrar los cards que encontró de ese año de producción
    }
    
}
