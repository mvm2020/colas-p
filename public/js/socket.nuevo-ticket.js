//Comando para establecer la conexion desde cliente

var socket = io();

var label = $('#lblNuevoTicket'); //Referencia Jquery al elemento

socket.on('connect', function() {
    console.log('Cliente conectado');
});

//Listener que escucha el estado actual del servidor
socket.on('estadoActual', function(respuesta) {
    label.text(respuesta.actual);
});

//Jquery - Todos los botones al clic ejecutabn esa función
//null de que no envia parametros, pero si ejecuta funcion
$('button').on('click', function() {
    //console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});

socket.on('disconnect', function() {
    console.log('Cliente desconectado');
});