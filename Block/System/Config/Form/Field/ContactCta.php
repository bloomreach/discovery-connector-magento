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
class ContactCta extends Field
{
    /**
     * Returns element html
     *
     * @param AbstractElement $element
     * @return string
     */
    protected function _getElementHtml(AbstractElement $element)
    {
        $html = __("We're here to you be successful, reach out with any questions.");
        $html .= "<br/>" . __("Most questions can be addressed to your onboarding team of account specialists. If other questions arise, feel free to reach out to our global team.");
        $html .= "<br/><a href='tel:+1 (847) 444 4779'>+1 (877) 414 4776</a>";
        $html .= "<br/>" . __('82 Pioneer way,');
        $html .= "<br/>" . __('Mountain View, CA');
        $html .= "<br/><a target='_blank' href='https://support.bloomreach.com/'>" . __("Contact Us") . "</a>";
        return $html;
    }
}
