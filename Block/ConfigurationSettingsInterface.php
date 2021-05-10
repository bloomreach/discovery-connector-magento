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
 * @package Bloomreach\Connector\Block
 */
interface ConfigurationSettingsInterface
{
    /**
     * Store config path constants for settings tab
     */
    const SETTINGS_GENERAL_PATH = 'bloomreach_settings/general';
    const SETTINGS_ACC_ID = self::SETTINGS_GENERAL_PATH . '/accountid';
    const SETTINGS_AUTH_KEY = self::SETTINGS_GENERAL_PATH . '/auth_key';
    const SETTINGS_DOMAIN_KEY = self::SETTINGS_GENERAL_PATH . '/domain_key';
    const SETTINGS_TRACKING_COOKIE = self::SETTINGS_GENERAL_PATH . '/tracking_cookie';
    const SETTINGS_SEARCH_ENDPOINT = self::SETTINGS_GENERAL_PATH . '/search_endpoint';
    const SETTINGS_AUTOSUGGEST_ENDPOINT = self::SETTINGS_GENERAL_PATH . '/autosuggest_endpoint';

    /**
     * Store config path constant for Search Tab- Auto suggest
     */
    const SEARCH_AUTOSUGGEST_PATH = 'bloomreach_search/autosuggest';
    const SEARCH_ENABLED = self::SEARCH_AUTOSUGGEST_PATH . '/enabled';
    const SEARCH_CSS_SELECTOR = self::SEARCH_AUTOSUGGEST_PATH . '/css_selector';
    const SEARCH_SUGGESTED_TERM = self::SEARCH_AUTOSUGGEST_PATH . '/suggested_terms';
    const SEARCH_SUGGESTED_PRODUCTS = self::SEARCH_AUTOSUGGEST_PATH . '/suggested_products';
    const SEARCH_SUGGESTED_COLLECTION = self::SEARCH_AUTOSUGGEST_PATH . '/suggested_collection';
    const SEARCH_CUSTOM_CSS = self::SEARCH_AUTOSUGGEST_PATH . '/custom_css';

    /**
     * Store config path constant for Search Tab- Site Search
     */
    const SITESEARCH_PATH = 'bloomreach_search/sitesearch';
    const SITESEARCH_ENABLED = self::SITESEARCH_PATH . '/enabled';
    const SITESEARCH_CSS_SELECTOR = self::SITESEARCH_PATH . '/css_selector';
    const SITESEARCH_ITEM_PER_PAGE = self::SITESEARCH_PATH . '/items_per_page';
    const SITESEARCH_SHOW_VARIANTS = self::SITESEARCH_PATH . '/show_variants';
    const SITESEARCH_SHOW_FACETS = self::SITESEARCH_PATH . '/show_facets';
    const SITESEARCH_NO_OF_FACETS = self::SITESEARCH_PATH . '/no_of_facets';
    const SITESEARCH_NO_OF_FACET_OPTIONS = self::SITESEARCH_PATH . '/no_of_facet_options';
    const SITESEARCH_INFINITE_SCROLL = self::SITESEARCH_PATH . '/infinite_scroll';
    const SITESEARCH_CUSTOM_CSS = self::SITESEARCH_PATH . '/custom_css';

    /**
     * Store config path constant for Collections Tab
     */
    const COLLECTIONS_PATH = 'bloomreach_collections/general';
    const COLLECTIONS_ENABLED = self::COLLECTIONS_PATH . '/enabled';
    const COLLECTIONS_CSS_SELECTOR = self::COLLECTIONS_PATH . '/css_selector';
    const COLLECTIONS_ITEMS_PER_PAGE = self::COLLECTIONS_PATH . '/items_per_page';
    const COLLECTIONS_SHOW_FACETS = self::COLLECTIONS_PATH . '/show_facets';
    const COLLECTIONS_NO_OF_FACETS = self::COLLECTIONS_PATH . '/no_of_facets';
    const COLLECTIONS_NO_OF_FACET_OPTIONS = self::COLLECTIONS_PATH . '/no_of_facet_options';
    const COLLECTIONS_SHOW_VARIANTS = self::COLLECTIONS_PATH . '/show_variants';
    const COLLECTIONS_INFINITE_SCROLL = self::COLLECTIONS_PATH . '/infinite_scroll';
    const COLLECTIONS_CUSTOM_CSS = self::COLLECTIONS_PATH . '/custom_css';

    /**
     * Store config path constant for Recommendations Tab
     */
    const RECOMM_PATH = 'bloomreach_recommendations/general';
    const PIXEL_PATH = 'bloomreach_settings/pixel';
    const RECOMM_PIXEL_ENABLED = self::PIXEL_PATH . '/enable_pixel';
    const RECOMM_WIDGET_ENABLED = self::RECOMM_PATH . '/enable_recommendations';
}
