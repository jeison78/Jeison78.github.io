//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



//Event Listener
eventListener();

function eventListener() {
    //Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el docuemnto esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];// --> "||[]" , para que no ocurra un error al momento de buscar los tweets en localStorage y no haya ningun valor en el localStorage

         console.log(tweets);
         
         crearHTML();
    })
}


//Funciones
function agregarTweet(e) {
    e.preventDefault();

    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    
    //Validación
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet//---> esto es igual a tweet: tweet O text: tweet.
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    //Una ves agregado vamos a creear el HTML    
    crearHTML();

    //Reiniciar el formulario 
    formulario.reset();
}


//Mostrar Mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertar en el Contenido
    const Contenido = document.querySelector('#contenido')
    Contenido.appendChild(mensajeError);

    //Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

//Muestra un listados de los tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            //Agregar un boton de elimiar
            const btnEliminar = document.createElement('a');
            // btnEliminar.classList =  ('') ----  También se puede agregar una classe así
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la función de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            //crear el HTML
            const li = document.createElement('li');

            //añadir el texto
            li.innerHTML = tweet.tweet;

            //Asignar el botón
            li.appendChild(btnEliminar);

            //insertalo en el HTML
            listaTweets.appendChild(li)
        })
    }

    sincronizarStorage();
}


//Agregar los Tweets actuales a localstorage
function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id  );
    
    crearHTML();
}

//Limpiar el HTML
function limpiarHTML() {
    while (listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}
