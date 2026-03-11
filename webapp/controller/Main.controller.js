sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/BindingMode",
	"sap/m/MessageToast",
	"sap/ui/model/odata/v2/ODataModel"
], function (Controller, JSONModel, BindingMode, MessageToast, ODataModel) {
	"use strict";

	return Controller.extend("ZPRUEBA_01.controller.Main", {
		onInit: function () {
			var oData = {
				product: ""
			};
			var oModel = new JSONModel(oData);
			oModel.setDefaultBindingMode(BindingMode.TwoWay);
			this.getView().setModel(oModel);
		},

		onMyPressed: function (oEvent) {
			console.log("MyButton's custom event was fired", oEvent.getParameter("originalEvent"));
			MessageToast.show("MyButton fired its custom event");
		},

		onNavToSecond: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			if (oRouter) {
				oRouter.navTo("second");
			} else {
				console.warn("router not available, cannot navigate");
			}
		}
	});
});