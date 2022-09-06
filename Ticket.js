function Ticket(){
    this.operaciones = [];
    this.gananciaTotal = 0;
}

Ticket.prototype.agregarOperacion = function(operacion, monto = 0){
    this.gananciaTotal = this.gananciaTotal + monto;
    this.operaciones.push(operacion);
}

Ticket.prototype.obtenerTicket = function(){
    this.agregarOperacion("Ganancia total: $" + Math.round(this.gananciaTotal), 0);
    var retorno = this.operaciones;
    this.limpiarTicket();
    return retorno;
}

Ticket.prototype.limpiarTicket = function(){
    this.operaciones = [];
    this.gananciaTotal = 0;
}

module.exports = Ticket;