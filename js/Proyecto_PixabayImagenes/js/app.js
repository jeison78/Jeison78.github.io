const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');
const paginacionDiv = document.querySelector('#paginacion');

const registroPorPagina = 40;
let totalPaginas;
let iterador;
let paginaActual = 1;

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
    e.preventDefault();

    const terminoBusqueda = document.querySelector('#termino').value;

    if(terminoBusqueda === '') {
        mostrarAlerta('Agrega un término de búsqueda');
        return;
    }

    buscarImagenes();
}

function mostrarAlerta(mensaje) {

    const Existalerta = document.querySelector('.bg-red-100');

    if(!Existalerta) {
        const alerta = document.createElement('p');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded',
        'max-w-lg', 'mx-auto', 'mt-6', 'text-center');
    
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;
    
        formulario.appendChild(alerta);
        
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

function buscarImagenes() {

    const termino = document.querySelector('#termino').value;

    const key = '41036768-0b274ced17bcebf2e0703987f';
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            console.log(resultado)
            totalPaginas = calcularPaginas(resultado.totalHits)
            mostrarImagenes(resultado.hits);
        })
}

//Generador que va registrar la cantidad e elementos de acuerdo a las páginas
function *crearPaginador(total) {
    for(let i = 1; i<= total; i++) {
        yield i;//para registrar internamente los valores en el generador
    }
}

function calcularPaginas(total){
    return parseInt( Math.ceil(total/ registroPorPagina));
}

function mostrarImagenes(imagenes) {

    //Limpiar el HTML
    while(resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

    //Iterar sobre el arreglo  de imagenes y construir el HTML
    imagenes.forEach( imagen => {
        const { previewURL, likes, views, largeImageURL} = imagen;

        resultado.innerHTML += `
            <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="bg-white">
                    <img class="w-full" src="${previewURL}">
                    <div class="p-4 ">
                        <p class="font-bold"> ${likes} <span class="font-light"> Me gusta</span></p>
                        <p class="font-bold"> ${views} <span class="font-light"> Vistas</span></p>

                        <a 
                            class="block w-full bg-blue-800 hover:bg-blue500 text-white uppercase font-bold text-center rounded mt-5 p-1" 
                            href="${largeImageURL}" target="_black" rel="noopener noreferrer"
                        >
                            Ver Imagen
                        </a>
                    </div>
                </div>
            </div>
        `;
        // resultado.innerHTML += `
        //     <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
        //         <div class="bg-white">
        //             <img class="w-full" src="${previewURL}">
        //             <div class="p-4 ">
        //                 <p class="font-bold float-left"> 
        //                     ${likes} 
        //                     <span>
        //                         <svg  style="display: inline;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
        //                         <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
        //                         </svg>
        //                     </span>
        //                 </p>
        //                 <p class="font-bold float-right "> 
        //                     ${views} 
        //                     <span class="font-light">
        //                         <svg style="display: inline;" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
        //                         <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
        //                         <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
        //                   </svg>
        //                     </span>
        //                 </p>
        //                 <br>
        //                 <a 
        //                     class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1 " 
        //                     href="${largeImageURL}" target="_black" rel="noopener noreferrer"
        //                 >
        //                     Ver Imagen
        //                 </a>
                        
        //             </div>
        //         </div>
        //     </div>
        // `;
    });
    //Limpiar el paginador previo 
    while(paginacionDiv.firstChild) {
        paginacionDiv.removeChild(paginacionDiv.firstChild)
    }

    //Generamos el nuevo HTML
    imprimirPaginador();

}

//Generar un Paginador
function imprimirPaginador(){
    iterador = crearPaginador(totalPaginas);

    while(true) {
        const {value, done} = iterador.next();
        if(done) return;

        //Caso contrario, genera un botón para cada elemento en el generador
        const boton = document.createElement('a');
        boton.href= '#';
        boton.dataset.pagina = value;
        boton.textContent = value;
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'rounded');
        boton.onclick = () => {
            paginaActual = value;
            
            buscarImagenes();
        }

        paginacionDiv.appendChild(boton);
    }
}
