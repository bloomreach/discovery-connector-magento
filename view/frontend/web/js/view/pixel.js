/**
 * Copyright ©Bloomreach. All rights reserved.
 * See LICENSE.txt for license details.
 */
define(['jquery','uiComponent','Magento_Customer/js/customer-data','productsEventsSdk'],
    function (jQuery, Component, customerData) {
        'use strict';
        return Component.extend({
            initialize: function (config) {
                this._super();
                this.widgetConfig = config.widgetConfig;
                this.productEventSdkUrl = config.productEventSdkUrl;
                this.customer = customerData.get('customer');
            },
            initPixelScript: function () {
                br_data.user_id = this.customer().uniqueId;
                let brtrk = document.createElement("script");
                brtrk.type = "text/javascript";
                brtrk.async = true;
                brtrk.src = "//cdn.brcdn.com/v1/br-trk-"+this.widgetConfig.account_id+".js";
                let s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(brtrk, s);
            },
            afterRender: function () {
                this.initWidgetProductAttr();
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true
                }));
                /*if(typeof window.BloomreachModules.events !='undefined'){
                    window.BloomreachModules.events.load();
                }*/
            },
            initWidgetProductAttr: function () {
                try {
                    jQuery('.block.widget.block-products-list li.product-item form[data-role="tocart-form"] button.action.tocart.primary').each(function () {
                        var form = jQuery(this).closest('form');
                        jQuery(this).attr('data-blm-add-to-cart', '');
                        jQuery(this).attr('data-blm-add-to-cart-sku', form.attr('data-product-sku'));
                        jQuery(this).attr('data-blm-add-to-cart-prod-id', form.find('input[name="product"]').val());
                        jQuery(this).attr('data-blm-add-to-cart-prod-name', jQuery.trim(jQuery(this).closest("li.product-item").find(".product-item-name").text()));
                    });
                }catch (e) {
                    console.log(e);
                }
            }
        });
    });
