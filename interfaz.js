const VehiculoFactory = require('./Vehiculo');
const Gasolinera = require('./Gasolinera');
const {Regular, Premium, Diesel} = require('./Gasolina');
var express = require("express");
var app = express();
var port = 3000;


app.use(express.json());

//Se utiliza un revealing Module Pattern que agrupa los procesos que se realizan con cada POST y cada GET

var procesos = (function(){
    var vehiculos = [];
    var gasolinera = new Gasolinera([Regular(), Premium(), Diesel()]);
    var factory = new VehiculoFactory();
    function agregarVehiculos(rec){
        var cant = rec.cantidad || 1;
        var veh = factory.crearVehiculo(rec.tipo, rec.combustible);
        if(veh != null){
            for(var i = 0; i < cant; i++){vehiculos.push(veh)};
            return "Vehiculo Ingresado Correctamente";
        }else{
            return "Vehiculo Invalido";
        }
    }
    function getVehiculos(){
        return vehiculos;
    }
    function conseguirTicket(){
        vehiculos.forEach(element =>{
            element.manejar();
            gasolinera.cargar(element);
        });
        var ticket = gasolinera.ticket.obtenerTicket();
        vehiculos = [];
        return ticket;
    }
    return{
        agrVehiculos: agregarVehiculos,
        gVeh: getVehiculos,
        impTicket: conseguirTicket
    };
})();


app.post('/generoObjeto', function (req, res) {
    res.send(procesos.agrVehiculos(req.body));
});

app.get('/listaVehiculos', function(req, res){
    res.send(procesos.gVeh());
});

app.get('/getTicket', function(req, res){
    res.send(procesos.impTicket());
});

app.listen(port, () =>{
    console.log("Server running in port ", port);
});