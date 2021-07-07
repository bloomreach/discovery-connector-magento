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

namespace Bloomreach\Connector\ViewModel\Head;

use Bloomreach\Connector\Block\ConfigurationSettingsInterface;

//use Magento\Catalog\Model\Session as CatalogSession;
use Magento\Checkout\Model\Session;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Request\Http;
use Magento\Framework\Registry;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Sales\Model\Order;
use Magento\Store\Model\ScopeInterface;

/**
 * Class ScriptInit
 * @package Bloomreach\Connector\ViewModel\Head
 */
class ScriptInit implements ArgumentInterface, ConfigurationSettingsInterface
{
    /**
     * @var string
     */
    protected $_accId='';

    /**
     * @var string
     */
    protected $_domainKey='';

    /**
     * @var string
     */
    protected $_authKey='';

    /**
     * @var string
     */
    protected $_trackingCookie='';

    /**
     * @var string
     */
    protected $_searchEp='';

    /**
     * @var string
     */
    protected $_autoSuggestEp='';

    /**
     * @var ScopeConfigInterface
     */
    protected ScopeConfigInterface $scopeConfig;

    /**
     * Recipient email config path
     */
    const XML_PATH_EMAIL_RECIPIENT = 'contact/email/recipient_email';

    /**
     * @var Http
     */
    private Http $request;

    /**
     * @var Registry
     */
    protected Registry $registry;

    /**
     * @var Session
     */
    protected Session $_checkoutSession;

    /**
     * @var Json
     */
    private Json $jsonSerializer;

    /**
     * ScriptInit constructor.
     * @param ScopeConfigInterface $scopeConfig
     * @param Http $request
     * @param Registry $registry
     * @param Session $checkoutSession
     * @param Json $jsonSerializer
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
        Http $request,
        Registry $registry,
        Session $checkoutSession,
        Json $jsonSerializer
    ) {
        $this->scopeConfig = $scopeConfig;
        $this->request = $request;
        $this->registry = $registry;
        $this->_checkoutSession = $checkoutSession;
        $this->jsonSerializer = $jsonSerializer;
        $this->initAppSetting();
    }

    /**
     * Get Current page name
     * @return string
     */
    public function getCurrentPageName(): string
    {
        $response = '';
        $fullActionName = $this->request->getFullActionName();
        switch ($fullActionName) {
            case 'catalog_product_view':
                $response = 'product';
                break;
            case 'catalog_category_view':
                $response = 'category';
                break;
            case 'checkout_cart_index':
                $response = 'cart';
                break;
            case 'catalogsearch_result_index':
                $response = 'search';
                break;
            case 'cms_index_index':
                $response = 'homepage';
                break;
            case 'cms_page_view':
                $response = 'content';
                break;
            case 'checkout_onepage_success':
                $response = 'checkout_success';
                break;
            default:
                $response = 'other';
                break;
        }
        return $response;
    }

    /**
     * Get last placed order, it works only on order success page
     * @return Order
     */
    public function getLastRealOrder()
    {
        return $this->_checkoutSession->getLastRealOrder();
    }

    /**
     * Get order line items json data
     * @param Order $order
     * @return bool|string
     */
    public function getOrderLineItemJson(Order $order)
    {
        $response = false;
        if ($order->getId()) {
            $orderItems = $order->getAllVisibleItems();
            $response = [];
            foreach ($orderItems as $_item) {
                $response[] = [
                    "prod_id" => $_item->getProduct()->getId(),
                    "sku" => $_item->getSku(),
                    "name" => $_item->getName(),
                    "quantity" => sprintf('%.2f', $_item->getQtyOrdered()),
                    "price" => sprintf('%.2f', $_item->getPriceInclTax())
                ];
            }
            return $this->jsonSerializer->serialize($response);
        }
        return $response;
    }

    /*public function getCatalogSession()
    {
        return $this->catalogSession;
    } */

    /**
     * Get current category id
     * @return mixed
     */
    public function getCurrentCategory()
    {
        return $this->registry->registry('current_category');
    }

    /**
     * Check if infinite scroll enabled for search
     * @return int
     */
    public function isSearchInfiniteScrollEnabled()
    {
        if ($this->isMobileDevice()) {
            return 0;
        }
        return 1 == $this->getStoreConfigValue(self::SITESEARCH_INFINITE_SCROLL) ? 1 : 0;
    }

    /**
     * Check if infinite scroll enabled for collection
     * @return int
     */
    public function isCollectionInfiniteScrollEnabled()
    {
        if ($this->isMobileDevice()) {
            return 0;
        }
        return 1 == $this->getStoreConfigValue(self::COLLECTIONS_INFINITE_SCROLL) ? 1 : 0;
    }

    /**
     * Check if device is mobile
     * @return bool
     */
    public function isMobileDevice()
    {
        $ua = strtolower($this->request->getServer('HTTP_USER_AGENT'));
        return is_numeric(strpos($ua, "mobile"));
    }

