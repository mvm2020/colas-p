const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();


io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // client.emit('Ultimos4', {
    //     ultimos4: ticketControl.getUltimos4()
    // });

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar eventos de clientes
    //Callback trae siguienteTicket
    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente);
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //Notificar cambios en los ultimos 4

        client.broadcast.emit('Ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });



});