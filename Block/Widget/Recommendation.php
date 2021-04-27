<?php
/**
 * Copyright © Bloomreach, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Bloomreach\Connector\Block\Widget;

use Bloomreach\Connector\Block\ConfigurationSettingsInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\View\Element\Template;
use Magento\Framework\View\Element\Template\Context;
use Magento\Store\Model\ScopeInterface;
use Magento\Widget\Block\BlockInterface;

/**
 * Class Recommendation
 * @package Bloomreach\Connector\Block\Widget
 */
class Recommendation extends Template implements BlockInterface
{
    /**
     * @var ScopeConfigInterface
     */
    private ScopeConfigInterface $scopeConfig;

    /**
     * Recommendation constructor.
     * @param Context $context
     * @param ScopeConfigInterface $scopeConfig
     * @param array $data
     */
    public function __construct(
        Context $context,
        ScopeConfigInterface $scopeConfig,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->scopeConfig = $scopeConfig;
    }

    /**
     * Check if widget can be render, based on pixel and widget is enabled
     * from store config
     * @return bool
     */
    public function isWidgetVisible()
    {
        $isPixelEnabled = (int) $this->getStoreConfigValue(ConfigurationSettingsInterface::RECOMM_PIXEL_ENABLED);
        $isWidgetEnabled = (int) $this->getStoreConfigValue(ConfigurationSettingsInterface::RECOMM_WIDGET_ENABLED);
        return (1===$isPixelEnabled && 1===$isWidgetEnabled);
    }

    /**
     *returning store config value
     **/
    public function getStoreConfigValue($path)
    {
        $storeScope = ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue($path, $storeScope);
    }
}
