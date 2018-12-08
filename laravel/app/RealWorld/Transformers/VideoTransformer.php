<?php

namespace App\RealWorld\Transformers;

class VideoTransformer extends Transformer
{
    protected $resourceName = 'video';

    public function transform($data)
    {
        return [
            'id'                => $data['id'],
            'slug'              => $data['slug'],
            'title'             => $data['title'],
            'labelList'         => $data['labelList'],
            'description'       => $data['description'],
            'link'              => $data['link'],
            'createdAt'         => $data['created_at']->toAtomString(),
            'updatedAt'         => $data['updated_at']->toAtomString()
        ];
    }
}