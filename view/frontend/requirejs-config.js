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
/*require.config({
    paths: {
        dropin: 'https://js.braintreegateway.com/web/dropin/1.14.1/js/dropin.min'
    }
});*/

var config = {
    map: {
        '*': {
            productSearchSdk:  'Bloomreach_Connector/js/product-search',
            collectionSdk:     'Bloomreach_Connector/js/category',
            autoSuggestSdk:    'Bloomreach_Connector/js/autosuggest',
            pathwaysRecomSdk:  'Bloomreach_Connector/js/pathways-and-recommendations',
            productsEventsSdk: 'Bloomreach_Connector/js/product-events'
        }
    }
}
