//Variables y Selectores
const formulario = document.querySelector('#agregar-gasto');
const gastoListado = document.querySelector('#gastos ul');


//Eventos
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntaPresupuesto);

    formulario.addEventListener('submit', agregarGasto);
}



//Clases
class Presupuesto {
   constructor(presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto); 
        this.gastos = [];
    }

    nuevoGasto(gasto) {
        this.gastos = [...this.gastos, gasto];
        this.calcularRestante()
    }

    calcularRestante() {
        const gastado = this.gastos.reduce( (total, gasto) => total + gasto.cantidad, 0);
        this.restante = this.presupuesto - gastado;
    }

    eliminarGasto(id) {
        this.gastos = this.gastos.filter( gasto => gasto.id !== id)
        this.calcularRestante();
    }
   
}

class UI {//User Interface - Interfaz de Usuario
    insertarPresupuesto(cantidad) {
        //Extrayendo los valores
        const {presupuesto, restante} = cantidad;

        //Agregar al HTML
        document.querySelector('#total').textContent = presupuesto;
        document.querySelector('#restante').textContent = restante;
    }

    imprimirAlerta(mensaje, tipo){
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert')

        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Insertar en el HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario);

        //Quitar del HTML
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    mostrarGastos(gastos) {
        
        this.limpiarHTML();//Elimina el HTML previo

        //Iterar sobre los gastos 
        gastos.forEach( gasto => {
            
            const {cantidad, nombre , id} = gasto;

            //Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            //Agregar un atributo
            // nuevoGasto.setAttribute('data-id', id);
            //Otra forma | La mas recomendable|
            nuevoGasto.dataset.id = id;


            //Agregar el HTML del gasto 
            nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>`;

            //Boton para borrar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';//Si se quiere poner una entidad (&times), se tendria remplazar texContent con innerHTML.
            btnBorrar.onclick = () => {
                eliminarGasto(id);
            }
            nuevoGasto.appendChild(btnBorrar);

            //Agregar al HTML
            gastoListado.appendChild(nuevoGasto);
        });
    }
    
    limpiarHTML(){
        while(gastoListado.firstChild) {
            gastoListado.removeChild(gastoListado.firstChild)
        }
    }

    actualizarRestante(restante) {
        document.querySelector('#restante').textContent = restante;
    }

    comproobarPresupuesto(presupuestoObj) {
        const {presupuesto, restante } = presupuestoObj;
        const restanteDiv = document.querySelector('.restante');
        //Comprobar 25%
        if(( presupuesto / 4) > restante) {
            restanteDiv.classList.remove('alert-success', 'alert-warning');
            restanteDiv.classList.add('alert-danger');

        } else if((presupuesto / 2) > restante) {
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        } else {
            restanteDiv.classList.remove('alert-danger', 'alert-warning');
            restanteDiv.classList.add('alert-success');
        }

        //Si el total es a 0 o menor
        if(restante <= 0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');

            //prevenir que sigan agregando gastos
            formulario.querySelector('button[type="submit"]').disabled = true;
        }
    }
}

//Instanciar
const ui = new UI();
let presupuesto;


//Funcionnes
function preguntaPresupuesto() {
    const presupuestoUsuario = prompt('¿Cual es tupresupuesto?');

    // console.log(Number(presupuestoUsuario));

    if(presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0){
        window.location.reload();//Recargar la ventana actaul
    }

    //Presupuesto valido
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto);
}


//Añade gastos
function agregarGasto(e) {
    e.preventDefault();

    //Leer los datos del formulario
    const nombre = document.querySelector('#gasto').value;
    const cantidad = Number(document.querySelector('#cantidad').value);

    //Validar
    if(nombre ==='' || cantidad === '') {
        ui.imprimirAlerta('Ambos campos son Obligatorios', 'error');
        return;
    }else if (cantidad <=0 || isNaN(cantidad) ) {
        ui.imprimirAlerta('Cantidad no válida', 'error');
        return;
    }

    //Generar un objeto con el gasto
    const gasto = { nombre, cantidad, id: Date.now() }
    
    //Añade un nuevo gasto 
    presupuesto.nuevoGasto(gasto);

    //Mensaje de todo bien
    ui.imprimirAlerta('Gasto agregdo Correctamente');
    
    //Imprimir los gastos
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);
    
    //Actualizar Restante
    ui.actualizarRestante(restante);

    ui.comproobarPresupuesto(presupuesto);
    //Reiniciar el formulario
    formulario.reset();
}

function eliminarGasto(id) {
    //Elimina del objeto
    presupuesto.eliminarGasto(id); 
    
    //Elimina los gastos del HTML
    const {gastos, restante} = presupuesto;
    ui.mostrarGastos(gastos);
    ui.actualizarRestante(restante);
    ui.comproobarPresupuesto(presupuesto);
}