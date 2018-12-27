<?php

namespace App\RealWorld\Dislikes;

use App\Video;

trait HasDislikes
{
    /**
     * Like the given video.
     *
     * @param Video $video
     * @return mixed
     */
    public function dislike(Video $video)
    {
        if (! $this->hasDislikes($video))
        {
            return $this->dislikes()->attach($video);
        }
    }

    /**
     * Unlike the given video.
     *
     * @param Video $video
     * @return mixed
     */
    public function unDislike(Video $video)
    {
        return $this->dislikes()->detach($video);
    }

    /**
     * Get the videos liked by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function dislikes()
    {
        return $this->belongsToMany(Video::class, 'dislikes', 'user_id', 'video_id')->withTimestamps();
    }

    /**
     * Check if the user has liked the given video.
     *
     * @param Video $video
     * @return bool
     */
    public function hasDislikes(Video $video)
    {
        return !! $this->dislikes()->where('video_id', $video->id)->count();
    }
}