const fs = require('fs');

//Clase para manejar los tickets pendientes
class Ticket {
    //numero que sigue, escritorio que lo va a atender
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        //Tomo la fecha de hoy
        this.hoy = new Date().getDate();

        //Tickets pendientes de revisión
        this.tickets = [];
        this.ultimos4 = [];

        //Leo el archivo json
        let data = require('../data/data.json');

        //console.log(data);
        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        } else {
            this.reiniciarConteo();
        }

    }

    siguiente() {
        this.ultimo += 1;
        //null por que aun no se que escritorio va a tender
        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();
        return `Ticket: ${ this.ultimo }`;
    }

    getUltimoTicket() {
        return `Ticket: ${ this.ultimo }`;
    }

    getUltimos4() {
        return this.ultimos4;
    }

    atenderTicket(escritorio) {

        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift(); //Lo elimino

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        this.ultimos4.unshift(atenderTicket); //Lo pone al inicio

        if (this.ultimos4.length > 4) {
            this.ultimos4.splice(-1, 1); //Borra el ultimo
        }

        console.log('Ultimos 4');
        console.log(this.ultimos4);

        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;

        this.tickets = []; //Vacia tickets pendientes
        this.ultimos4 = [];
        this.grabarArchivo();
        console.log('Se ha reiniciado el Sistema');
    }

    grabarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets, //graba pendientes
            ultimos4: this.ultimos4
        };
        //Convierto el json en string
        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}