<?php
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
namespace Bloomreach\Connector\Block;

/**
 * Interface ConfigurationSettingsInterface
 * package Bloomreach\Connector\Block
 */
interface ConfigurationSettingsInterface
{
    /**
     * Store config path public constants for settings tab
     */
    public const SETTINGS_GENERAL_PATH = 'bloomreach_settings/general';
    public const SETTINGS_ACC_ID = self::SETTINGS_GENERAL_PATH . '/accountid';
    public const SETTINGS_AUTH_KEY = self::SETTINGS_GENERAL_PATH . '/auth_key';
    public const SETTINGS_DOMAIN_KEY = self::SETTINGS_GENERAL_PATH . '/domain_key';
    public const SETTINGS_TRACKING_COOKIE = self::SETTINGS_GENERAL_PATH . '/tracking_cookie';
    public const SETTINGS_SEARCH_ENDPOINT = self::SETTINGS_GENERAL_PATH . '/search_endpoint';
    public const SETTINGS_AUTOSUGGEST_ENDPOINT = self::SETTINGS_GENERAL_PATH . '/autosuggest_endpoint';

    /**
     * Store config path public constants for settings endpoint tab
     */
    public const SETTINGS_APIURL_PATH = 'bloomreach_settings/api_url';
    public const SETTINGS_ENDPOINT_AUTOSUGGEST = self::SETTINGS_APIURL_PATH . '/autosuggest_endpoint';
    public const SETTINGS_ENDPOINT_SEARCH = self::SETTINGS_APIURL_PATH . '/search_endpoint';
    public const SETTINGS_ENDPOINT_CATEGORY = self::SETTINGS_APIURL_PATH . '/category_endpoint';
    public const SETTINGS_ENDPOINT_WIDGETS = self::SETTINGS_APIURL_PATH . '/widgets_endpoint';
    public const SETTINGS_CATALOG_VIEWS = self::SETTINGS_APIURL_PATH . '/catalog_views';

    /**
     * Store config path public constant for Search Tab- Auto suggest
     */
    public const SEARCH_AUTOSUGGEST_PATH = 'bloomreach_search/autosuggest';
    public const SEARCH_ENABLED = self::SEARCH_AUTOSUGGEST_PATH . '/enabled';
    public const SEARCH_CSS_SELECTOR = self::SEARCH_AUTOSUGGEST_PATH . '/css_selector';
    public const SEARCH_SUGGESTED_TERM = self::SEARCH_AUTOSUGGEST_PATH . '/suggested_terms';
    public const SEARCH_SUGGESTED_PRODUCTS = self::SEARCH_AUTOSUGGEST_PATH . '/suggested_products';
    public const SEARCH_SUGGESTED_COLLECTION = self::SEARCH_AUTOSUGGEST_PATH . '/suggested_collection';
    public const SEARCH_CUSTOM_CSS = self::SEARCH_AUTOSUGGEST_PATH . '/custom_css';
    public const SEARCH_TEMPLATE_MAIN = self::SEARCH_AUTOSUGGEST_PATH . '/main_template_text';

    /**
     * Store config path public constant for Search Tab- Site Search
     */
    public const SITESEARCH_PATH = 'bloomreach_search/sitesearch';
    public const SITESEARCH_ENABLED = self::SITESEARCH_PATH . '/enabled';
    public const SITESEARCH_CSS_SELECTOR = self::SITESEARCH_PATH . '/css_selector';
    public const SITESEARCH_ITEM_PER_PAGE = self::SITESEARCH_PATH . '/items_per_page';
    public const SITESEARCH_SHOW_VARIANTS = self::SITESEARCH_PATH . '/show_variants';
    public const SITESEARCH_SHOW_FACETS = self::SITESEARCH_PATH . '/show_facets';
    public const SITESEARCH_NO_OF_FACETS = self::SITESEARCH_PATH . '/no_of_facets';
    public const SITESEARCH_NO_OF_FACET_OPTIONS = self::SITESEARCH_PATH . '/no_of_facet_options';
    public const SITESEARCH_INFINITE_SCROLL = self::SITESEARCH_PATH . '/infinite_scroll';
    public const SITESEARCH_CUSTOM_CSS = self::SITESEARCH_PATH . '/custom_css';
    public const SITESEARCH_FIELD_LIST = self::SITESEARCH_PATH . '/field_list';
    public const SITESEARCH_TEMPLATE_MAIN = self::SITESEARCH_PATH . '/main_template_text';
    public const SITESEARCH_TEMPLATE_PRODUCTLIST = self::SITESEARCH_PATH . '/productlist_template_text';

