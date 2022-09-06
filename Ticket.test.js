const { expect, test } = require("@jest/globals");
const {Regular, Premium, Diesel} = require('./Gasolina');
const Ticket = require('./Ticket');
const Gasolinera = require('./Gasolinera');
const VehiculoFactory = require('./Vehiculo');

describe("Test de agregarOperacion()", ()=>{
    test("Si cargo Regular a un auto, deberia dar $50", ()=>{
        var gasolinera = new Gasolinera([Regular(), Premium(), Diesel()]);
        var factory = new VehiculoFactory();
        var auto = factory.crearVehiculo(1, 2);
        auto.carga = 0;
        gasolinera.cargar(auto);
        expect(gasolinera.ticket.gananciaTotal).toBe(50);
    });
    test("Si lleno el tanque de una moto con gasolina Premium, deberia dar $23", ()=>{
        var gasolinera = new Gasolinera([Regular(), Premium(), Diesel()]);
        var factory = new VehiculoFactory();
        var moto = factory.crearVehiculo(0, 1);
        moto.carga = 0;
        gasolinera.cargar(moto);
        expect(gasolinera.ticket.gananciaTotal).toBe(23);
    });
});

describe("Test de limpiarTicket()", ()=>{
    var gasolinera = new Gasolinera([Regular(), Premium(), Diesel()]);
    var factory = new VehiculoFactory();
    var auto = factory.crearVehiculo(1, 2);
    var moto = factory.crearVehiculo(0, 2);
    auto.manejar();
    moto.manejar();
    gasolinera.cargar(auto);
    gasolinera.cargar(moto);
    test("Si cargo combustible y despues limpio el ticket, deberia dar $0", ()=>{
        gasolinera.ticket.limpiarTicket();
        expect(gasolinera.ticket.gananciaTotal).toBe(0);
    });
    test("Si limpio el ticket no deberia tener operaciones almacenadas", ()=>{
        gasolinera.ticket.limpiarTicket();
        expect(gasolinera.ticket.operaciones.length).toBe(0);
    })
})
