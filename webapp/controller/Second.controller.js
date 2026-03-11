sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("ZPRUEBA_01.controller.Second", {
		onNavBack: function() {
			this.getOwnerComponent().getRouter().navTo("main");
		},
		onNavToThird: function() {
			this.getOwnerComponent().getRouter().navTo("third");
		}
	});
});
