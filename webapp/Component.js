sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"ZPRUEBA_01/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("ZPRUEBA_01.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// model para almacenar la lista mapeada (se utiliza en nivel 1/2)
			this.setModel(new sap.ui.model.json.JSONModel({
				entries: []
			}), "mapped");

			// initialize the router based on manifest configuration (may not exist after manifest cleanup)
			var oRouter = this.getRouter && this.getRouter();
			if (oRouter && typeof oRouter.initialize === "function") {
				oRouter.initialize();
			}
			// ensure dao model exists (manifest should create it)
			var oDao = this.getModel("dao");
			if (!oDao) {
				this.setModel(new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZEXAMEN_DAO_SRV/", {
					defaultBindingMode: "TwoWay",
					defaultCountMode: "Inline"
				}), "dao");
			}

		}
	});
});