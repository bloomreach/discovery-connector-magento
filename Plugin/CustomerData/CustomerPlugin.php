<?php
/**
 * Copyright ©Bloomreach. All rights reserved.
 * See LICENSE.txt for license details.
 */
namespace Bloomreach\Connector\Plugin\CustomerData;

use Magento\Customer\Helper\Session\CurrentCustomer;

/**
 * Class CustomerPlugin
 * @package Bloomreach\Connector\Plugin\CustomerData
 */
class CustomerPlugin
{
    /**
     * @var CurrentCustomer
     */
    protected CurrentCustomer $currentCustomer;

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
     * Set uniqueId, a md5 encrypted hash for logged-in customer in section data
     * @param \Magento\Customer\CustomerData\Customer $subject
     * @param $result
     * @return mixed
     */
    public function afterGetSectionData(\Magento\Customer\CustomerData\Customer $subject, $result)
    {
        if ($this->currentCustomer->getCustomerId()) {
            $result['uniqueId'] = md5($this->currentCustomer->getCustomerId() . ':' . $this->currentCustomer->getCustomer()->getEmail());
        }
        return $result;
    }
}
