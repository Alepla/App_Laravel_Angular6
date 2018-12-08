<?php

namespace App\RealWorld\Transformers;

class LabelTransformer extends Transformer
{
    protected $resourceName = 'label';

    public function transform($data)
    {
        return $data;
    }
}