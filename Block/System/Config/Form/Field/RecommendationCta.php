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
 * Class RecommendationCta
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class RecommendationCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'recommendation_cta';
        $this->_buttonLabel = 'Learn More';
    }

    /**
     * Return button url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'https://www.bloomreach.com/en/products/bloomreach-experience/recommendations';
    }

    public function getBeforeButtonAdditionalText()
    {
        return __('96% of visitors to your website are there to browse, not buy. With recommendations, you can present relevant products and nudge more visitors to convert.');
    }
}
