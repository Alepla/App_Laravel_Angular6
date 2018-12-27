<?php

namespace App\RealWorld\Transformers;

class VideoTransformer extends Transformer
{
    protected $resourceName = 'video';

    public function transform($data)
    {
        //print_r($data);
        return [
            'id'                => $data['id'],
            'slug'              => $data['slug'],
            'title'             => $data['title'],
            'description'       => $data['description'],
            'link'              => $data['link'],
            'labelList'         => $data['labelList'],
            'likes'             => $data['liked'],
            'likesCount'        => $data['liked_count'],
            'dislike'             => $data['disliked'],
            'dislikesCount'        => $data['disliked_count'],
            'createdAt'         => $data['created_at']->toAtomString(),
            'updatedAt'         => $data['updated_at']->toAtomString(),
            'creator' => [
                'username'  => $data['user']['username'],
                'bio'       => $data['user']['bio'],
                'image'     => $data['user']['image'],
                'following' => $data['user']['following'],
            ]
        ];
    }
}