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
 * Class AddApiCta
 * package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class AddApiCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     *
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId = 'add_api_cta';
        $this->_buttonLabel = 'Add API Keys';
    }

    /**
     * Return ajax url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return $this->getUrl('adminhtml/system_config/edit', ['_secure'=>true,'section'=>'bloomreach_settings']);
    }

    /**
     * Get additional text after button
     *
     * @return string
     */
    public function getAfterButtonAdditionalText()
    {
        return '<a href="#"><span>' . __('Learn More') . '</span></a>';
    }

    /**
     * Get additional text before button
     *
     * @return string
     */
    public function getBeforeButtonAdditionalText()
    {
        return __("We are excited for you to get started with industry leading Search, Merchandising, 
            & Recommendations! To begin, go to the Settings tab and enter your API credentials.");
    }
}
