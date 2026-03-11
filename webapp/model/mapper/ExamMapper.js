sap.ui.define([], function () {
	"use strict";

	function safeValue(value) {
		return value === null || value === undefined ? "" : value;
	}

	return {
		mapEntry: function (oEntry) {
			if (!oEntry || typeof oEntry !== "object") {
				return null;
			}

			return {
				id: oEntry.__metadata && oEntry.__metadata.id,
				documentNumber: safeValue(oEntry.Vbeln),
				itemNumber: safeValue(oEntry.Posnr),
				customerId: safeValue(oEntry.Kunnr),
				materialNumber: safeValue(oEntry.Matnr),
				description: safeValue(oEntry.Arktx),
				quantity: safeValue(oEntry.Kwmeng),
				quantityUnit: safeValue(oEntry.Vrkme),
				salesOrg: safeValue(oEntry.Vkorg),
				plant: safeValue(oEntry.Werks),
				netValue: safeValue(oEntry.Netwr),
				currency: safeValue(oEntry.Waerk),
				createdAt: safeValue(oEntry.Erdat)
			};
		},

		mapEntries: function (aEntries) {
			if (!Array.isArray(aEntries)) {
				return [];
			}

			return aEntries.map(function (oEntry) {
				return this.mapEntry(oEntry);
			}, this).filter(Boolean);
		},

		unmapEntry: function (oMapped) {
			if (!oMapped || typeof oMapped !== "object") {
				return null;
			}
			return {
				Vbeln: oMapped.documentNumber || "",
				Posnr: oMapped.itemNumber || "",
				Kunnr: oMapped.customerId || "",
				Matnr: oMapped.materialNumber || "",
				Arktx: oMapped.description || "",
				Kwmeng: oMapped.quantity || "",
				Vrkme: oMapped.quantityUnit || "",
				Vkorg: oMapped.salesOrg || "",
				Werks: oMapped.plant || "",
				Netwr: oMapped.netValue || "",
				Waerk: oMapped.currency || "",
				Erdat: oMapped.createdAt || ""
			};
		}
	}
});

