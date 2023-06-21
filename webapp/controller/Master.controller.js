sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "../utils/formatter",
    "../utils/Constants"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Fragment, JSONModel, formatter, Constants) {
        "use strict";

        return Controller.extend("ejercicio.examen.controller.Master", {

            formatter: formatter,


            onInit: function () {
                //Define el modelo para el input
                let oInput = {
                    value: Constants.input.defaultValue
                }
                var inputModel = new JSONModel(oInput)
                this.getView().setModel(inputModel, "inputValue");
            },

            onClicked: function (oEvent) {

                //Carga el fragment en la vista

                var oView = this.getView();
                var sPath = oEvent.getSource().getBindingContext().getPath();

                if (!this.byId("openDialog")) {
                    Fragment.load(
                        {
                            id: oView.getId(),
                            name: Constants.fragments.productDetailFragment.route,
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

                //Intenta definir el oDataModel para pasarlo al fragment como JSON
                //No funciona aparentemente por el problema de CORS
                var that = this;
                var catId = oEvent.getSource().getBindingContext().getObject()
                var oModeloData = new sap.ui.model.odata.v2.ODataModel("https://services.odata.org/V2/Northwind/Northwind.svc")
                oModeloData.read("/Products(" + catId + ")/Category", {
                    success: function (data) {
                        let cat = new JSONModel(data);
                        that.byId("openDialog").setModel(cat, "cat")
                    }
                })

            },


            //Define el close para el dialog
            onClose: function () {
                this.byId("openDialog").close()
            },


            //Metodos para la navegación
            pressOrders: function (oEvent) {
                var ID = oEvent.getSource().getBindingContext().getProperty("ProductID")
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteDetail", {
                    productID: ID
                })
            },

            onInputChange: function (evt) {
                let newValue = Number(evt.getParameter("newValue"));
                this.getView().getModel("inputValue").setProperty("/value", newValue);

            }


        });
    });
