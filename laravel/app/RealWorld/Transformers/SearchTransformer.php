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
                'link'              => $search['link'],
                'labelList'         => $search['labelList'],
                'createdAt'         => $search['created_at']->toAtomString(),
                'updatedAt'         => $search['updated_at']->toAtomString(),
                'creator' => [
                    'username'  => $search['user']['username'],
                    'bio'       => $search['user']['bio'],
                    'image'     => $search['user']['image'],
                    'following' => $search['user']['following'],
                ]
            ];
        }else{
            return [
                'username'  => $search['username'],
                'bio'       => $search['bio'],
                'image'     => $search['image'],
                'followers' => $search['followers']
            ];
        }
        
    }
}