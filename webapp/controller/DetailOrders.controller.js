sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("ejercicio.examen.controller.DetailOrders", {
            onInit: function () {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
  
                oRouter.getRoute("RouteDetail").attachMatched(this._routeMatched, this);
            },

            _routeMatched: function (oEvent) {

  
                var oArgs = oEvent.getParameter("arguments");
  
                var oView = this.getView();
  
                oView.bindElement({
  
                    path: "/Products("+oArgs.productID+")",
  
                    events: {
  
                        dataRequested: function () {
  
                            oView.setBusy(true);
  
                        },
  
                        dataReceived: function () {
  
                            oView.setBusy(false);
  
                        }
  
                    }
  
                });
  
            },



            
        });
    });
