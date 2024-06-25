//Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');
//UI
const formulario = document.querySelector('#nueva-cita');
const contenerdorCitas = document.querySelector('#citas');

let editando;

class Citas {
    constructor () {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];

    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !==id);
    }

    editarCita(citaActualizada) {
        this.citas = this.citas.map( cita => cita.id ===citaActualizada.id ? citaActualizada : cita)
    }
}

class UI {
    imprimirAlerta(mensaje, tipo) {
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        //Agregar clase en base al tipo de error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de error
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta despuésde 5 segundos
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({citas}){

        this.LimpiarHTML();

        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfo:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora:</span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas:</span> ${sintomas}
            `;

            //Boton para Eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
            btnEliminar.onclick = () => eliminarCita(id);

            //añade un botón para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>';
            btnEditar.onclick = () => cargarEdición(cita);

            //Agregar los parrafos al dicCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregar al HTML
            contenerdorCitas.appendChild(divCita);
        });
    };

    LimpiarHTML() {
        while(contenerdorCitas.firstChild) {
            contenerdorCitas.removeChild( contenerdorCitas.firstChild);
        }
    }
}

const ui = new UI();
const adminitrarCitas = new Citas;

//Registrar eventos
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input',  datosCita);
   propietarioInput.addEventListener('input',  datosCita);
    telefonoInput.addEventListener('input',  datosCita);
    fechaInput.addEventListener('input',  datosCita);
    horaInput.addEventListener('input',  datosCita);
    sintomasInput.addEventListener('input',  datosCita);

    formulario.addEventListener('submit',nuevaCita);
}

//Objeto con la información de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''

}

//Agrega datos al objeto de cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value;
}

//Valida y agrega una nueva cita a la clase de la cita
function nuevaCita(e) {
    e.preventDefault();

    //Extraer la información del objeto de citas
    const {mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Valiidar
    if(mascota ===''|| propietario ===''|| telefono ===''|| fecha ===''|| hora ===''|| sintomas==='') {
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return;
    }

    if(editando) {
        ui.imprimirAlerta('Editado Correctamente');

        // Pasar el objeto de la cita a edicción
        adminitrarCitas.editarCita({...citaObj})

        //Regresar el texto del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Quitando modo edicción
        editando = false;
    }else {
        //Generar un id único
        citaObj.id = Date.now();

        //Creando una nueva cita.
        adminitrarCitas.agregarCita({...citaObj});//{....citaObj} -->pasar una copia nada más para que no se repita

        //Mensaje de agregado correctamente
        ui.imprimirAlerta('Se agregó correctamente')
    }


    //Reiniciando el objeto para la validación
    reiniciarObjeto();

    //Reiniciar el formulario
    formulario.reset();

    //Mostrar el HTML de las citas
    ui.imprimirCitas(adminitrarCitas);
}

function reiniciarObjeto() {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

function eliminarCita(id) {
    //Eliminar la cita
    adminitrarCitas.eliminarCita(id);

    //Muestre un mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //Refrescar las citas
    ui.imprimirCitas(adminitrarCitas);
}

//Carga los datos y el modo edición
function cargarEdición(cita) {
    const {mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    //Llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //Cambiar el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';
    editando = true;
}
