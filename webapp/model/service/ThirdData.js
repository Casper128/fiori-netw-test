sap.ui.define([], function() {
    "use strict";

    function _makeKey(document, item) {
        return "Vbeln='" + document + "',Posnr='" + item + "'";
    }

    return {
        readList: function(oModel, filters) {
            return new Promise(function(resolve, reject) {
                if (!oModel) {
                    return reject(new Error("No OData model"));
                }
                var mParameters = {};
                if (Array.isArray(filters) && filters.length) {
                    mParameters.filters = filters;
                }
                mParameters.success = function(oData) {
                    resolve((oData && oData.results) || []);
                };
                mParameters.error = function(oError) {
                    reject(oError);
                };
                oModel.read("/ZETEXAMEN_DAOSet", mParameters);
            });
        },

        readEntry: function(oModel, document, item) {
            return new Promise(function(resolve, reject) {
                if (!oModel || !document || !item) {
                    return reject(new Error("Invalid parameters"));
                }
                var sKey = _makeKey(document, item);
                var sPath = "/ZETEXAMEN_DAOSet(" + sKey + ")";
                oModel.read(sPath, {
                    success: function(oData) {
                        resolve(oData);
                    },
                    error: function(oError) {
                        reject(oError);
                    }
                });
            });
        },

        createEntry: function(oModel, oPayload) {
            return new Promise(function(resolve, reject) {
                if (!oModel || !oPayload) {
                    return reject(new Error("Missing model or payload"));
                }
                oModel.create("/ZETEXAMEN_DAOSet", oPayload, {
                    success: function(oData) {
                        resolve(oData);
                    },
                    error: function(oError) {
                        reject(oError);
                    }
                });
            });
        },

        updateEntry: function(oModel, document, item, oPayload) {
            return new Promise(function(resolve, reject) {
                if (!oModel || !document || !item || !oPayload) {
                    return reject(new Error("Invalid parameters"));
                }
                var sKey = _makeKey(document, item);
                var sPath = "/ZETEXAMEN_DAOSet(" + sKey + ")";
                oModel.update(sPath, oPayload, {
                    success: function(oData) {
                        resolve(oData);
                    },
                    error: function(oError) {
                        reject(oError);
                    }
                });
            });
        },

        deleteEntry: function(oModel, document, item) {
            return new Promise(function(resolve, reject) {
                if (!oModel || !document || !item) {
                    return reject(new Error("Invalid parameters"));
                }
                var sKey = _makeKey(document, item);
                var sPath = "/ZETEXAMEN_DAOSet(" + sKey + ")";
                oModel.remove(sPath, {
                    success: function() {
                        resolve();
                    },
                    error: function(oError) {
                        reject(oError);
                    }
                });
            });
        }
    };
});