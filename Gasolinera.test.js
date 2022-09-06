const {Regular, Premium, Diesel} = require('./Gasolina');
const Gasolinera = require('./Gasolinera');
const VehiculoFactory = require('./Vehiculo');

var gasolinera = new Gasolinera([Regular(), Premium()]);

describe("Test de cargar()", ()=>{
    test("Gasolinera carga totalmente el tanque de un auto", ()=>{
        var vehFactory = new VehiculoFactory();
        var auto = vehFactory.crearVehiculo(1, 2);
        auto.manejar();
        gasolinera.cargar(auto);
        expect(auto.carga).toBe(auto.capacidad);
    })
    test("Gasolinera carga totalmente el tanque de una moto", ()=>{
        var vehFactory = new VehiculoFactory();
        var moto = vehFactory.crearVehiculo(0, 1);
        moto.manejar();
        gasolinera.cargar(moto);
        expect(moto.carga).toBe(moto.capacidad);
    })
});