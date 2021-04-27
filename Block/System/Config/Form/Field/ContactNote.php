<?php
/**
 * Copyright © Bloomreach, Inc. All rights reserved.
 * See COPYING.txt for license details.
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
