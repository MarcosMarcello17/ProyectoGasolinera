function GasolinaStock(gasolina){
    this.gasolina = gasolina;
    this.stock = gasolina.almacen;
    this.reabastece = 0;
}

GasolinaStock.prototype.cambiarStock = function(cambio){
    this.stock -= cambio;
    if(this.stock <= 500 && this.reabastece == 0){
        this.reabastece = 1;
        return 1;
    }
    return 0;
}

GasolinaStock.prototype.reabastecer = function(){
    this.stock = this.gasolina.almacen;
    this.reabastece = 0;
}


module.exports = GasolinaStock