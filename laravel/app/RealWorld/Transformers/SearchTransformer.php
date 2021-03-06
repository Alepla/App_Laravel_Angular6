<?php

namespace App\RealWorld\Transformers;

class SearchTransformer extends Transformer
{
    protected $resourceName = 'search';

    public function transform($search)
    {
        if($search['slug']){
            return [
                'id'                => $search['id'],
            'slug'              => $search['slug'],
            'title'             => $search['title'],
            'description'       => $search['description'],
            'video'              => $search['video'],
            'thumbnail'              => $search['thumbnail'],
            'state'              => $search['state'],
            'category'              => $search['category'],
            'labelList'         => $search['labelList'],
            'createdAt'         => $search['created_at']->toAtomString(),
            'updatedAt'         => $search['updated_at']->toAtomString(),
            'creator' => [
                'id'  => $search['user']['id'],
                'username'  => $search['user']['username'],
                'bio'       => $search['user']['bio'],
                'image'     => $search['user']['image'],
                'following' => $search['user']['following'],
            ]
            ];
        }else{
            return [
                'id'        => $search['id'],
                'username'  => $search['username'],
                'bio'       => $search['bio'],
                'image'     => $search['image'],
                'followers' => $search['followers']
            ];
        }
        
    }
}