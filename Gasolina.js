/*
Las gasolinas estan creadas como IIFE para que solo exista 1 por cada tipo de gasolina y se pueda hacer referencia a un tipo
de gasolina en particular
*/

function Diesel(){
    var diesel = {};
    diesel.id = 0;
    diesel.nombre = "Diesel";
    diesel.costo = 0.7;
    diesel.almacen = 2000;
    diesel.aprovisionamiento = 12;
    return diesel;
}

function Premium(){
    var premium = {};
    premium.id = 1;
    premium.nombre = "Premium";
    premium.costo = 2.3;
    premium.almacen = 750;
    premium.aprovisionamiento = 5;
    return premium;
}

function Regular(){
    var regular = {};
    regular.id = 2;
    regular.nombre = "Regular";
    regular.costo = 1;
    regular.almacen = 1000;
    regular.aprovisionamiento = 6;
    return regular;
}

module.exports = {Regular, Premium, Diesel};
