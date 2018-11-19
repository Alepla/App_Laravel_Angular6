<?php

namespace App\RealWorld\Transformers;

class VideoTransformer extends Transformer
{
    protected $resourceName = 'video';

    public function transform($data)
    {
        return $data;
    }
}