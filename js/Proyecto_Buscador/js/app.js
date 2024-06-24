//Variables
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');
const resultado = document.querySelector('#resultado');

//"-3" porque el proyecto se creo en el 2020
const max = new Date().getFullYear() - 3;//Fecha actual
const min = max - 10;

//Crear un objeto con la búsqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',
}

//Eventos
document.addEventListener('DOMContentLoaded', () => {
    mostratAutos(autos);//muestra los autos al cargar

    //Lenar al opciones  de años
    llenarSelect();
})

//Event Listener para los select de búsqueda
//Marca
marca.addEventListener('change', e =>{/*Change --> cuando cambia el select*/
    datosBusqueda.marca = e.target.value

    //funcion de filtrar los automoviles
    filtrarAuto();    
})
//year
year.addEventListener('change', e =>{/*Change --> cuando cambia el select*/
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
})
//Minimo
minimo.addEventListener('change', e =>{/*Change --> cuando cambia el select*/
    datosBusqueda.minimo = e.target.value

    filtrarAuto();
})
//Maximo
maximo.addEventListener('change', e =>{/*Change --> cuando cambia el select*/
    datosBusqueda.maximo = e.target.value

    filtrarAuto();
})
//Puertas
puertas.addEventListener('change', e =>{/*Change --> cuando cambia el select*/
    datosBusqueda.puertas = parseInt(e.target.value)

    filtrarAuto();
})
//Transmicion
transmision.addEventListener('change', e =>{/*Change --> cuando cambia el select*/
    datosBusqueda.transmision = e.target.value

    filtrarAuto();
})
//Color
color.addEventListener('change', e =>{/*Change --> cuando cambia el select*/
    datosBusqueda.color = e.target.value
    console.log(datosBusqueda);

    filtrarAuto();
})


//Funciones
function mostratAutos(autos) {

    limpiarHTMl();//Ellimina el HTML previo

    autos.forEach(auto => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement('p');
        
        autoHTML.textContent = `
            ${marca} ${modelo} ${year} ${puertas}  Puetas - Transmisión ${transmision} - Precio: ${precio} - Color: ${color}
        `;

        //Insertar en el html
        resultado.appendChild(autoHTML);
    })
}

//Limpiar HTML
function limpiarHTMl(){
    while(resultado.firstChild) {//Mientras haiga algo 
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select
function llenarSelect() {

    for(let i = max; i > min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);//agrega las opciones  de año al select
    }

};


//funcion que filtra en base a la búsqueda
function filtrarAuto() {
    //Usar ArrayMethod
    //Al tener el nombre de la funcion el automovil se pasa automaticamente a la filtrarMarca()
    const resultado = autos.filter( filtrarMarca).filter( filtrarYear)
                            .filter(filtrarMinimo).filter(filtrarMaximo)
                            .filter(filtrarPuertas).filter(filtrarTransmision)
                            .filter(filtrarColor);
    
    // console.log(resultado);

    
    if(resultado.length) {
        mostratAutos(resultado);
    }else {
        noResultado();  
    }
}

function noResultado() {
    //Limpiamos el HTML    
    limpiarHTMl()
    //Luego mostramos el div con error

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay Resultado, Intenta con otros términos de búsqueda';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    //comparar marca 
    if(marca) {
        return auto.marca === marca;
    }
    return auto;
}

function filtrarYear(auto) {
    const { year } = datosBusqueda;
    //comparar año 
    if(year) {
        return auto.year === year;
    }
    return auto;
}

function filtrarMinimo(auto) {
    const { minimo } = datosBusqueda;
    //comparar precio minimo
    if(minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    //comparar precio maximo
    if(maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;
    //comparar puertas
    if(puertas) {
        return auto.puertas === puertas;
    }
    return auto;
}

function filtrarTransmision(auto) {
    const {transmision} = datosBusqueda;
    //comparar transmision
    if(transmision) {
        return auto.transmision === transmision
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;
    //comparar transmision
    if(color) {
        return auto.color === color
    }
    return auto;
}