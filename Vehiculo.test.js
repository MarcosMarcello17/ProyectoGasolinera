const { expect, test } = require("@jest/globals");
const VehiculoFactory = require("./Vehiculo");
const {Regular, Premium, Diesel} = require('./Gasolina');

describe("Test de VehiculoFactory", () =>{
    var factory = new VehiculoFactory();
    test("La Capacidad de una moto es de 10 litros", ()=>{
        var moto = factory.crearVehiculo(0, 1);
        expect(moto.capacidad).toBe(10);
    });
    test("La capacidad de un auto es de 50 litros", () =>{
        var auto = factory.crearVehiculo(1, 2);
        expect(auto.capacidad).toBe(50);
    });
    test("La capacidad de un camion es de 100 litros", () =>{
        var camion = factory.crearVehiculo(2);
        expect(camion.capacidad).toBe(100);
    });
    test("La carga inicial de un vehiculo es su capacidad maxima", () =>{
        var moto = factory.crearVehiculo(0, 1);
        expect(moto.carga).toBe(moto.capacidad);
    });
    test("El camion tiene gasolina Diesel", () =>{
        var cam2 = factory.crearVehiculo(2);
        expect(cam2.gasolina.id).toBe(Diesel().id);
    });
    test("El auto con gasolina Regular se crea correctamente", () =>{
        var auto = factory.crearVehiculo(1, 2);
        expect(auto.gasolina.id).toBe(Regular().id);
    });
});

describe("Test de cargarGasolina()", () =>{
    var factory = new VehiculoFactory();
    test("El auto no puede cargar mas de 50 litros", () =>{
        var auto = factory.crearVehiculo(1, 2);
        auto.carga = 0;
        expect(auto.cargarGasolina(60)).toBe(10);
    });
    test("El Camion puede cargar menos de 100 litros", ()=>{
        var cam = factory.crearVehiculo(2);
        cam.carga = 0;
        expect(cam.cargarGasolina(50)).toBe(0);
    });
    test("La moto puede cargar 10 litros", ()=>{
        var moto = factory.crearVehiculo(0, 1);
        moto.carga = 0;
        expect(moto.cargarGasolina(10)).toBe(0);
    });
});

describe("Tests de espacioLibre()", ()=>{
    var factory = new VehiculoFactory();
    test("El Auto tiene 0 litros de espacio libre", ()=>{
        var auto = factory.crearVehiculo(1, 2);
        expect(auto.espacioLibre()).toBe(0);
    });
    test("El Auto tiene 20 litros de espacio despues de cargar 30 litros", ()=>{
        var auto = factory.crearVehiculo(1, 2);
        auto.carga = 0;
        auto.cargarGasolina(30);
        expect(auto.espacioLibre()).toBe(20);
    })
})