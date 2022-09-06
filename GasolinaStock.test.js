const GasolinaStock = require('./GasolinaStock');
const {Regular, Premium, Diesel} = require('./Gasolina');

describe("Test de cambiarStock()", ()=>{
    test("Si saco 200 litros de diesel deberia seguir teniendo 1800", ()=>{
        var DieselStock = new GasolinaStock(Diesel());
        DieselStock.cambiarStock(200);
        expect(DieselStock.stock).toBe(1800);
    });
    test("Si saco 200 litros de Premium sigue teniendo 550 litros", ()=>{
        var PremiumStock = new GasolinaStock(Premium());
        PremiumStock.cambiarStock(200);
        expect(PremiumStock.stock).toBe(550);
    });
});

describe("Test de reabastecer()", ()=>{
    test("Si recargo el stock de Diesel voy a tener 2000 litros", ()=>{
        var DieselStock = new GasolinaStock(Diesel());
        DieselStock.cambiarStock(200);
        DieselStock.reabastecer();
        expect(DieselStock.stock).toBe(2000);
    });
    test("Si recargo el stock de Premium voy a tener 750 litros", ()=>{
        var PremiumStock = new GasolinaStock(Premium());
        PremiumStock.cambiarStock(200);
        PremiumStock.reabastecer();
        expect(PremiumStock.stock).toBe(750);
    })
});