var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio'); //Tomo el valor
var label = $('small');

console.log(escritorio);
$('h1').text('Escritorio - ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(respuesta) {
        console.log(respuesta);

        if (respuesta === 'No hay tickets') {
            label.text(respuesta);
            alert(respuesta);
            return;
        }
        label.text('Ticket ' + respuesta.numero);
    });

});