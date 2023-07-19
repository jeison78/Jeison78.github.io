//  #1 Seleccion de lemento del DOM
/*}  
//console.log("Hola desde un  archivo extermo JavaScript"); imprime el texto en la consola.

//Seleccionar elementos del DOM
//let: palabra reservada -->define una variable global o locan en una función sin importar el ámbito del bloque al igual que "var" y "const".
//querySelector: nos devuelve un elemento aunque existan muchos elementos del criterio de busqueda
//querySelector : Nos devuelve todos los elementos que cumplan con el criterio de busqueda.
let links = document.querySelectorAll("a");//dentro de las comillas  se coloca el selector css. Este metodo nos va retornar el elemento encontrado almacenandolo en una variable llamada "container"

//Para recorrer un arreglo o también llamado lista.
//forEach: recibe la ejecución de este metodo una función.
//para crear una funcion --->function(){}
//Se le pone link porque va a ir cambiando su valor uno por uno por cada uno de los elementos que forman parte de esta lista.
links.forEach(function(link){//Esta función recibe como argumento cada uno de los elementos que esta dentro de esa lista.
    //Imprimir
    console.log(link);
})
//Imprimir en consola el resultado de la variable container
//console.log(links);
*/

//    #2 Eventos
/*
let celdas = document.querySelectorAll("td");

celdas.forEach(function(td){
    //addEventListener: Es un nodo de JavaScript --> Recibe dos argumentos: 1. argumento 2. una función con las acciiones que se van a realizar cuando  interactue el usuario(cuando haya un click).
    td.addEventListener('click', function(){
        console.log(this);//this: nos retorna el elemento que recibio de la interacción del usuario (El Click)
    })
});    
*/
/*
//obtener los elementos de la clase .close
let links = document.querySelectorAll(".close");

//Recorrerlos
links.forEach(function(link){
    //Agrear un evento click a cada uno de ellos
    link.addEventListener('Click',function(){
        console.log(":)");//El mensaje se muestra muy rapido que no se ve ya que la interaccion del usurio es sobre el link de cerre de la página
    })
})
*/
/*
//  #Comportamiento por defecto de un evento
let links = document.querySelectorAll(".close");

links.forEach(function(link){
    //prevenir que el comportamiento por defecto se ejecute 
    link.addEventListener("click",function(ev){
        //ev.preventDefault();//preventDefault: bloquea el comportamiento por defecto y evita que este se ejecute
        console.log(":)")
    });     
});
*/
/*
//Quitar y Agregar clases a un elemento con JavaScript
let iconos  = document.querySelectorAll("i");

iconos.forEach(function(icono){
    //ClassList : tiene todo referente a las clases que contiene un nodo(etiqueta html) de html, tiene un metodo remove(para quitar clases), add(para agregar nuevas clases).
    icono.classList.remove("fa-star-o");//quita a las estrellas
    icono.classList.add("fa-star");//Agrega clases
})
*/

let links = document.querySelectorAll(".close");

links.forEach(function(link){
    //Agregar un evento click a cada uno de ellos
    link.addEventListener("click",function(ev){
        ev.preventDefault();
        let content = document.querySelector('.content');

        //Quitarle las clases de animación que ya tiene
        content.classList.remove("fadeInDown");//fadeInDown: Animaciónn del elemento hacia dentro.
        content.classList.remove("animated");

        //Agregar clases para animar  su salida
        content.classList.add("fadeOutUp");//fadeOutUp: Animaciónn del elemento hacia fuera.
        content.classList.add("animated");
        //Retrasar la ejecución - TIMERS  - Temporizadores
        //setTimeout --> después de cierto tiempo una sola vez.
        //setInterval -->después de cierto tiempo constantemente.
        setTimeout(function(){
            //Moverse entre documentos-Redirenccion de página.
            location.href = "/";     
        },600/*Tiempo(600 milisegundos)*/);


      return false;
    });
});
