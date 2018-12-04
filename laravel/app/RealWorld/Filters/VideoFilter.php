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
    /*protected function title($title){
        $videos = DB::table('videos')->where('title', 'like', "%" . $title . "%")->get();
        foreach ($videos as $video)
        {
            var_dump($video->title);
        }
        //$videos = DB::table('videos')->where('title','Lil Peep - Life Is Beautiful')->first();
        //echo $videos;
        //echo $videos->name;
        //print_r($videos)->pluck('title');
    }*/
}