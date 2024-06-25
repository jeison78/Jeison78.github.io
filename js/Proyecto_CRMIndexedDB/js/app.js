(function(){
    
    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');

    document.addEventListener('DOMContentLoaded', () => {
        crearDB();

        if(window.indexedDB.open('crm', 1)) {
            obteenerClientes();
        };

        listadoClientes.addEventListener('click',eliminarRegistro)
    });

    function eliminarRegistro(e) {
        
        //Si en el caso no encuentra la Clase eliminar
        /*if(e.target.innerHTML === 'Eliminar') {
            const idEliminar = Number(e.target.dataset.cliente);//dataset -->acceder a los atributos personalizados.
            const confirmar = confirm('Deseas eliminar este cliente');
            
            if(confirmar) {
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function() {
                    console.log('Eliminando...');

                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function() {
                    console.log('Hubo un error');
                }
            }
        }
        */
        //buscar la clase eliminar
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.cliente);//dataset -->acceder a los atributos personalizados.
            const confirmar = confirm('Deseas eliminar este cliente');
            
            if(confirmar) {
                const transaction = DB.transaction(['crm'], 'readwrite');
                const objectStore = transaction.objectStore('crm');

                objectStore.delete(idEliminar);

                transaction.oncomplete = function() {
                    console.log('Eliminando...');

                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function() {
                    console.log('Hubo un error');
                }
            }
        }
    }

    //Crear la base de datos de IndexDB
    function crearDB() {
        const crearDB = window.indexedDB.open('crm', 1);

        crearDB.onerror = function() {
            console.log('Hubo un error');
        }
        
        crearDB.onsuccess = function() {
            DB = crearDB.result;
        }

        crearDB.onupgradeneeded = function(e) {
            const db = e.target.result;
            console.log(db);

            const objectStore = db.createObjectStore('crm', { keyPath: 'id', autoIncrement: true});

            objectStore.createIndex('nombre', 'nombre', {unique: false});
            objectStore.createIndex('email', 'email', {unique: true});
            objectStore.createIndex('telefono', 'telefono', {unique: false});
            objectStore.createIndex('empresa', 'empresa', {unique: false});
            objectStore.createIndex('id', 'id', {unique: true});

            console.log('DB Lista y Creada');
        }
    }

    function obteenerClientes() {
        const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function() {
            console.log('Hubo un error');
        }

        abrirConexion.onsuccess = function() {
            DB = abrirConexion.result;

            const objectStore = DB.transaction('crm').objectStore('crm');

            objectStore.openCursor().onsuccess = function(e) {
                const cursor = e.target.result;
                
                //El cursor se va colocar en la posición 0 del crm de la base de datos, va a leer esos resultados
                //Y después se hira al suiente y siguiente automaticamente sin hacerlo con un Iterador 
                if(cursor) {
                    const {nombre, empresa, email, telefono, id} = cursor.value
                    
                        listadoClientes.innerHTML += `
                        <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                            </td>
                        </tr>` ;
                    //Traer los demás Registros
                    cursor.continue();
                }else {
                    console.log('No hay más Registros...')
                }

                
            }
        }
    }
})();