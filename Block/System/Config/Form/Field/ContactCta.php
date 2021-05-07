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
 * Class ContactNote
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class ContactCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId = 'contact_us_cta';
        $this->_buttonLabel = 'Bloomreach Support';
    }

    /**
     * Return ajax url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'https://support.bloomreach.com/';
    }
}
