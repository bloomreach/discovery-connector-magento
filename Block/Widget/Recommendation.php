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
use Magento\Framework\Serialize\Serializer\Json;

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
    private Json $jsonSerializer;

    /**
     * Recommendation constructor.
     * @param Context $context
     * @param ScopeConfigInterface $scopeConfig
     * @param array $data
     */
    public function __construct(
        Context $context,
        ScopeConfigInterface $scopeConfig,
        Json $jsonSerializer,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->scopeConfig = $scopeConfig;
        $this->jsonSerializer = $jsonSerializer;
    }

    /**
     * Check if widget can be render, based on pixel and widget is enabled
     * from store config
     * @return bool
     */
    public function isWidgetVisible(): bool
    {
        $isPixelEnabled = (int) $this->getStoreConfigValue(ConfigurationSettingsInterface::RECOMM_PIXEL_ENABLED);
        $isWidgetEnabled = (int) $this->getStoreConfigValue(ConfigurationSettingsInterface::RECOMM_WIDGET_ENABLED);
        return (1===$isPixelEnabled && 1===$isWidgetEnabled);
    }

    /**
     * Get json configuration to initialize widget
     * @return bool|string
     */
    public function getWidgetJsonConfig()
    {
        $response = [
            'title'=>$this->getData('title'),
            'widget_id' => $this->getData('rec_widget_id'),
            'widget_type' => $this->getData('rec_widget_type'),
            'category_id' => $this->getData('category_id'),
            'query'=> $this->getData('keyword_query'),
            'item_ids'=> $this->getData('item_ids'),
            'products_visible'=> $this->getData('products_visible'),
            'products_to_fetch'=> $this->getData('products_to_fetch')
        ];
        return $this->jsonSerializer->serialize($response);
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
