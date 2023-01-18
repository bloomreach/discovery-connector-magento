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

use Magento\Backend\Block\Template\Context;
use Magento\Config\Block\System\Config\Form\Field;
use Magento\Framework\Data\Form\Element\AbstractElement;

/**
 * Class CtaButtonAbstract
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
abstract class CtaButtonAbstract extends Field
{
    /**
     * @var string
     */
    protected $_template = 'Bloomreach_Connector::system/config/field/cta_button.phtml';
    
    /**
     * @var string
     */
    protected $_buttonId;

    /**
     * @var string
     */
    protected $_buttonLabel;

    /**
     * @param Context $context
     * @param array $data
     */
    public function __construct(
        Context $context,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->_afterConstruct();
    }

    /**
     * Initialise class variables after constructor call
     *
     * @return void
     */
    abstract public function _afterConstruct();

    /**
     * Remove scope label
     *
     * @param  AbstractElement $element
     * @return string
     */
    public function render(AbstractElement $element)
    {
        $element->unsScope()->unsCanUseWebsiteValue()->unsCanUseDefaultValue();
        return parent::render($element);
    }

    /**
     * Return Button Id
     *
     * @return string
     */
    public function getButtonId()
    {
        return $this->_buttonId;
    }

    /**
     * Return Button Label
     *
     * @return string
     */
    public function getButtonLabel()
    {
        return $this->_buttonLabel;
    }

    /**
     * Return element html
     *
     * @param  AbstractElement $element
     * @return string
     */
    protected function _getElementHtml(AbstractElement $element)
    {
        return $this->_toHtml();
    }

    /**
     * Return ajax url for collect button
     *
     * @return string
     */
    abstract public function getButtonUrl();

    /**
     * Return button text
     *
     * @return string
     */
    public function getAfterButtonAdditionalText()
    {
        return '';
    }

    /**
     * Return button text
     *
     * @return string
     */
    public function getBeforeButtonAdditionalText()
    {
        return '';
    }
}
