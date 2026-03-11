sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/mapper/ExamMapper",
	"../model/service/ThirdData"
], function (Controller, ExamMapper, ThirdData) {
	"use strict";

	return Controller.extend("ZPRUEBA_01.controller.ThirdDetail", {
		onInit: function () {
			this._oEventBus = this.getOwnerComponent().getEventBus();
			this._oList = this.byId("itemList");
			this.getOwnerComponent().getRouter().getRoute("thirdDocument").attachPatternMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function (oEvent) {
			var oArgs = oEvent.getParameter("arguments");
			this._sCurrentDocument = oArgs.document;
			var aFilters = [];
			if (this._sCurrentDocument) {
				aFilters.push(new Filter("documentNumber", FilterOperator.EQ, this._sCurrentDocument));
			}
			this._oList.getBinding("items").filter(aFilters);
			this.byId("level2Title").setText("Nivel 2 • Documento " + this._sCurrentDocument);
		},

		onLevel2Back: function () {
			// Navega a la vista anterior (lista de documentos)
			this.getOwnerComponent().getRouter().navTo("third");
		},

		onNewItem: function () {
			// clear detail model and show level3 for creation
			var oDetail = this.getOwnerComponent().getModel("detail");
			if (oDetail) {
				oDetail.setData({});
			}
			this.getOwnerComponent().getEventBus().publish("Third", "ShowCreate");
		},

		onItemSelect: function (oEvent) {
			var oSource = oEvent.getSource();
			var oContext = oSource && oSource.getBindingContext("mapped");
			if (!oContext) {
				return;
			}

			var sDocument = oContext.getProperty("documentNumber");
			var sItem = oContext.getProperty("itemNumber");
			if (!sDocument || !sItem) {
				return;
			}

			this.getOwnerComponent().getRouter().navTo("thirdDocumentItem", { // Navega a la vista de detalle
				document: sDocument,
				item: sItem
			});
		},

		_onDateFilterChanged: function (sChannelId, sEventId, oData) {
			if (oData && Array.isArray(oData.filters)) {
				this._aDateFilters = oData.filters;
				this._applyFilters();
			}
		},

		applyDocumentFilter: function (sDocument, aDateFilters) { },
		_applyFilters: function () { }
	});
});
