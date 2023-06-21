sap.ui.define([], function () {
    "use strict";
    return {

        
        statusText: function (nInputValue, sUnitsStock) {
            let nUnitsStock = Number(sUnitsStock) 
            let res=  nUnitsStock > nInputValue ? "Alto" : "Bajo"
            
            return res
        }
    }
})