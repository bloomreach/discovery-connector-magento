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
 * Class EndPointCta
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class EndPointCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'endpoint_cta';
        $this->_buttonLabel = 'Learn More About Environments and Endpoints';
    }

    /**
     * Return button url for button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'https://documentation.bloomreach.com/api-reference/search-and-merchandising/bloomreach-search-and-merchandising-apis.html';
    }
}
