<?php
/**
 * Copyright © Bloomreach, Inc. All rights reserved.
 * See COPYING.txt for license details.
 */
namespace Bloomreach\Connector\Block\System\Config\Form\Field;

/**
 * Class RecommendationCta
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class RecommendationCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'recommendation_cta';
        $this->_buttonLabel = 'Some Action';
    }

    /**
     * Return ajax url for collect button
     *
     * @return string
     */
    public function getAjaxUrl()
    {
        return $this->getUrl('bloomreach/cta/recommendation');
    }
}
