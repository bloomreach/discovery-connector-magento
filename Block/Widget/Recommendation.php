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
namespace Bloomreach\Connector\Block\Widget;

use Bloomreach\Connector\Block\ConfigurationSettingsInterface;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Math\Random;
use Magento\Framework\Serialize\Serializer\Json;
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
     * @var Json
     */
    private Json $jsonSerializer;

    /**
     * @var Random
     */
    private Random $randomGenerator;

    /**
     * Recommendation constructor.
     * @param Context $context
     * @param ScopeConfigInterface $scopeConfig
     * @param Json $jsonSerializer
     * @param Random $randomGenerator
     * @param array $data
     */
    public function __construct(
        Context $context,
        ScopeConfigInterface $scopeConfig,
        Json $jsonSerializer,
        Random $randomGenerator,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->scopeConfig = $scopeConfig;
        $this->jsonSerializer = $jsonSerializer;
        $this->randomGenerator = $randomGenerator;
    }

    /**
     * Check if widget can be render, based on pixel and widget is enabled
     * from store config
     * @return bool
     */
    public function isWidgetVisible(): bool
    {
        //$isPixelEnabled = (int) $this->getStoreConfigValue(ConfigurationSettingsInterface::RECOMM_PIXEL_ENABLED);
        $isWidgetEnabled = (int) $this->getStoreConfigValue(ConfigurationSettingsInterface::RECOMM_WIDGET_ENABLED);
        return 1===$isWidgetEnabled;
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

    /**
     * Get Random String upto 5 chars
     * @return string
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getRandomString()
    {
        return $this->randomGenerator->getRandomString(5);
    }
}
