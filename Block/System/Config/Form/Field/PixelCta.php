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
 * Class PixelCta
 * package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class PixelCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     *
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'pixel_cta';
        $this->_buttonLabel = 'Learn More About Pixel';
    }

    /**
     * Return button url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'https://documentation.bloomreach.com/developers/search-and-merchandising/pixel-deployment/getting-started.html';
    }
}
