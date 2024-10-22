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
define(["uiComponent", "Magento_Customer/js/customer-data","pathwaysRecomSdk"],
    function (Component, customerData) {
        'use strict';
        return Component.extend({
            initialize: function (config) {
                let self = this;
                self._super();
                self.widgetConfig = config.widgetConfig;
                self.customer = customerData.get("customer");
            },
            getWidgetTitle: function () {
                return this.widgetConfig.title;
            },
            getWidgetConfig: function () {
                return this.widgetConfig;
            },
            getWidgetDataAttrs: function () {
                const attrs = {
                    'data-id': this.widgetConfig.widget_id,
                    'data-type': this.widgetConfig.widget_type,
                    'data-title': this.getWidgetTitle(),
                    'data-category-id': this.widgetConfig.category_id,
                    'data-query': this.widgetConfig.query,
                    'data-item-ids': this.widgetConfig.item_ids,
                    'data-user-id': this.getCustomer().uniqueId,
                    'data-number-of-items-to-show': this.widgetConfig.products_visible,
                    'data-number-of-items-to-fetch': this.widgetConfig.products_to_fetch,
                };
                if (this.widgetConfig.additional_parameters) {
                    //decode html entities except double quotes
                    attrs['data-additional-params'] = this.widgetConfig.additional_parameters
                        .replaceAll('&amp;', '&')
                        .replaceAll('&#039;', "'")
                        .replaceAll('&lt;', '<')
                        .replaceAll('&gt;', '>');
                }
                return attrs;
            },
            getCustomer: function () {
                return this.customer();
            },
            afterRender: function () {
                window.BloomreachModules.pathwaysRecommendations.load();
            }
        });
});
