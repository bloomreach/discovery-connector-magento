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
namespace Bloomreach\Connector\Block\System\Config\Form\Field;

/**
 * Class OptimizeCta
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class OptimizeCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'optimize_cta';
        $this->_buttonLabel = 'Learn Optimization Strategies';
    }

    /**
     * Return button url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'https://documentation.bloomreach.com/user-guides/search-and-merchandising/product-grid-merchandising/product-grid-merchandising.html';
    }

    public function getBeforeButtonAdditionalText()
    {
        return __('Do more with less data by leveraging already trained algorithms to optimize the search result out of the box. Automatically optimize customer journeys based on query and performance data of your storefront. Optimize every search query for your business goals.');
    }
}
