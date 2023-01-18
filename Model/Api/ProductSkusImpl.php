<?php

namespace Bloomreach\Connector\Model\Api;

use Psr\Log\LoggerInterface;
use Magento\Catalog\Model\ProductRepository;
use Magento\ConfigurableProduct\Model\Product\Type\Configurable;
use Magento\GroupedProduct\Model\Product\Type\Grouped;
use Magento\Swatches\Helper\Data as SwatchHelper;

class ProductSkusImpl implements \Bloomreach\Connector\Api\ProductSkusInterface
{
    protected $logger;
    protected $productRepository;
    protected $configurable;
    protected $grouped;
    protected $swatchHelper;

    public function __construct(
        LoggerInterface $logger,
        ProductRepository $productRepository,
        Configurable $configurable,
        Grouped $grouped,
        SwatchHelper $swatchHelper
    )
    {
        $this->logger = $logger;
        $this->productRepository = $productRepository;
        $this->configurable = $configurable;
        $this->grouped = $grouped;
        $this->swatchHelper = $swatchHelper;
    }

    public function getChildProductAttributesMap($product) {
        try {
            $childProducts = $this->configurable->getUsedProducts($product);

            if (empty($childProducts)) {
                $childProducts = $this->grouped->getAssociatedProducts($product);
            }

            if (empty($childProducts)) return "";

            $childProductAttributes = [];

            foreach ($childProducts as $childProduct) {
                if ($childProduct == null) continue;

                $attrIds = [];
                $attributes = $childProduct->getAttributes();

                // Retrieve the value of the attribute for the simple product
                foreach ($attributes as $attr) {
                    $values = (array)$childProduct->getData($attr->getName());

                    if (!empty($values) && ($this->swatchHelper->isSwatchAttribute($attr) || $attr->getIsVisibleOnFront())) {
                        // Look up via name or via attribute id
                        $attrIds[$attr->getName()] = $values;
                        $attrIds[$attr->getId()] = $values;
                    }
                }

                $childProductAttributes[$childProduct->getSku()] = $attrIds;
            }

            return $childProductAttributes;
        } catch (\Exception $e) {
            return $e->getMessage();
        }
    }

    /**
     * Retrieves the sku and attribute information for a product
     */
    public function getProductMetrics($product) {
        return [
            'sku' => $product->getSku(),
            'childAttributeMap' => $this->getChildProductAttributesMap($product)
        ];
    }

    /**
     * @inheritdoc
     */
    public function getPost($productIds) {
        $out = [];
        $response = ['success' => true, 'data' => &$out];

        for ($i = 0; $i < count($productIds); $i++) {
            $productId = $productIds[$i];

            try {
                $product = $this->productRepository->getById($productId);

                if (!$product) {
                    $response['success'] = false;
                    $response['message'] = 'Product not found';
                    break;
                } else {
                    $out[$productId] = $this->getProductMetrics($product);
                }
            } catch (\Exception $e) {
                $response = ['success'  => false, 'message'  => $e->getMessage()];
                $this->logger->info($e->getMessage() );
                break;
            }
        }

        $returnArray = json_encode($response);
        return $returnArray;
    }
}
