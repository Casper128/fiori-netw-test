sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"../model/mapper/ExamMapper",
	"../model/service/ThirdData"
], function(Controller, Filter, FilterOperator, ExamMapper, ThirdData) {
	"use strict";

	return Controller.extend("ZPRUEBA_01.controller.ThirdDocumentList", {
		onInit: function() {
			this._oEventBus = this.getOwnerComponent().getEventBus();
			this._oList = this.byId("documentList");
			this.getOwnerComponent().getRouter().getRoute("third").attachPatternMatched(this._onRouteMatched, this);

			// modelo para filtros de fecha, local a esta vista
			var oDateModel = new sap.ui.model.json.JSONModel({
				startDate: "2026-01-01",
				endDate: "2026-01-31"
			});
			this.getView().setModel(oDateModel, "dateFilter");
		},

		_onRouteMatched: function(oEvent) {
			// Aplicar el filtro de fecha inicial al cargar la vista
			this.onApplyDateFilter();
			// Carga las entradas mapeadas para el nivel 1
			// this._loadMappedEntries(); // onApplyDateFilter ya llama a _loadMappedEntries
		},

		onApplyDateFilter: function() {
			var oFilterModel = this.getView().getModel("dateFilter");
			if (!oFilterModel) {
				return;
			}
			// La lógica de filtrado por fecha se mantiene, pero ahora se aplica directamente aquí
			var sStart = oFilterModel.getProperty("/startDate");
			var sEnd = oFilterModel.getProperty("/endDate");
			if (sStart && sEnd && sStart > sEnd) {
				var sTemp = sStart;
				sStart = sEnd;
				sEnd = sTemp;
			}

			var aFilters = this._buildDateFilters(sStart, sEnd);
			this._aDateFilters = aFilters;
			this._loadMappedEntries();
		},

		onDocumentSelect: function(oEvent) {
			var oListItem = oEvent.getParameter("listItem");
			var oContext = oListItem && oListItem.getBindingContext("mapped");
			if (!oContext) {
				return;
			}

			var sDocument = oContext.getProperty("documentNumber");
			if (!sDocument) {
				return;
			}

			this.getOwnerComponent().getRouter().navTo("thirdDocument", {
				document: sDocument
			});
		},

		_loadMappedEntries: function () {
			var oDaoModel = this.getOwnerComponent().getModel("dao");
			if (!oDaoModel) {
				return;
			}

			// use service helper to fetch list
			ThirdData.readList(oDaoModel, this._aDateFilters).then(function (aEntries) {
				var aMapped = ExamMapper.mapEntries(aEntries);
				this.getOwnerComponent().getModel("mapped").setProperty("/entries", aMapped);
			}.bind(this)).catch(function (oError) {
				console.error("Error al leer ZETEXAMEN_DAOSet", oError);
			});
		},

		onNavBack: function() {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("second");
		},

		_applyListFilters: function(aFilters) {
			if (!this._oList) {
				return;
			}

			var oBinding = this._oList.getBinding("items");
			if (oBinding) {
				oBinding.filter(aFilters);
			}
		},

		_buildDateFilters: function(sStart, sEnd) {
			var aFilters = [];
			if (sStart && sEnd) {
				aFilters.push(new Filter("Erdat", FilterOperator.BT, sStart + "T00:00:00", sEnd + "T23:59:59"));
			} else if (sStart) {
				aFilters.push(new Filter("Erdat", FilterOperator.GE, sStart + "T00:00:00"));
			} else if (sEnd) {
				aFilters.push(new Filter("Erdat", FilterOperator.LE, sEnd + "T23:59:59"));
			}
			return aFilters;
		},
	});
});
