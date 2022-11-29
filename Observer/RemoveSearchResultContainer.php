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
namespace Bloomreach\Connector\Observer;

use Bloomreach\Connector\Block\ConfigurationSettingsInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\App\Request\Http;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;
use Magento\Store\Model\ScopeInterface;

/**
 * Class RemoveSearchResultContainer
 * package Bloomreach\Connector\Observer
 */
class RemoveSearchResultContainer implements ObserverInterface
{
    /**
     * @var Http
     */
    private $request;

    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * RemoveSearchResultContainer constructor.
     * @param Http $request
     * @param ScopeConfigInterface $scopeConfig
     */
    public function __construct(
        Http $request,
        ScopeConfigInterface $scopeConfig
    ) {
        $this->request = $request;
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * Remove sidebar and content to remove duplicate values while render
     *
     * @param Observer $observer
     */
    public function execute(Observer $observer)
    {
        // TODO: Implement execute() method.
        $fullActionName = $this->request->getFullActionName();

        if ('catalogsearch_result_index'===$fullActionName) {

            /** @var string|int $isSearchEnable */
            $isSearchEnable = $this->getStoreConfigValue(ConfigurationSettingsInterface::SITESEARCH_ENABLED);
            if (1==$isSearchEnable) {
                $layout = $observer->getLayout();
                $block = $layout->getBlock('search.result');
                if ($block) {
                    //you can apply or add you condition here.
                    $layout->unsetElement('product_list_toolbar');
                    $layout->unsetElement('search.result');
                    $layout->unsetElement('sidebar.main');
                    $layout->unsetElement('sidebar.additional');
                }
            }
        } elseif ('catalog_category_view'===$fullActionName) {

            /** @var string|int $isCollectionEnable */
            $isCollectionEnable = (int) $this->getStoreConfigValue(ConfigurationSettingsInterface::COLLECTIONS_ENABLED);
            if (1===$isCollectionEnable) {
                $layout = $observer->getLayout();
                $block = $layout->getBlock('category.products');
                if ($block) {
                    //you can apply or add you condition here.
                    $layout->unsetElement('product_list_toolbar');
                    $layout->unsetElement('category.products');
                    $layout->unsetElement('sidebar.main');
                    $layout->unsetElement('sidebar.additional');
                }
            }
        }
    }

    /**
     * Returning store config value
     *
     * @param string $path
     * @return mixed
     */
    public function getStoreConfigValue($path)
    {
        $storeScope = ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue($path, $storeScope);
    }
}
