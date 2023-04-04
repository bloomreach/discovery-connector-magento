<?php

namespace Bloomreach\Connector\Model\Config\Source;

use Magento\Config\Block\System\Config\Form\Field;
use Magento\Framework\Data\Form\Element\AbstractElement;

class ModuleVersion extends Field
{
    public function getVersion()
    {
        try {
            $pathToNeededModule = realpath(__DIR__."/../../../composer.json");

            if ($pathToNeededModule) {
                $content = file_get_contents($pathToNeededModule);

                if ($content) {
                    $jsonContent = json_decode($content, true);

                    if (!empty($jsonContent['version'])) {
                        return $jsonContent['version'];
                    }
                }
            }

            return null;
        }

        catch (\Exception $e) {
            return "Unable to determine version";
        }
    }

    protected function _getElementHtml(AbstractElement $element)
    {
        return '<span>' . $this->getVersion() . '</span>';
    }
}
