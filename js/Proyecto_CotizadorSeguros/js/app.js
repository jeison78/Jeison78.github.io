
//Constructores
function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Realiza la cotización con los datos
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = Americano 1.15
        2 = Asiatico 1.05
        3 = Europeo 1.35
     */

    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
        default:
            break;
    }

    //Leer el año
    const diferencia = new Date().getFullYear() -3 - this.year;

    //Cada año que la diferencia es mayor, el costo va a reducirse en 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    
    /*
        Si el seguro es básico se multiplica por un 30% más
        Si el seguro es completo se multiplica por un 50% más
    */

    if(this.tipo === 'basico'){
        cantidad *= 1.30;
    }else {
        cantidad *= 1.50;
    }

    return cantidad;
    
}

function UI() {}

// LLena las opciones de los años
UI.prototype.LLenarOpciones = () => {
    const max = new Date().getFullYear() -3,
          min = max - 20;
      ;
    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

//Muestra alertas en pantalla
UI.prototype.mostrarMensaje =  (mensaje, tipo) => {
    const div = document.createElement('div');

    if(tipo === 'error') {
        div.classList.add('error');
    }else {
        div.classList.add('correcto');
    }
    
    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.querySelector('#cotizar-seguro');//No tiene nada de malo tener variables que se llamen igual y que seleccionen lo mismo porque estan en diferentes funciones
    formulario.insertBefore(div, document.querySelector('#resultado'));

    setTimeout(() => {
        div.remove();
    }, 3000);
}

UI.prototype.mostrarResultado = (total, seguro) =>{

    const {marca, year, tipo} = seguro;

    let textoMarca;

    switch (marca) {
        case '1':
            textoMarca = 'Americano';
        case '2':
            textoMarca = 'Asiatico';
        case '3':
            textoMarca = 'Europeo';

        default:
            break;
    }
    //Crear el resultado
    const div = document.createElement('div');
    div.classList.add('mt-10');

    //capitalize --> primera palabra en mayùscula
    div.innerHTML = `
        <p class="header">Tu Resumen</p>
        <p class="font-bold">Marca: <span class="font-normal"> ${textoMarca} </sapan></p>
        <p class="font-bold">Año: <span class="font-normal"> ${year} </sapan></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize"> ${tipo} </sapan></p>
        <p class="font-bold">Total: <span class="font-normal"> $ ${total} </sapan></p>

    `;

    const resultadoDiv = document.querySelector('#resultado');
    

    //Mostrar el spinner
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';//Se borra el spinner
        resultadoDiv.appendChild(div);//Se muestra el resultado
    }, 3000);
}

//Instanciar UI
const ui = new UI;


document.addEventListener('DOMContentLoaded', () =>{
    ui.LLenarOpciones();//Llena el select con los años...
})


eventeListeners();
function eventeListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e) {
    e.preventDefault();

    //Leer la marca seleccionada
    const marca = document.querySelector('#marca').value
    
    //Leer el año seleccionado
    const year = document.querySelector('#year').value;

    //Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    
    if(marca=== '' || year === '' || tipo === ' ') {
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');// va ser de tipo error
        return;
    }
    ui.mostrarMensaje('Cotizando', 'exito');

    //Ocultar las cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null) {
        resultados.remove();
    }

    //Instanciar el seguro
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();

    
    //Utilizar el prototype que se va cotizar
    ui.mostrarResultado(total, seguro);
}
