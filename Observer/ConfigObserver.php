<?php
namespace Bloomreach\Connector\Observer;

use Magento\Framework\Event\ObserverInterface;
use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\Config\Storage\WriterInterface;

class ConfigObserver implements ObserverInterface
{
    /**
     * @var RequestInterface
     */
    private $request;

    /**
     * ConfigChange constructor.
     * @param RequestInterface $request
     * @param WriterInterface $configWriter
     */
    public function __construct(
        RequestInterface $request,
        WriterInterface $configWriter
    ) {
        $this->request = $request;
        $this->configWriter = $configWriter;

    }


    public function execute(EventObserver $observer)
    {
        $changed_paths = $observer->getEvent()->getData('changed_paths');
        $temp = [
        	'bloomreach_search/autosuggest/main_template_text'=> 'bloomreach_search/autosuggest/search_autosuggest_template_update_date',
        	'bloomreach_search/sitesearch/main_template_text'=> 'bloomreach_search/sitesearch/search_main_template_update_date',
        	'bloomreach_search/sitesearch/productlist_template_text'=> 'bloomreach_search/sitesearch/search_list_template_update_date',
        	'bloomreach_collections/general/main_template_text'=> 'bloomreach_collections/general/category_main_template_update_date',
        	'bloomreach_collections/general/productlist_template_text'=> 'bloomreach_collections/general/category_list_template_update_date'
        ];
        foreach ($temp as $key => $value) {
        	if (in_array($key, $changed_paths)) {
	        	$this->configWriter->save($value, date('F d, Y'));
	        }
        }
        return $this;
    }
}