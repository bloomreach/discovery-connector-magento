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
use Magento\Checkout\Model\Session as CheckoutSession;
use Magento\Customer\Model\Session as CustomerSession;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Request\Http;
use Magento\Framework\Serialize\Serializer\Json;
use Magento\Framework\View\Element\Block\ArgumentInterface;
use Magento\Sales\Model\Order;
use Magento\Store\Model\ScopeInterface;
use Psr\Log\LoggerInterface;
use Magento\Catalog\Helper\Data;
use Magento\Catalog\Block\Category\View;
use Magento\ConfigurableProduct\Model\Product\Type\Configurable;
use Magento\GroupedProduct\Model\Product\Type\Grouped;
use Magento\Swatches\Helper\Data as SwatchHelper;
use Magento\Catalog\Model\Layer\Resolver;
use Magento\Framework\App\Utility\Files;
use Magento\Framework\Filesystem\Driver;
use Magento\Framework\Stdlib\CookieManagerInterface;
use Magento\Customer\Model\Visitor;
use Magento\Customer\Model\SessionFactory;
use Magento\Store\Model\StoreManagerInterface;
use Magento\Framework\App\ObjectManager;
use Magento\Framework\Pricing\PriceCurrencyInterface;
use Magento\Directory\Model\Currency;


/**
 * Class ScriptInit
 * package Bloomreach\Connector\ViewModel\Head
 */
class ScriptInit implements ArgumentInterface, ConfigurationSettingsInterface
{
    public const XML_PATH_EMAIL_RECIPIENT = 'contact/email/recipient_email';

    protected $_accId = '';
    protected $_domainKey = '';
    protected $_authKey = '';
    protected $_trackingCookie = '';
    protected $_searchEp = '';
    protected $_autoSuggestEp = '';
    protected $_currencySymbol = '';

    protected $scopeConfig;
    private $request;
    protected $checkoutSession;
    private $jsonSerializer;
    private $logger;
    private $catalogHelper;
    private $categoryView;
    private $configurable;
    private $grouped;
    private $swatchHelper;
    private $catalogLayer;
    private $files;
    private $cookieManager;
    private $visitor;
    private $customerSession;
    private $sessionFactory;
    private $storeManager;
    private $priceCurrency;
    private $currency;

    /**
     * ScriptInit constructor.
     * @param ScopeConfigInterface $scopeConfig
     * @param Http $request
     * @param Session $checkoutSession
     * @param Json $jsonSerializer
     * @param LoggerInterface $logger
     * @param Data $catalogHelper
     * @param View $categoryView
     */
    public function __construct(
        ScopeConfigInterface $scopeConfig,
        Http $request,
        CheckoutSession $checkoutSession,
        Json $jsonSerializer,
        LoggerInterface $logger,
        Data $catalogHelper,
        View $categoryView,
        Configurable $configurable,
        Grouped $grouped,
        SwatchHelper $swatchHelper,
        Resolver $layerResolver,
        Files $files,
        CookieManagerInterface $cookieManager,
        Visitor $visitor,
        CustomerSession $customerSession,
        SessionFactory $sessionFactory,
        StoreManagerInterface $storeManager,
        PriceCurrencyInterface $priceCurrency,
        Currency $currency
    ) {
        $this->scopeConfig = $scopeConfig;
        $this->request = $request;
        $this->checkoutSession = $checkoutSession;
        $this->jsonSerializer = $jsonSerializer;
        $this->logger = $logger;
        $this->catalogHelper = $catalogHelper;
        $this->categoryView = $categoryView;
        $this->configurable = $configurable;
        $this->grouped = $grouped;
        $this->swatchHelper = $swatchHelper;
        $this->catalogLayer = $layerResolver->get();
        $this->files = $files;
        $this->cookieManager = $cookieManager;
        $this->visitor = $visitor;
        $this->customerSession = $customerSession;
        $this->sessionFactory = $sessionFactory;
        $this->storeManager = $storeManager;
        $this->priceCurrency = $priceCurrency;
        $this->currency = $currency;
        $this->initAppSetting();
    }

