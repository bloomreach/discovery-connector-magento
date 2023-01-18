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
 * Class IndexingCta
 * package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class IndexingCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     *
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId = 'indexing_cta';
        $this->_buttonLabel = 'Contact Integrations';
    }

    /**
     * Return button url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'mailto:support@bloomreach.com';
    }
}
