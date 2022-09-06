const {Regular, Premium, Diesel} = require('./Gasolina');

describe("Testeos de Gasolina", ()=>{
    test("La Gasolina regular cuesta $1", ()=>{
        expect(Regular().costo).toBe(1);
    });

    test("La Gasolina Premium cuesta $2.3", ()=>{
        expect(Premium().costo).toBe(2.3);
    })

    test("La Gasolina Diesel cuesta $0.7", ()=>{
        expect(Diesel().costo).toBe(0.7);
    })
})

