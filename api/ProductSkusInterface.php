<?php

namespace Bloomreach\Connector\Api;

interface ProductSkusInterface
{
    /**
     * GET for post api
     * @param string[] $productIds
     * @return string
     */
    public function getPost($productIds);
}
