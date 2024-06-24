//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventLister();
function cargarEventLister() {
    //Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
     articulosCarrito = [];

     limpiarHTML();//Eliminamos todo el HTML
    })
}

//Funciones
function agregarCurso(e) {
    e.preventDefault();//Prevenimos la acción por de default(Evitar que un enlace abra la URL )
    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso'));
    const cursoId = e.target.getAttribute('data-id')

    //Eliminar del arreglo de artiiculossCarrito por el data-id
    articulosCarrito = articulosCarrito.filter (curso => curso.id !== cursoId);

    carritoHTML();//Iterar sobre el carrito y mostrar su HTML

}


//Lee el contenido del  HTML al que le dimos click y extraer la información del Curso
function leerDatosCurso(curso) {
    // console.log(curso);

    //Crear objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map( curso =>{
            if(curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;// retorna el objeto actualizado
            }else {
                return curso;// retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    }else {
        //Agregar alementos al arreglo de Carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }


    console.log(articulosCarrito);

    carritoHTML();
}


//Muestra el Carrito de Compras en el HTML
function carritoHTML(){

    //Limpiar el HTML - Para que no se repitan los elementos en el carrito
    limpiarHTML();

    //Recorrer el carrito y genera el HTML
    articulosCarrito.forEach( curso =>{
        //Para que el codigo se vea mas limpio - usando destructuring
        const {imagen, titulo, precio, cantidad, id} = curso;
        console.log(curso);//nos da toda la información que tiene ese objeto
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}" width="150px"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td style="text-align: center;">${cantidad}</td>
            <td><a a href="#" class="borrar-curso" data-id="${id}">X</a></td>
        `;

        //Agrea el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cuursos del tbody
function limpiarHTML() {
    //Forma lenta
    //contenedorCarrito.innerHTML = '';

    //Forma rápida
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