    /**
     * Get current product id
     * @return mixed
     */
    public function getCurrentProduct()
    {
        return $this->registry->registry('current_product');
    }

    /**
     * Check if current page is search result page
     * @return bool
     */
    public function isSearchResultPage(): bool
    {
        return 'search' === $this->getCurrentPageName();
    }

    /**
     * get loaded page title
     * @param $block
     * @return string
     */
    public function getCurrentPageTitle($block)
    {
        $response = '';
        try {
            $response = $block->getLayout()->getBlock('page.main.title')->getPageTitle();
        } catch (\Exception $e) {
        }
        return $response;
    }

    /**
     * Get current loaded CMS page, when visitor is on a cms page
     * @param $block
     * @return string
     */
    public function getCurrentCmsPage($block)
    {
        $response = '';
        try {
            $response = $block->getLayout()->getBlock('cms_page')->getPage();
        } catch (\Exception $e) {
        }
        return $response;
    }

    /**
     * Get Search Term
     * @return mixed|string
     */
    public function getSearchTerm()
    {
        $response = '';
        if ($this->isSearchResultPage()) {
            $response = $this->request->getParam('q');
        }
        return $response;
    }

    /**
     * Check if current page is search result page
     * @return bool
     */
    public function isProductListingPage()
    {
        return 'category' === $this->getCurrentPageName();
    }

    /**
     *returning store config value
     **/
    public function getStoreConfigValue($path)
    {
        $storeScope = ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue($path, $storeScope);
    }

    /**
     * Check if search is enabled
     * @return bool
     */
    public function isCollectionEnabled()
    {
        $val = $this->getStoreConfigValue(self::COLLECTIONS_ENABLED);
        return (1 == $val);
    }

    /**
     * Check if search is enabled
     * @return bool
     */
    public function isSearchEnabled()
    {
        $val = $this->getStoreConfigValue(self::SITESEARCH_ENABLED);
        return (1 == $val);
    }

    /**
     * Check if auto suggest is enabled
     * @return bool
     */
    public function isAutoSuggestEnabled()
    {
        $val = $this->getStoreConfigValue(self::SEARCH_ENABLED);
        return (1 == $val);
    }

    /**
     * Check if pixel is enabled
     * @return bool
     */
    public function isPixelEnabled()
    {
        $val = $this->getStoreConfigValue(self::RECOMM_PIXEL_ENABLED);
        return 1 == $val;
    }

    /**
     * Check if recommendation widget is enabled
     * @return bool
     */
    public function isRecommendationWidgetEnabled()
    {
        // $isPixelEnabled = $this->isPixelEnabled();
        $val = $this->getStoreConfigValue(self::RECOMM_WIDGET_ENABLED);
        return 1 == $val;
    }

    /**
     * Initialise settings tab option values
     * @return void
     */
    public function initAppSetting()
    {
        if (!$this->_accId) {
            $this->_accId = $this->getStoreConfigValue(self::SETTINGS_ACC_ID);
        }
        if (!$this->_authKey) {
            $this->_authKey = $this->getStoreConfigValue(self::SETTINGS_AUTH_KEY);
        }
        if (!$this->_domainKey) {
            $this->_domainKey = $this->getStoreConfigValue(self::SETTINGS_DOMAIN_KEY);
        }
        if (!$this->_trackingCookie) {
            $this->_trackingCookie = $this->getStoreConfigValue(self::SETTINGS_TRACKING_COOKIE);
        }
        /*if (!$this->_searchEp) {
            $this->_searchEp = $this->getStoreConfigValue(self::SETTINGS_SEARCH_ENDPOINT);
        }*/
        /*if (!$this->_autoSuggestEp) {
            $this->_autoSuggestEp = $this->getStoreConfigValue(self::SETTINGS_AUTOSUGGEST_ENDPOINT);
        }*/
    }

    /**
     * Get Setting Account Id
     * @return string
     */
    public function getAccountId()
    {
        return $this->_accId;
    }

    /**
     * Get Setting Auth Key
     * @return string
     */
    public function getAuthKey()
    {
        return $this->_authKey;
    }

    /**
     * Get Setting Domain Key
     * @return string
     */
    public function getDomainKey()
    {
        return $this->_domainKey;
    }

    /**
     * Get Setting Tracking Cookie
     * @return string
     */
    public function getTrackingCookie()
    {
        return $this->_trackingCookie;
    }

    /**
     * Get Setting Search End Point Url
     * @return string
     */
    public function getSearchEpUrl()
    {
        return '';//$this->_searchEp;
    }

    /**
     * Get Setting Auto Suggest End Point Url
     * @return string
     */
    public function getAutoSuggestEpUrl()
    {
        return '';//$this->_autoSuggestEp;
    }

    /**
     * Can init script
     * if all settings tab options are not empty then return true
     * @return bool
     */
    public function canInitScript(): bool
    {
        return !empty($this->_accId) && !empty($this->_authKey) && !empty($this->_domainKey) && !empty($this->_trackingCookie);
    }

}
