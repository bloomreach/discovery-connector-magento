<?php


namespace Bloomreach\Connector\Block\System\Config\Form\Field;


class QuickstartCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId = 'quickstart_cta';
        $this->_buttonLabel = 'See Documentation';
    }

    /**
     * Return ajax url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return '#';
    }


    public function getBeforeButtonAdditionalText()
    {
        return __("Not sure where to get started? Look at our Documentation & Quick Start guide for Bloomreach and Magento. It'll get you started in no time.");
    }
}
