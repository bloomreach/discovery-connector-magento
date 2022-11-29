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
 * package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class ReferenceLink extends Field
{
    /**
     * Returns element html
     *
     * @param AbstractElement $element
     * @return string
     */
    protected function _getElementHtml(AbstractElement $element)
    {
        $html = __("If you'd like to learn more, or customize what is happening with the Autosuggest, check out our documentation.");
        $html .= "<br/><a href='https://documentation.bloomreach.com/user-guides/search-and-merchandising/autosuggest/autosuggest.html'>" . __("Learn More") . "</a>";
        return $html;
    }
}
