<?php

namespace App\RealWorld\Transformers;

class ProfileTransformer extends Transformer
{
    protected $resourceName = 'profile';

    public function transform($data)
    {
        return [
            'id'  => $data['id'],
            'username'  => $data['username'],
            'bio'       => $data['bio'],
            'image'     => $data['image'],
            'following' => $data['following'],
            'followers' => $data['followers'],
        ];
    }
}