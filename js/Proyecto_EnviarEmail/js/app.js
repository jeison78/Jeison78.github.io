document.addEventListener('DOMContentLoaded', function() {
    
    const email = {
        email: '',
        destinatario: '',
        asunto: '',
        mensaje: ''
    }
    // console.log(email);

    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');//tipo de selector de CSS
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
   
    //Añadir un campo Exta llamado cc
    //crear un elemento label 
    const label = document.createElement('label')
    label.textContent = 'CC:';
    label.setAttribute( 'for', 'Destinatario');
    label.classList = 'font-regular font-medium'
    //crear un elemento input
    const inputDestinatario = document.createElement('input')
    inputDestinatario.setAttribute('id', 'destinatario');
    inputDestinatario.setAttribute('type', 'text');
    inputDestinatario.setAttribute('name', 'destinatario');
    inputDestinatario.setAttribute('placeholder', 'Destinatario');
    inputDestinatario.classList = 'border border-gray-300 px-3 py-2 rounded-lg'
    //crear un alemento div
    const div = document.createElement('div');
    div.classList = 'flex flex-col space-y-2';
    div.appendChild(label);
    div.appendChild(inputDestinatario);

    //Insertar al HTML
    formulario.insertBefore(div, formulario.children[1])

    //Asignar eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    inputDestinatario.addEventListener('input', validar);

    
    formulario.addEventListener('submit', enviarEmail);//Submit --> llame a una funciion cuando se envie un formulario

    btnReset.addEventListener('click', function(e) {
        e.preventDefault();//Prevenir el comportamiento que tiene ese elemento

        resetFormulario();
    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {//setTimeout() --> Llama a una función después de varios milisegundos
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            //Crear una alerta 
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10',
            'font-bold', 'text-sm', 'uppercase');
            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);

        }, 3000);
    }

    
    function validar (e) {
        console.log(excepto.value);
        const excepto = e.target.name === 'destinatario';
        if(e.target.value.trim() === '' || excepto.valueOf === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return ;
        }

        // if(e.target.name === 'destinatario' && e.target.value.trim() ===''){
        //     limpiarAlerta(e.target.parentElement);
        // }
    
        
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es válido', e.target.parentElement/*La referencia*/);
            comprobarEmail();
            return;
        }


        
        // console.log(e.target.parentElement);
        // if(e.target.id=== 'destinatario')

        limpiarAlerta(e.target.parentElement);//limpiar el elemento padre

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();
        
        // asunto[e.target.name] = e.target.value.trim().toLowerCase();
        
        

        //Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        //Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta){
            alerta.remove();
        }
        console.log(referencia);
        //Generar alerta en HTML
        const error = document.createElement('P');//Se recomienda que sea en mayúsculas 
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');//agregar un color de fondo con tailwind

        //Inyectar el error al formulario 
        
        referencia.appendChild(error);//Usando appendChild()
        // formulario.insertBefore(error , formulario.children[2]);
    }

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        //Validar el email con una expresión regular  
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail()  {
        if( Object.values(email).includes('')) {
            if(Object.values(email).includes('')){

                btnSubmit.classList.add('opacity-50')//Eliminar la clase opacity
                btnSubmit.disabled = true;
                return        
            }
            
        }
        btnSubmit.classList.remove('opacity-50')//Eliminar la clase opacity
        btnSubmit.disabled = false;
    }
    function resetFormulario() {
          //Reimiciar el objeto
          email.email = '';
          email.asunto = '';
          email.mensaje = '';
  
          formulario.reset();//Resetear el formulario
          comprobarEmail();
    }
  
})

