<?php
use Magento\Framework\Component\ComponentRegistrar;

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
ComponentRegistrar::register(
    ComponentRegistrar::MODULE,
    'Bloomreach_Connector',
    __DIR__
);
