sap.ui.define([
    "sap/m/Button"
], function(Button) {
    "use strict";

    // a very small custom control extending sap.m.Button
    return Button.extend("ZPRUEBA_01.control.MyButton", {
        renderer: "sap.m.ButtonRenderer", // reuse base renderer to avoid loader looking for MyButtonRenderer.js
        metadata: {
            properties: {
                // inherit 'text' property from Button
            },
            events: {
                // a custom event the parent can listen to
                myPress: {}
            }
        },

        // hook into the press event firing so we can call the custom handler
        firePress: function(mParameters, bAllowPreventDefault) {
            // log so we know the button press happened
            console.log("MyButton pressed", this.getId());
            // forward press event parameters to the normal press listeners
            var bResult = Button.prototype.firePress.apply(this, arguments);
            // fire our custom event afterwards so the controller can react
            this.fireMyPress({
                originalEvent: mParameters && mParameters.originalEvent
            });
            return bResult;
        }
    });
});
