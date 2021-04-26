<?php
namespace Bloomreach\Connector\Block\System\Config\Form\Field;

use Magento\Config\Block\System\Config\Form\Field;
use Magento\Framework\Data\Form\Element\AbstractElement;

class WelcomeNote extends Field
{

    /**
     * Returns element html
     *
     * @param AbstractElement $element
     * @return string
     */
    protected function _getElementHtml(AbstractElement $element)
    {
        return __('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis feugiat arcu. Nullam fermentum nec sem non molestie. Nunc vitae erat placerat, vulputate magna id, consequat ipsum. Fusce sed gravida est, a imperdiet turpis. Morbi ut porta ex. Nullam placerat felis sed erat eleifend vestibulum. Donec neque felis, lobortis non viverra ac, vestibulum eu orci. Donec nec laoreet ex.');
    }
}
