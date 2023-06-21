sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment) {
        "use strict";

        return Controller.extend("ejercicio.examen.controller.Master", {
            onInit: function () {

            },

            onClicked: function(oEvent){
                var oView = this.getView();
                var sPath = oEvent.getSource().getBindingContext().getPath();

                if (!this.byId("openDialog")) {
                    Fragment.load(
                        {
                            id: oView.getId(),
                            name: "ejercicio.examen.view.fragments.ProductDetail",
                            controller: this
                        }).then(
                            function (oDialog) {
                                oDialog.bindElement({
                                    path: sPath
                                  });
                                oView.addDependent(oDialog);
                                oDialog.open();
                            }
                        )
                } else {
                    this.byId("openDialog").bindElement({
                        path: sPath
                      });
                    this.byId("openDialog").open()
                }

            },

            onClose: function(){
                this.byId("openDialog").close()
            },


            pressOrders: function(oEvent){
                var ID = oEvent.getSource().getBindingContext().getProperty("ProductID")
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteDetail", {
                    productID: ID
                })
            }

            
        });
    });
