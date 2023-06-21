sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
	"sap/ui/model/json/JSONModel",
    "../utils/formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	Fragment,
	JSONModel,
    formatter) {
        "use strict";

        return Controller.extend("ejercicio.examen.controller.Master", {

            formatter: formatter,


            onInit: function () {

            },

            onClicked: function(oEvent){
                var oView = this.getView();
                var that = this;
                var sPath = oEvent.getSource().getBindingContext().getPath();
                var catId = oEvent.getSource().getBindingContext().getObject()
                var oModeloData = new sap.ui.model.odata.v2.ODataModel("https://services.odata.org/V2/Northwind/Northwind.svc")
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

                oModeloData.read("/Products("+catId+")/Category", {
                    success: function(data){
                        let cat = new JSONModel(data);
                        that.byId("openDialog").setModel(cat, "cat")
                    }
                })

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
            },

            onInputChange: function(evt){
                let value = Number(evt.getParameter("newValue"));
                let oInput = {
                    value: value
                }
                var inputModel = new JSONModel(oInput)
                this.getView().setModel(inputModel, "inputValue");

            }

            
        });
    });
