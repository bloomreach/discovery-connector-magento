/**
 * Bloomreach Connector extension
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Bloomreach Proprietary License
 * that is bundled with this package in the file LICENSE.txt.
 *
 * @category       Bloomreach
 * @package        Connector
 * @copyright      Copyright (c) 2021-current Bloomreach Inc.
 */
define(['uiComponent','Magento_Customer/js/customer-data','pathwaysRecomSdk'],
    function (Component, customerData) {
        'use strict';
        return Component.extend({
            initialize: function (config) {
                let self = this;
                self._super();
                self.widgetConfig = config.widgetConfig;
                self.customer = customerData.get('customer');
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
            }
        });
});
