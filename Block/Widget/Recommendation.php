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
use Magento\Catalog\Api\ProductRepositoryInterface;
use Psr\Log\LoggerInterface;

/**
 * Class Recommendation
 * package Bloomreach\Connector\Block\Widget
 */
class Recommendation extends Template implements BlockInterface
{
    /**
     * @var ScopeConfigInterface
     */
    private $scopeConfig;

    /**
     * @var Json
     */
    private $jsonSerializer;

    /**
     * @var Random
     */
    private $randomGenerator;

    /**
     * @var ProductRepositoryInterface
     */
    private $productRepository;

    /**
     * @var LoggerInterface
     */
    private $logger;

    /**
     * Recommendation constructor.
     * @param Context $context
     * @param ScopeConfigInterface $scopeConfig
     * @param Json $jsonSerializer
     * @param Random $randomGenerator
     * @param ProductRepositoryInterface $productRepository
     * @param LoggerInterface $logger
     * @param array $data
     */
    public function __construct(
        Context $context,
        ScopeConfigInterface $scopeConfig,
        Json $jsonSerializer,
        Random $randomGenerator,
        ProductRepositoryInterface $productRepository,
        LoggerInterface $logger,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->scopeConfig = $scopeConfig;
        $this->jsonSerializer = $jsonSerializer;
        $this->randomGenerator = $randomGenerator;
        $this->productRepository = $productRepository;
        $this->logger = $logger;
    }

    /**
     * Check if widget can be render, based on pixel and widget is enabled from store config
     *
     * @return bool
     */
    public function isWidgetVisible(): bool
    {
        $isWidgetEnabled = (int) $this->getStoreConfigValue(ConfigurationSettingsInterface::RECOMM_WIDGET_ENABLED);
        return 1===$isWidgetEnabled;
    }

    /**
     * Get json configuration to initialize widget
     *
     * @return bool|string
     */
    public function getWidgetJsonConfig()
    {
        if ($this->getData('item_ids')) {
            $itemIds = explode(",", $this->getData('item_ids'));
            $itemSkus = [];
            foreach ($itemIds as $key => $value) {
                try {
                    $sku = $this->productRepository->getById($value)->getSku();
                    array_push($itemSkus, $sku);
                } catch (\Exception $e) {
                    $this->logger->error("Error in loading item.".$e->getMessage());
                    continue;
                }
            }
            $itemSkus = implode(",", $itemSkus);
        } else {
            $itemSkus = null;
        }
        $response = [
            'title'=>$this->getData('title'),
            'widget_id' => $this->getData('rec_widget_id'),
            'widget_type' => $this->getData('rec_widget_type'),
            'category_id' => $this->getData('category_id'),
            'query'=> $this->getData('keyword_query'),
            'item_ids'=> $itemSkus,
            'products_visible'=> $this->getData('products_visible'),
            'products_to_fetch'=> $this->getData('products_to_fetch')
        ];
        return $this->jsonSerializer->serialize($response);
    }

    /**
     * Returning store config value
     *
     * @param string $path
     * @return string
     **/
    public function getStoreConfigValue($path)
    {
        $storeScope = ScopeInterface::SCOPE_STORE;
        return $this->scopeConfig->getValue($path, $storeScope);
    }

    /**
     * Get Random String upto 5 chars
     *
     * @return string
     * @throws \Magento\Framework\Exception\LocalizedException
     */
    public function getRandomString()
    {
        return $this->randomGenerator->getRandomString(5);
    }
}
