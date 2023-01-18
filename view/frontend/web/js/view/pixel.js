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
define(['jquery','uiComponent','Magento_Customer/js/customer-data','productsEventsSdk'],
    function (jQuery, Component, customerData) {
        'use strict';
        // Get rid of the annoying jquery migration logs.
        jQuery.migrateMute = true;
        jQuery.migrateTrace = false;
        // This provides a means to identify when pixel has completed loading.
        // Thus allowing for pixel dependent portions of code to execute after
        // pixel has loaded.
        window.pixelReady = window.pixelReady || new Promise(r => (window.pixelResolve = r));
        // This is the query selector that discovers the add to cart button.
        const ADD_TO_CART_SELECTOR = 'form button.action.tocart';
        // Get the constants from the SDK to improve consistency
        const sdkConstants = window.BloomreachModules.constants;

        /**
         * This method looks through the available mapping found in the
         * bloomreach connector config data for a particular child product sku
         * based on picked attribute values. This will return void if there is
         * no mapping available or if the specified attributes just can't be
         * found.
         *
         * @param {Record<string, string>} attributeValues The { name: value }
         * to search for.
         */
        function getSimpleProductSkuFromAttributes(attributeValues) {
            const connectorData = window.bloomreachConnector || {};
            const config = connectorData.config || {};
            const events = config.events || {};
            const attributeMap = events.product_child_attributes_map;

            if (!attributeMap) return;

            // Loop the sku keys in the map
            for (const sku of Object.keys(attributeMap)) {
                const attributes = attributeMap[sku];
                let matches = 0;

                // Look through all provided attribute values to see if each is
                // present for this sku.
                for (let i = 0; i < attributeValues.length; ++i) {
                    const check = attributeValues[i];
                    const { id: checkId, name: checkName, value: checkValue } = check;
                    let values = attributes[checkName] || attributes[checkId];

                    // If we could not determine attribute values for our look
                    // ups, then we can't match this sku.
                    if (values === void 0) break;

                    if (Array.isArray(values) && values.includes(checkValue)) {
                        matches++;
                    }

                    else if (values === checkValue) {
                        matches++;
                    }
                }

                // If we found a match for ever provided attribute value, then
                // this is the sku associated with the provided attributes.
                if (matches === attributeValues.length) {
                    return sku;
                }
            }
        }

        return Component.extend({
            initialize: function (config) {
                this._super();
                this.widgetConfig = config.widgetConfig;
                this.productEventSdkUrl = config.productEventSdkUrl;
                this.customer = customerData.get('customer');
            },

            /**
             * Executes after DOM is ready but executes before pixel is loaded.
             * We use this to adjust the DOM to make our SDK register the pixel
             * events correctly.
             */
            afterRender: function () {
                this.initBaseEvents();
                this.initWidgetProductAttr();
                this.initPixelScript();

                // Force a Dom loaded event to ensure the pixel page view event
                // is fired.
                window.document.dispatchEvent(new Event("DOMContentLoaded", {
                    bubbles: true,
                    cancelable: true
                }));
            },

            /**
             * Registers all events that should exist prior to pixel executing.
             * This allows us to make adjustments to the pixel settings before
             * the pixel script executes.
             */
            initBaseEvents: async function () {
                // Finds the data-selector that specifies the super attributes
                // used
                const getAttributeId = function (jq) {
                    try {
                        const superAttr = jq.find('[data-selector]').attr('data-selector');
                        const id = superAttr.split('[').pop().split(']').shift();

                        return id;
                    }

                    catch (e) {
                        return;
                    }
                }

                const getAttributeMetricsFromField = function (jq) {
                    // Try to get the associated input control
                    let input = jq.find('[data-selector]')[0];

                    // If a normal control is not available, we can just try
                    // to find an immediate child and hope it has similar properties.
                    if (!input) {
                        input = jq.find('.control > *')[0];
                    }

                    if (!input) return;

                    let passValidation = true;
                    let optionSelected = input.value;
                    const isRequired = input.getAttribute('aria-required') === "true";

                    // Also check for the swatch solution
                    if (optionSelected === void 0) {
                        optionSelected = jq[0].dataset.optionSelected;
                    }

                    // Do a validation check based on if the field is required
                    // or not.
                    if (isRequired && optionSelected) {
                        passValidation = false;
                    }

                    return {
                        id: getAttributeId(jq),
                        name: jq[0].dataset.attributeCode || input.getAttribute("id"),
                        value: optionSelected,
                        required: isRequired,
                        passValidation
                    };
                }

                // This queries for all options the user has for picking from a
                // configurable product. This uses some varying strategies for a
                // wider range of support of magento versions.
                const getAttributesMetrics = function() {
                    const out = [];

                    // This is the check we can perform for the magento 2 Swatch
                    // options.
                    jQuery('.swatch-attribute').each(function() {
                        out.push(getAttributeMetricsFromField(jQuery(this)));
                    });

                    // This aggregates attributes for systems that have fields
                    // instead of swatch values
                    jQuery('.field.configurable').each(function() {
                        out.push(getAttributeMetricsFromField(jQuery(this)));
                    });

                    return out.filter(m => m !== void 0 && m !== null);
                };

                // Looks through the swatches/fields to determine if the add to
                // cart will execute or not.
                const checkValidation = function() {
                    const attributes = getAttributesMetrics();
                    console.log("VALIDATION", attributes);
                    // Not valid if an attribute does not pass validation
                    return !attributes.find(attr => !attr.passValidation);
                }

                // Handles when the user clicks the add to cart element. Checks
                // if the validations pass (ie - all required options/swatches
                // are selected)
                const handleClickAddToCart = function (event) {
                    let allowEvent = checkValidation();

                    jQuery(ADD_TO_CART_SELECTOR).each(function () {
                        const br_data = window.br_data || {};
                        // Adjust the event to be disabled if the validation
                        // fails.
                        jQuery(this).attr(sdkConstants.ADD_TO_CART_ATTRIBUTE_DISABLE, `${!allowEvent}`);

                        // Adjust the product sku and the product id
                        // NOTE: The following is a means for using the wrapping
                        // form to determine the product...This is not exactly a
                        // reliable solution and would need improving upon. The
                        // following also is a means to apply the product per
                        // add to cart available if multiple buttons are
                        // present.
                        // const form = jQuery(this).closest('form');
                        // jQuery(this).attr(sdkConstants.ADD_TO_CART_ATTRIBUTE_SKU, form.attr('data-product-sku'));
                        // jQuery(this).attr(sdkConstants.ADD_TO_CART_ATTRIBUTE_PROD_ID, form.attr('data-product-sku'));
                        // let itemName = jQuery(this).closest("li.product-item").find(".product-item-name").text();
                        // jQuery(this).attr('data-blm-add-to-cart-prod-name',
                        // itemName.trim());

                        // NOTE: For now we only support a single product
                        // selection with a single add to cart button. So we
                        // just apply the properties to the brtk configuration
                        // object for now.

                        // We only update the SKU as this is the only item that
                        // will change in the event of a configurable product vs
                        // simple product. If we are on a simple product page,
                        // there will be no child product attribute mapping
                        // which will blank this field out which is appropriate
                        // for simple product pages. This should only be
                        // populated in the event of a configurable product.
                        br_data.sku = getSimpleProductSkuFromAttributes(getAttributesMetrics());
                        jQuery(this).attr(sdkConstants.ADD_TO_CART_ATTRIBUTE_SKU, br_data.sku);
                    });
                };

                // We add an event to every add to cart button. This enables us
                // to do a quick check to see if the button being clicked will
                // pass validation. If it does not pass validation, then we will
                // disable the add to cart event that pixel would normally fire.
                jQuery(ADD_TO_CART_SELECTOR).each(function() {
                    jQuery(this).on('click', handleClickAddToCart);
                });
            },

            /**
             * Loads in the pixel. This should be executed after the widget init
             * so the dom will be prepped for the SDK.
             */
            initPixelScript: async function () {
                br_data.user_id = this.customer().uniqueId ? this.customer().uniqueId : "";
                let brtrk = document.createElement("script");
                brtrk.addEventListener('load', function() {
                    window.pixelResolve();
                });
                brtrk.type = "text/javascript";
                brtrk.async = true;
                brtrk.src = "//cdn.brcdn.com/v1/br-trk-"+this.widgetConfig.account_id+".js";
                let s = document.getElementsByTagName("script")[0];
                s.parentNode.insertBefore(brtrk, s);
            },

            /**
             * This flags the components rendered by Magento to be tracked by
             * the pixel sdk.
             */
            initWidgetProductAttr: async function () {
                try {
                    jQuery(ADD_TO_CART_SELECTOR).each(function () {
                        jQuery(this).attr(sdkConstants.ADD_TO_CART_ATTRIBUTE_NAME, '');
                    });
                }catch (e) {
                    console.warn(e);
                }
            }
        });
    });
