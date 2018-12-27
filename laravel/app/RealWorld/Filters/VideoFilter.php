<?php

namespace App\RealWorld\Filters;

use App\Label;
use App\Video;
use Illuminate\Support\Facades\DB;

class VideoFilter extends Filter
{
    protected function label($name)
    {
        
        $label = Label::whereName($name)->first();

        $videoIds = $label ? $label->videos()->pluck('video_id')->toArray() : [];

        return $this->builder->whereIn('id', $videoIds);
    }

    protected function liked($username)
    {
        $user = User::whereUsername($username)->first();

        $articleIds = $user ? $user->likes()->pluck('id')->toArray() : [];

        return $this->builder->whereIn('id', $articleIds);
    }

}