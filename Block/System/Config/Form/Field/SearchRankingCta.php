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
 * Class SearchRankingCta
 * @package Bloomreach\Connector\Block\System\Config\Form\Field
 */
class SearchRankingCta extends CtaButtonAbstract
{
    /**
     * Initialise class variables after constructor call
     * @return void
     */
    public function _afterConstruct()
    {
        // TODO: Implement _afterConstruct() method.
        $this->_buttonId    = 'searchranking_cta';
        $this->_buttonLabel = 'Set up in Bloomreach Dashboard';
    }

    /**
     * Return button url for collect button
     *
     * @return string
     */
    public function getButtonUrl()
    {
        return 'https://tools.bloomreach.com/navapp/commerce/tools/RankingManager/searchterm';
    }

    public function getBeforeButtonAdditionalText()
    {
        return __('Refine search quality, set global or query specific ranking adjustments, and refine performance within the dashboard.');
    }
}
