sap.ui.define([
    "sap/ui/base/ManagedObject"
], function (
) {
    "use strict";

    return {
        fragments: {
            productDetailFragment: {
                route: "ejercicio.examen.view.fragments.ProductDetail"
            }
        },
        input:{
            defaultValue: 12
        }
    }
}, true);