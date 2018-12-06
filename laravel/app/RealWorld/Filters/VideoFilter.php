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
}