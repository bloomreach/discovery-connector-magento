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
 * Class MerchandisingCta
 * package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class MerchandisingCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     *
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'merchandising_cta';
        $this->_buttonLabel = 'Set up in Bloomreach Dashboard';
    }

    /**
     * Return button url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'https://tools.bloomreach.com/navapp/commerce/tools/RankingManager/category';
    }

    /**
     * Get additional text before button
     *
     * @return string
     */
    public function getBeforeButtonAdditionalText()
    {
        return __('Identify top performing collections(Categories) and improve product ranking. 
            Bloomreach must be enabled on Collection(Category) to benefit from Merchandising adjustment.');
    }
}
