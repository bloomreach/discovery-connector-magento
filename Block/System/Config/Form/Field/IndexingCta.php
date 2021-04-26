<?php
namespace Bloomreach\Connector\Block\System\Config\Form\Field;

class IndexingCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId = 'indexing_cta';
        $this->_buttonLabel = 'Trigger Index';
    }

    /**
     * Return ajax url for collect button
     *
     * @return string
     */
    public function getAjaxUrl()
    {
        return $this->getUrl('bloomreach/cta/indexing');
    }
}
