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

            //Metodo que bindea los datos elsubPath del modelo para esta vista
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

            handlePress: function(evt){
                //Debería aqui poder obtener el id de la orden y del producto y
                //vincular un oDataModel con esa consulta a Nordwind 
                //para obtener la entidad /Order_Details(OrderID=10285,%20ProductID=1)
                //Con eso, podría pasar un model JSON para dejar accesibles los datos en un 
                //fragment. El problema es que no logró conectar un model oData por el problema con CORS (ver intento en Master) 

            }



            
        });
    });
