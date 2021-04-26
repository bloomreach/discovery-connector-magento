<?php
namespace Bloomreach\Connector\Block\System\Config\Form\Field;

class MarketingCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'marketing_cta';
        $this->_buttonLabel = 'Some Action';
    }

    /**
     * Return ajax url for collect button
     *
     * @return string
     */
    public function getAjaxUrl()
    {
        return $this->getUrl('bloomreach/cta/marketing');
    }
}
