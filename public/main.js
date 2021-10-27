

let formInfo = document.getElementById('submit-info'); //Obteniendo los elementos de form



getLS = (key) =>{
    return JSON.parse(localStorage.getItem(key)); //Convirtiendo el localStorage a un string
}

setLS = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

 

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

}

