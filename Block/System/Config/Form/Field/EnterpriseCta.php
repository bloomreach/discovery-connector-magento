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
 * Class MarketingCta
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class EnterpriseCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'marketing_cta';
        $this->_buttonLabel = 'Learn More';
    }

    /**
     * Return button url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'https://www.bloomreach.com/en/products/bloomreach-experience/search';
    }

    public function getBeforeButtonAdditionalText()
    {
        return __("Bloomreach's AI-driven Search for eCommerce allows your teams to create a sophisticated search and product discovery experience that drives conversions and revenue. Our set of AI-driven merchandising tools to help you make impactful and effective changes that convert more traffic.");
    }
}
