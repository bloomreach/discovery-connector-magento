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
            productSearchSdk:  'Bloomreach_Connector/js/product-search.8b0fce6d',
            collectionSdk:     'Bloomreach_Connector/js/category.67a7305c',
            autoSuggestSdk:    'Bloomreach_Connector/js/autosuggest.a2a8e13a',
            pathwaysRecomSdk:  'Bloomreach_Connector/js/pathways-and-recommendations.d003532d',
            productsEventsSdk: 'Bloomreach_Connector/js/product-events.4e698a52'
        }
    }
}
