const assert = require("assert");
const { isTypedArray } = require("util/types");

describe("archivo a ser probado", ()=>{
    context("funcion a ser probada",()=>{
        it("should do something", ()=>{
            assert.equal(1,1);
        });

        it("should do something so", ()=>{
            assert.deepEqual({"nombre":"Leo"},{"nobre": "leo"});
        });

        it("prueba pendiente");
    });
});

