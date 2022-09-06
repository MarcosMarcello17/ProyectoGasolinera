const Ticket = require('./Ticket');
const GasolinaStock = require('./GasolinaStock');

function Gasolinera(gasolinas = null){
    this.ticket = new Ticket(this);
    this.gasolinas = [];
    if (gasolinas != null){
        this.anadirGasolina(gasolinas);
    }
    ///Se incluyen las operaciones posibles a agregar al ticket dentro de un module pattern
    Gasolinera.operaciones = (function(){
        return{
            reabastecimiento: function(nomGas){
                return "Se reabastece la gasolina: " + nomGas;
            },
            stockActual: function(gas){
                var estadoActual = "";
                gas.forEach(element =>{
                    estadoActual = estadoActual + element.gasolina.nombre + ": " + element.stock + " litros. "
                });
                return estadoActual;
            },
            //Paso solo el vehiculo y saco los datos de ahi para no mandar muchos parametros a la funcion
            venta: function(vehiculo, carga){
                return vehiculo.nombre + " cargo " + carga + " litros de gasolina " + vehiculo.gasolina.nombre + " por un monto de $" + Math.round(carga * vehiculo.gasolina.costo);
            },
            pidoReaba: function(nomGas){
                return "Se pide reabastecer la gasolina: " + nomGas;
            },
            sinStock: function(){
                return "No se pudo cargar gasolina en el vehiculo por falta de stock";
            },
            tanqueLleno: function(){
                return "No se pudo cargar gasolina en el vehiculo porque tiene el tanque lleno";
            }
        };
    })();
}

//anadirGasolina y buscarGasolina utilizan el forEach para recorrer el arreglo recibido sin utilizar una estructura FOR

Gasolinera.prototype.anadirGasolina = function(gas){
    gas.forEach(element =>{
        this.gasolinas.push(new GasolinaStock(element));
    });
}

// Buscar gasolina retorna el objeto utilizado por la gasolinera que se esta buscando

Gasolinera.prototype.buscarGasolina = function(gas){
    var ret = -1;
    this.gasolinas.forEach(element=>{
        if(element.gasolina.id == gas.id){
            ret = element;
        }
    });
    return ret;
}

//Se separo la funcion comprobarStock de la funcion cargar para que no se alargue de mas

Gasolinera.prototype.comprobarStock = function(vehiculo){
    var gas = this.buscarGasolina(vehiculo.gasolina);
    try{
        if(gas == -1 || gas.stock == 0) throw "No hay stock de esta gasolina en la gasolinera";
        return gas.stock;
    }catch(err){
        this.ticket.agregarOperacion(Gasolinera.operaciones.sinStock());
        this.actualizarReabastecimiento();
        return null;
    }
}

//Se extrajo la variable sobra para no repetirla en try y en catch
//Se contemplan los casos en los que la gasolina no esta disponible porque no hay stock, donde el vehiculo ya tenga gasolina
//y donde el stock no es suficiente para cargar totalmente el auto

Gasolinera.prototype.cargar = function(vehiculo){
    try{
        if((enStock = this.comprobarStock(vehiculo)) == null) throw "Gasolina no existe en esta gasolinera";
        try{
            if(vehiculo.espacioLibre() == 0) throw "Tanque lleno";
            try{
                if (enStock < vehiculo.espacioLibre()) throw "No hay suficiente combustible para realizar la carga completa";
                var carga = vehiculo.capacidad;
            }catch(err){
                var carga = enStock;
            }
            var sobra = vehiculo.cargarGasolina(carga);
            this.cargarVenta(vehiculo, sobra, carga);
        }catch(err){
            console.log("El vehiculo tiene el tanque completo");
            this.ticket.agregarOperacion(Gasolinera.operaciones.tanqueLleno());
            this.actualizarReabastecimiento();
        }
    }catch(err){
        console.log("La gasolina del vehiculo no esta disponible en la gasolinera");
    }
}

//actualizarReabastecimiento busca entre sus gasolinas que estan esperando para reabastecerse
//Si alguna cumple el tiempo de aprovisionamiento determinado por la gasolina, se reestablece el stock

Gasolinera.prototype.actualizarReabastecimiento = function(){
    this.gasolinas.forEach(element =>{
        if(element.reabastece > 0){
            element.reabastece = element.reabastece + 1;
            if(element.reabastece == (element.gasolina.aprovisionamiento)){
                this.ticket.agregarOperacion(Gasolinera.operaciones.reabastecimiento(element.gasolina.nombre));
                element.reabastecer();
            }
        }
    })
}

//Se eliminaron variables que se consideran innecesarias debido a que se utilizan solo una vez

Gasolinera.prototype.cargarVenta = function(veh, sobrante, car){
    this.actualizarReabastecimiento();
    var cargado = car - sobrante;
    this.ticket.agregarOperacion(Gasolinera.operaciones.venta(veh, cargado), (cargado * veh.gasolina.costo));
    if (this.buscarGasolina(veh.gasolina).cambiarStock(cargado) == 1){
        this.ticket.agregarOperacion(Gasolinera.operaciones.pidoReaba(veh.gasolina.nombre));
    }
    this.ticket.agregarOperacion(Gasolinera.operaciones.stockActual(this.gasolinas));
}


module.exports = Gasolinera;