    /**
     * Store config path public constant for Collections Tab
     */
    public const COLLECTIONS_PATH = 'bloomreach_collections/general';
    public const COLLECTIONS_ENABLED = self::COLLECTIONS_PATH . '/enabled';
    public const COLLECTIONS_CSS_SELECTOR = self::COLLECTIONS_PATH . '/css_selector';
    public const COLLECTIONS_ITEMS_PER_PAGE = self::COLLECTIONS_PATH . '/items_per_page';
    public const COLLECTIONS_SHOW_FACETS = self::COLLECTIONS_PATH . '/show_facets';
    public const COLLECTIONS_NO_OF_FACETS = self::COLLECTIONS_PATH . '/no_of_facets';
    public const COLLECTIONS_NO_OF_FACET_OPTIONS = self::COLLECTIONS_PATH . '/no_of_facet_options';
    public const COLLECTIONS_SHOW_VARIANTS = self::COLLECTIONS_PATH . '/show_variants';
    public const COLLECTIONS_INFINITE_SCROLL = self::COLLECTIONS_PATH . '/infinite_scroll';
    public const COLLECTIONS_CUSTOM_CSS = self::COLLECTIONS_PATH . '/custom_css';
    public const COLLECTIONS_TEMPLATE_MAIN = self::COLLECTIONS_PATH . '/main_template_text';
    public const COLLECTIONS_TEMPLATE_PRODUCTLIST = self::COLLECTIONS_PATH . '/productlist_template_text';
    public const COLLECTIONS_FIELD_LIST = self::COLLECTIONS_PATH . '/field_list';

    /**
     * Store config path public constant for Recommendations Tab
     */
    public const RECOMM_PATH = 'bloomreach_recommendations/general';
    public const PIXEL_PATH = 'bloomreach_settings/pixel';
    public const RECOMM_PIXEL_ENABLED = self::PIXEL_PATH . '/enable_pixel';
    public const RECOMM_WIDGET_ENABLED = self::RECOMM_PATH . '/enable_recommendations';
    public const RECOMM_FIELD_LIST = self::RECOMM_PATH . '/field_list';
    public const RECOMM_CUSTOM_CSS = self::RECOMM_PATH . '/custom_css';
    public const RECOMM_TEMPLATE_TEXT = self::RECOMM_PATH . '/template_text';

    public const STAGING_API_ENDPOINT_WIDGET = 'https://pathways-staging.dxpapi.com/api/v2/widgets/';
    public const STAGING_API_ENDPOINT_AUTOSUGGEST = 'https://staging-suggest.dxpapi.com/api/v2/suggest/';
    public const STAGING_API_ENDPOINT_SEARCH = 'https://staging-core.dxpapi.com/api/v1/core/';
    public const STAGING_API_ENDPOINT_COLLECTION = 'https://staging-core.dxpapi.com/api/v1/core/';

    public const PRODUCTION_API_ENDPOINT_WIDGET = 'https://pathways.dxpapi.com/api/v2/widgets/';
    public const PRODUCTION_API_ENDPOINT_AUTOSUGGEST = 'https://suggest.dxpapi.com/api/v2/suggest/';
    public const PRODUCTION_API_ENDPOINT_SEARCH = 'https://core.dxpapi.com/api/v1/core/';
    public const PRODUCTION_API_ENDPOINT_COLLECTION = 'https://core.dxpapi.com/api/v1/core/';
}
