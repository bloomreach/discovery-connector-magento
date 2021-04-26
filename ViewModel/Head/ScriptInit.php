<?php
namespace Bloomreach\Connector\ViewModel\Head;

use Bloomreach\Connector\Block\ConfigurationSettingsInterface;
//use Magento\Catalog\Model\Session as CatalogSession;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Request\Http;
use Magento\Framework\Registry;
use Magento\Framework\View\Element\Block\ArgumentInterface;

class ScriptInit implements ArgumentInterface, ConfigurationSettingsInterface
{
    protected $_accId;
    protected $_domainKey;
    protected $_authKey;
    protected $_trackingCookie;
    protected $_searchEp;
    protected $_autoSuggestEp;

    /**
     * @var ScopeConfigInterface
     */
    protected ScopeConfigInterface $scopeConfig;

    /**
     * Recipient email config path
     */
    const XML_PATH_EMAIL_RECIPIENT = 'contact/email/recipient_email';
    private Http $request;
    protected Registry $registry;

    /**
     * ScriptInit constructor.
     * @param ScopeConfigInterface $scopeConfig
     * @param Http $registry
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
        Http $request,
        Registry $registry
    ) {
        $this->scopeConfig = $scopeConfig;
        $this->request = $request;
        $this->registry = $registry;
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
            default:
                $response = 'other';
                break;
        }
        return $response;
    }

    /**
     * Get catalog session
     * @return CatalogSession
     */
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
     * Check if current page is search result page
     * @return bool
     */
    public function isProductListingPage(): bool
    {
        return 'category' === $this->getCurrentPageName();
    }

    /**
     * Sample function returning config value
     **/
    public function getStoreConfigValue($path)
    {
        $storeScope = \Magento\Store\Model\ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue($path, $storeScope);
    }

    /**
     * Check if search is enabled
     * @return bool
     */
    public function isCollectionEnabled()
    {
        $val = $this->getStoreConfigValue(self::COLLECTIONS_ENABLED);
        return (1==$val);
    }

    /**
     * Check if search is enabled
     * @return bool
     */
    public function isSearchEnabled()
    {
        $val = $this->getStoreConfigValue(self::SITESEARCH_ENABLED);
        return (1==$val);
    }

    /**
     * Check if auto suggest is enabled
     * @return bool
     */
    public function isAutoSuggestEnabled()
    {
        $val = $this->getStoreConfigValue(self::SEARCH_ENABLED);
        return (1==$val);
    }

    /**
     * Check if pixel is enabled
     * @return bool
     */
    public function isPixelEnabled()
    {
        $val = $this->getStoreConfigValue(self::RECOMM_PIXEL_ENABLED);
        return 1==$val;
    }

    /**
     * Check if recommendation widget is enabled
     * @return bool
     */
    public function isRecommendationWidgetEnabled()
    {
        $isPixelEnabled = $this->isPixelEnabled();
        $val = $this->getStoreConfigValue(self::RECOMM_WIDGET_ENABLED);
        return $isPixelEnabled && (1==$val);
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
        if (!$this->_searchEp) {
            $this->_searchEp = $this->getStoreConfigValue(self::SETTINGS_SEARCH_ENDPOINT);
        }
        if (!$this->_autoSuggestEp) {
            $this->_autoSuggestEp = $this->getStoreConfigValue(self::SETTINGS_AUTOSUGGEST_ENDPOINT);
        }
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
        return $this->_searchEp;
    }

    /**
     * Get Setting Auto Suggest End Point Url
     * @return string
     */
    public function getAutoSuggestEpUrl()
    {
        return $this->_autoSuggestEp;
    }

    /**
     * Can init script
     * if all settings tab options are not empty then return true
     * @return bool
     */
    public function canInitScript(): bool
    {
        return !empty($this->_accId) && !empty($this->_authKey) && !empty($this->_domainKey) && !empty($this->_trackingCookie) && !empty($this->_searchEp) && !empty($this->_autoSuggestEp);
    }
}
