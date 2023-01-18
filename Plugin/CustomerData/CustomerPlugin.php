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
namespace Bloomreach\Connector\Plugin\CustomerData;

use Magento\Customer\CustomerData\Customer;
use Magento\Customer\Helper\Session\CurrentCustomer;

/**
 * Class CustomerPlugin
 * package Bloomreach\Connector\Plugin\CustomerData
 */
class CustomerPlugin
{
    /**
     * @var CurrentCustomer
     */
    protected $currentCustomer;

    /**
     * CustomerPlugin constructor.
     * @param CurrentCustomer $currentCustomer
     */
    public function __construct(
        CurrentCustomer $currentCustomer
    ) {
        $this->currentCustomer = $currentCustomer;
    }

    /**
     * Set uniqueId, a sha256 encrypted hash for logged-in customer in section data
     *
     * @param Customer $subject
     * @param array $result
     * @return mixed
     */
    public function afterGetSectionData(Customer $subject, $result)
    {
        if ($this->currentCustomer->getCustomerId()) {
            $result['uniqueId'] = hash('sha256', $this->currentCustomer->getCustomerId() . ':' . $this->currentCustomer->getCustomer()->getEmail());
        }
        return $result;
    }
}
