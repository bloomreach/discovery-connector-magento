<?php
namespace Bloomreach\Connector\Observer;

use Magento\Framework\App\Request\Http;
use Magento\Framework\Event\Observer;
use Magento\Framework\Event\ObserverInterface;

class RemoveSearchResultContainer implements ObserverInterface
{
    private Http $request;

    public function __construct(
        Http $request
    ) {
        $this->request = $request;
    }

    public function execute(Observer $observer)
    {
        // TODO: Implement execute() method.
        $fullActionName = $this->request->getFullActionName();
        if ($fullActionName=='catalogsearch_result_index') {
            $layout = $observer->getLayout();
            $block = $layout->getBlock('search.result');
            if ($block) {
                //you can apply or add you condition here.
                $layout->unsetElement('search.result');
                $layout->unsetElement('sidebar.main');
                $layout->unsetElement('sidebar.additional');

            }
        }
    }
}
