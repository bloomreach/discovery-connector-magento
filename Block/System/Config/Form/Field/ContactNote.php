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

use Magento\Config\Block\System\Config\Form\Field;
use Magento\Framework\Data\Form\Element\AbstractElement;

/**
 * Class ContactNote
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class ContactNote extends Field
{
    /**
     * Returns element html
     *
     * @param AbstractElement $element
     * @return string
     */
    protected function _getElementHtml(AbstractElement $element)
    {
        $html = __('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
        $html .= "<br/>" . __('82, Pioneer way,');
        $html .= "<br/>" . __('Mountain View, CA 94041, USA');
        $html .= "<br/><a href='tel:+1 (847) 444 4779'>+1 (847) 444 4779</a>";
        $html .= "<br/><a href='mailto:support@test.com'>support@test.com</a>";
        return $html;
    }
}
