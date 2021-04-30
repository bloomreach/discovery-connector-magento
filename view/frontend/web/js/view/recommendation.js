/**
 * Copyright ©Bloomreach. All rights reserved.
 * See LICENSE.txt for license details.
 */
define(['uiComponent','Magento_Customer/js/customer-data','pathwaysRecomSdk'],
    function (Component, customerData) {
        'use strict';
        return Component.extend({
            initialize: function (config) {
                var self = this;
                this._super();
                this.widgetConfig = config.widgetConfig;
                this.customer = customerData.get('customer');
            },
            getWidgetTitle: function () {
                return this.widgetConfig.title;
            },
            getWidgetConfig: function () {
                return this.widgetConfig;
            },
            getCustomer: function () {
                return this.customer();
            },
            afterRender: function () {
                window.BloomreachModules.pathwaysRecommendations.load();
                /**window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true
                }));**/
            }
        });
});
