<?php

namespace App\RealWorld\Likes;

use App\Video;

trait HasLikes
{
    /**
     * Like the given video.
     *
     * @param Video $video
     * @return mixed
     */
    public function like(Video $video)
    {
        if (! $this->hasLikes($video))
        {
            return $this->likes()->attach($video);
        }
    }

    /**
     * Unlike the given video.
     *
     * @param Video $video
     * @return mixed
     */
    public function unLike(Video $video)
    {
        return $this->likes()->detach($video);
    }

    /**
     * Get the videos liked by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function likes()
    {
        return $this->belongsToMany(Video::class, 'likes', 'user_id', 'video_id')->withTimestamps();
    }

    /**
     * Check if the user has liked the given video.
     *
     * @param Video $video
     * @return bool
     */
    public function hasLikes(Video $video)
    {
        return !! $this->likes()->where('video_id', $video->id)->count();
    }
}