    public function getVersion()
    {
        try {
            $pathToNeededModule = realpath(__DIR__ . "/../../composer.json");

            if ($pathToNeededModule) {
                $content = file_get_contents($pathToNeededModule);

                if ($content) {
                    $jsonContent = json_decode($content, true);

                    if (!empty($jsonContent['version'])) {
                        return $jsonContent['version'];
                    }
                }
            }

            return null;
        } catch (\Exception $e) {
            return "Unable to determine version";
        }
    }

    public function hasProduct()
    {
        $product = $this->catalogHelper->getProduct();
        if ($product) {
            return true;
        }
        return false;
    }

    /**
     * Checks if this is a parent product by seeing if this product has any children.
     */
    public function isParentProduct()
    {
        $product = $this->catalogHelper->getProduct();
        if ($product) {
            $childIds = $this->configurable->getChildrenIds($product->getId());
            if (empty($childIds)) {
                $childIds = $this->grouped->getChildrenIds($product->getId());
            }
            if (empty($childIds)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Checks if this is a child product by seeing if this product has any
     * parents.
     */
    public function isChildProduct()
    {
        $product = $this->catalogHelper->getProduct();
        if ($product) {
            $parentIds = $this->configurable->getParentIdsByChild($product->getId());
            if (empty($parentIds)) {
                $parentIds = $this->grouped->getParentIdsByChild($product->getId());
            }
            if (empty($parentIds)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get the current magento product child product ids mapped to their sku
     * numbers.
     */
    public function getChildProductIdSkuMap()
    {
        // if ($this->isChildProduct()) return "Not a parent product";

        $product = $this->catalogHelper->getProduct();
        if (!$product)
            return "";

        $childProducts = $this->configurable->getUsedProducts($product);

        if (empty($childProducts)) {
            $childProducts = $this->grouped->getAssociatedProducts($product);
        }

        $childProductIds = [];
        foreach ($childProducts as $childProduct) {
            $childProductIds[$childProduct->getId()] = $childProduct->getSku();
        }

        return $this->jsonSerializer->serialize($childProductIds);
    }

    /**
     * Get the current magento child product sku to it's name.
     */
    public function getChildProductNameMap()
    {
        // if ($this->isChildProduct()) return "Not a parent product";

        $product = $this->catalogHelper->getProduct();
        if (!$product)
            return "";

        $childProducts = $this->configurable->getUsedProducts($product);

        if (empty($childProducts)) {
            $childProducts = $this->grouped->getAssociatedProducts($product);
        }

        $childProductIds = [];
        foreach ($childProducts as $childProduct) {
            $childProductIds[$childProduct->getSku()] = $childProduct->getName();
        }

        return $this->jsonSerializer->serialize($childProductIds);
    }

    /**
     * This provides a map of product attribute ids to the attribute's name.
     */
    public function getProductAttributeIdToName()
    {
        $product = $this->catalogHelper->getProduct();
        if (!$product)
            return "";

        $attributes = $product->getAttributes();

        $attrIds = [];
        foreach ($attributes as $attr) {
            $attrIds[$attr->getAttributeId()] = $attr->getName();
        }

        return $this->jsonSerializer->serialize($attrIds);
    }

    /**
     * This generates a map of child product SKU numbers to the available swatch
     * attribute values for that product. Making this mapping available will
     * allow the client to analyze
     */
    public function getChildProductAttributesMap()
    {
        try {
            $product = $this->catalogHelper->getProduct();
            if (!$product)
                return "";

            $childProducts = $this->configurable->getUsedProducts($product);

            if (empty($childProducts)) {
                $childProducts = $this->grouped->getAssociatedProducts($product);
            }

            if (empty($childProducts))
                return "";

            $childProductAttributes = [];

            foreach ($childProducts as $childProduct) {
                if ($childProduct == null)
                    continue;

                $attrIds = [];
                $attributes = $childProduct->getAttributes();

                // Retrieve the value of the attribute for the simple product
                foreach ($attributes as $attr) {
                    $values = (array) $childProduct->getData($attr->getName());

                    if (!empty($values) && ($this->swatchHelper->isSwatchAttribute($attr) || $attr->getIsVisibleOnFront())) {
                        // Look up via name or via attribute id
                        $attrIds[$attr->getName()] = $values;
                        $attrIds[$attr->getId()] = $values;
                    }
                }

                $childProductAttributes[$childProduct->getSku()] = $attrIds;
            }

            return $this->jsonSerializer->serialize($childProductAttributes);
        } catch (\Exception $e) {
            return "";
        }
    }

    /**
     * Get the current magento product sku number
     */
    public function getProductSku()
    {
        $product = $this->catalogHelper->getProduct();
        if ($product) {
            return $product->getSku();
        }
        return '';
    }

    /**
     * Get the current magento parent product sku number or list of numbers if
     * it is located under multiple products.
     */
    public function getParentProductSku()
    {
        $product = $this->catalogHelper->getProduct();
        if ($product) {
            $parentIds = $this->configurable->getParentIdsByChild($product->getId());

            if (empty($parentIds)) {
                $parentIds = $this->grouped->getParentIdsByChild($product->getId());
            }

            if (!empty($parentIds)) {
                $parentProducts = $this->catalogHelper->getProduct($parentIds[0]);
                return $parentProducts->getSku();
            }
        }
        return '';
    }

    /**
     * The pixel prod ID should always be the base product id which will be the
     * parent product sku if it exists. If the parent sku does not exist, we use
     * the simple product sku of the current product.
     */
    public function getPixelProdId()
    {
        $product = $this->catalogHelper->getProduct();
        if ($product) {
            $parentIds = $this->configurable->getParentIdsByChild($product->getId());

            // TODO: This is an attempted fail safe for group products. Picking
            //  the first id of the the group product may not be correct for the
            //  business use case.
            if (empty($parentIds)) {
                $parentIds = $this->grouped->getParentIdsByChild($product->getId());
            }

            // If we have parents, get the first available parent product for
            // it's sku number.
            if (!empty($parentIds)) {
                $parentProducts = $this->catalogHelper->getProduct($parentIds[0]);
                return $parentProducts->getSku();
            }

            // Otherwise, use the sku of the product
            else {
                return $product->getSku();
            }
        }
        return '';
    }

    /**
     * The pixel sku should be the product sku if the product is a simple
     * product (is the child of a parent). If this product is a parent, then sku
     * should be empty.
     */
    public function getPixelSku()
    {
        if ($this->isChildProduct()) {
            return $this->getProductSku();
        }
        return '';
    }

    /**
     * This will load the current product collection displayed on the user's
     * screen and generate metrics for each of those products.
     */
    public function getProductCollectionMetrics()
    {
        $productCollection = $this->catalogLayer->getProductCollection();
        $productIds = [];

        foreach ($productCollection as $product) {
            $productIds[] = $product->getId();
        }
        return $productIds;
    }

    /**
     * Get Current page name
     *
     * @return string
     */
    public function getCurrentPageName()
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
     *
     * @return Order
     */
    public function getLastRealOrder()
    {
        return $this->checkoutSession->getLastRealOrder();
    }

    /**
     * Get order line items json data
     *
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
                    "prod_id" => $_item->getProduct()->getSku(),
                    "sku" => ($_item->getSku() == $_item->getProduct()->getSku()) ? "" : $_item->getSku(),
                    "name" => $_item->getName(),
                    "quantity" => sprintf('%.2f', $_item->getQtyOrdered()),
                    "price" => sprintf('%.2f', $_item->getPriceInclTax())
                ];
            }
            return $this->jsonSerializer->serialize($response);
        }
        return $response;
    }

    /**
     * Get current category id
     *
     * @return mixed
     */
    public function getCurrentCategory()
    {
        return $this->categoryView->getCurrentCategory();
    }

    /**
     * Check if infinite scroll enabled for search
     *
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
     *
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
     *
     * @return bool
     */
    public function isMobileDevice()
    {
        $ua = strtolower($this->request->getServer('HTTP_USER_AGENT'));
        return is_numeric(strpos($ua, "mobile"));
    }

    /**
     * Get current product id
     *
     * @return mixed
     */
    public function getCurrentProduct()
    {
        return $this->catalogHelper->getProduct();
    }

    /**
     * Check if current page is search result page
     *
     * @return bool
     */
    public function isSearchResultPage()
    {
        return 'search' === $this->getCurrentPageName();
    }

    /**
     * Get loaded page title
     *
     * @param \Magento\Framework\View\Element\Template $block
     * @return string
     */
    public function getCurrentPageTitle($block)
    {
        if (!$block)
            return '';

        $response = '';
        try {
            $response = $block->getLayout()->getBlock('page.main.title')->getPageTitle();
        } catch (\Exception $e) {
            $this->logger->error("Error: " . $e->getMessage());
        }
        return $response;
    }

    /**
     * Get current loaded CMS page, when visitor is on a cms page
     *
     * @param \Magento\Framework\View\Element\Template $block
     * @return string
     */
    public function getCurrentCmsPage($block)
    {
        if (!$block)
            return '';

        $response = '';
        try {
            $cmsBlock = $block->getLayout()->getBlock('page.main.title');

            // Ensure the method exists
            if (!is_object($cmsBlock) || !method_exists($cmsBlock, 'getPage')) {
                return '';
            }

            $response = $block->getLayout()->getBlock('cms_page')->getPage();
        } catch (\Exception $e) {
            $this->logger->error("Error: " . $e->getMessage());
        }
        return $response;
    }

    /**
     * Get Search Term
     *
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
     *
     * @return bool
     */
    public function isProductListingPage()
    {
        return 'category' === $this->getCurrentPageName();
    }

    /**
     * Returning store config value
     *
     * @param string $path
     **/
    public function getStoreConfigValue($path)
    {
        $storeScope = ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue($path, $storeScope);
    }

    /**
     * Check if search is enabled
     *
     * @return bool
     */
    public function isCollectionEnabled()
    {
        $val = $this->getStoreConfigValue(self::COLLECTIONS_ENABLED);
        return (1 == $val);
    }

    /**
     * Check if search is enabled
     *
     * @return bool
     */
    public function isSearchEnabled()
    {
        $val = $this->getStoreConfigValue(self::SITESEARCH_ENABLED);
        return (1 == $val);
    }

    /**
     * Check if auto suggest is enabled
     *
     * @return bool
     */
    public function isAutoSuggestEnabled()
    {
        $val = $this->getStoreConfigValue(self::SEARCH_ENABLED);
        return (1 == $val);
    }

    /**
     * Check if pixel is enabled
     *
     * @return bool
     */
    public function isPixelEnabled()
    {
        $val = $this->getStoreConfigValue(self::RECOMM_PIXEL_ENABLED);
        return 1 == $val;
    }

    /**
     * Check if pixel is in development mode
     *
     * @return bool
     */
    public function isPixelDevelopment()
    {
        $val = $this->getStoreConfigValue(self::RECOMM_PIXEL_DEVELOPMENT);
        return 1 == $val;

    }

    /**
     * Check if recommendation widget is enabled
     *
     * @return bool
     */
    public function isRecommendationWidgetEnabled()
    {
        $val = $this->getStoreConfigValue(self::RECOMM_WIDGET_ENABLED);
        return 1 == $val;
    }

    /**
     * Initialise settings tab option values
     *
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
    }

    /**
     * Get Setting Account Id
     *
     * @return string
     */
    public function getAccountId()
    {
        return $this->_accId;
    }

    /**
     * Get current customer unique id. This will become a visitor ID if customer
     * is not logged in.
     */
    public function getCustomerId()
    {
        $customerSession = $this->sessionFactory->create();
        ;
        $customer = $customerSession->getCustomer();

        if ($customer) {
            $customerId = $customer->getId();

            if ($customerId) {
                return "Customer." . $customerId;
            }
        }

        return $this->getVisitorId();
    }

    /**
     * Get visitor unique id
     */
    public function getVisitorId()
    {
        $session = $this->customerSession;

        // From session
        if ($session) {
            $visitorData = $session->getVisitorData();

            if ($visitorData) {
                $visitorId = $visitorData->getId();

                if ($visitorId) {
                    return "Visitor." . $visitorId;
                }
            }
        }

        // From cookie
        $visitorId = $this->cookieManager->getCookie('visitor_id');
        if ($visitorId) {
            return "Visitor" . $visitorId;
        }

        // From internal manager
        $visitorId = $this->visitor->getId();
        if ($visitorId) {
            return "Visitor" . $visitorId;
        }

        // Unable to form a visitor ID
        return "UnknownVisitor";
    }

    /**
     * Get Setting Auth Key
     *
     * @return string
     */
    public function getAuthKey()
    {
        return $this->_authKey;
    }

    /**
     * Get Setting Domain Key
     *
     * @return string
     */
    public function getDomainKey()
    {
        return $this->_domainKey;
    }

    /**
     * Get the currency symbol to display for the module features
     */
    public function getCurrencySymbol()
    {
        $symbol = $this->getStoreConfigValue(self::SETTINGS_CURRENCY_SYMBOL);

        // Use config currency synbol if set
        if (isset($symbol) && $symbol != '') {
            return $symbol;
        }

        // Try to use system currency symbol
        return $this->currency->getCurrencySymbol();
    }

    /**
     * Get Setting Search End Point Url
     *
     * @return string
     */
    public function getSearchEndPointUrl()
    {
        $val = $this->getStoreConfigValue(self::SETTINGS_ENDPOINT_SEARCH);
        if ($val == 'stage') {
            return self::STAGING_API_ENDPOINT_SEARCH;
        }
        return self::PRODUCTION_API_ENDPOINT_SEARCH;
    }

    /**
     * Get Setting Auto Suggest End Point Url
     *
     * @return string
     */
    public function getAutoSuggestEndPointUrl()
    {
        $val = $this->getStoreConfigValue(self::SETTINGS_ENDPOINT_AUTOSUGGEST);
        if ($val == 'stage') {
            return self::STAGING_API_ENDPOINT_AUTOSUGGEST;
        }
        return self::PRODUCTION_API_ENDPOINT_AUTOSUGGEST;
    }

    /**
     * Get Setting Collection/Category End Point Url
     *
     * @return string
     */
    public function getCollectionEndPointUrl()
    {
        $val = $this->getStoreConfigValue(self::SETTINGS_ENDPOINT_CATEGORY);
        if ($val == 'stage') {
            return self::STAGING_API_ENDPOINT_COLLECTION;
        }
        return self::PRODUCTION_API_ENDPOINT_COLLECTION;
    }

    /**
     * Get Setting BR Widget End Point Url
     *
     * @return string
     */
    public function getBrWidgetEndPointUrl()
    {
        $val = $this->getStoreConfigValue(self::SETTINGS_ENDPOINT_WIDGETS);
        if ($val == 'stage') {
            return self::STAGING_API_ENDPOINT_WIDGET;
        }
        return self::PRODUCTION_API_ENDPOINT_WIDGET;
    }

    /**
     * Can init script, if all settings tab options are not empty then return true
     *
     * @return bool
     */
    public function canInitScript()
    {
        return !empty($this->_accId) && !empty($this->_authKey) && !empty($this->_domainKey);
    }
}
