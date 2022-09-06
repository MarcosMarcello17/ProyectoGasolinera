const {Regular, Premium, Diesel} = require('./Gasolina');

//Convertimos las variantes de cada vehiculo en objetos hijos de sus respectivos vehiculos para no tener que pasarle
//el combustible a cada nuevo objeto

function Vehiculo(nombre, capacidad){
    this.nombre = nombre;
    this.capacidad = capacidad;
    this.carga = this.capacidad;
    this.gasolina = null;
}

Vehiculo.prototype.cargarGasolina = function(nuevoGas){
    if (nuevoGas < this.espacioLibre()){
        this.carga = this.carga + nuevoGas;
        return 0;
    }else{
        var sobra = nuevoGas - this.espacioLibre();
        this.carga = this.capacidad;
        return sobra;
    }
}

Vehiculo.prototype.espacioLibre = function(){
    return (this.capacidad - this.carga);
}

//La funcion manejar se utiliza para los distintos vehiculos que se crean tengas diferentes cargas

Vehiculo.prototype.manejar = function(){
    var utilizado = Math.round(Math.random() * this.carga);
    this.carga -= utilizado;
}

function Auto(gasolina){
    Vehiculo.call(this, "Auto", 50);
    this.gasolina = gasolina;
}

Auto.prototype = Object.create(Vehiculo.prototype);
Auto.prototype.constructor = Auto;

function AutoPremium(){
    Auto.call(this, Premium());
}

AutoPremium.prototype = Object.create(Auto.prototype);
AutoPremium.prototype.constructor = AutoPremium;

function AutoRegular(){
    Auto.call(this, Regular());
}

AutoRegular.prototype = Object.create(Auto.prototype);
AutoRegular.prototype.constructor = AutoRegular;

function Moto(gasolina){
    Vehiculo.call(this, "Moto", 10);
    this.gasolina = gasolina;
}

Moto.prototype = Object.create(Vehiculo.prototype);
Moto.prototype.constructor = Moto;

function MotoPremium(){
    Moto.call(this, Premium());
}

MotoPremium.prototype = Object.create(Moto.prototype);
MotoPremium.prototype.constructor = MotoPremium;

function MotoRegular(){
    Moto.call(this, Regular());
}

MotoRegular.prototype = Object.create(Moto.prototype);
MotoRegular.prototype.constructor = MotoRegular;

function Camion(gasolina){
    Vehiculo.call(this, "Camion", 100);
    this.gasolina = gasolina;
}

Camion.prototype = Object.create(Vehiculo.prototype);
Camion.prototype.constructor = Camion;

function CamionDiesel(){
    Camion.call(this, Diesel());
}

CamionDiesel.prototype = Object.create(Camion.prototype);
CamionDiesel.prototype.constructor = CamionDiesel;

//Utilizamos un factory para crear los vehiculos, y se utiliza un switch para evaluar cada caso para evitar utilizar varios IFs

function VehiculoFactory(){
    this.crearVehiculo = function(tipo, combustible = 0){
        switch(tipo){
            case 0:
                switch(combustible){
                    case 1:
                        return new MotoPremium();
                    case 2:
                        return new MotoRegular();
                    default:
                        return null;
                }
            case 1:
                switch(combustible){
                    case 1:
                        return new AutoPremium();
                    case 2:
                        return new AutoRegular();
                    default:
                        return null;
                }
            case 2:
                switch(combustible){
                    default:
                        return new CamionDiesel();
                }
            default:
                return null;
        }
    }
}

module.exports = VehiculoFactory;
