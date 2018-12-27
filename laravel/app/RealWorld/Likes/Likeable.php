<?php

namespace App\RealWorld\Likes;

use App\User;

trait Likeable
{
    /**
     * Check if the authenticated user has liked the video.
     * We make use of lazy loading if the relationship is not already loaded.
     *
     * @return bool
     */
    public function getLikedAttribute()
    {
        if (! auth()->check()) {
            return false;
        }

        if (! $this->relationLoaded('liked')) {
            $this->load(['liked' => function ($query) {
                $query->where('user_id', auth()->id());
            }]);
        }

        $liked = $this->getRelation('liked');

        if (! empty($liked) && $liked->contains('id', auth()->id())) {
            return true;
        }

        return false;
    }

    /**
     * Get the likes count of the video.
     *
     * @return integer
     */
    public function getLikedCountAttribute()
    {
        if (array_key_exists('likesCount', $this->getAttributes())) {
            return $this->likesCount;
        }

        return $this->liked()->count();
    }

    /**
     * Get the users that like the video.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function liked()
    {
        return $this->belongsToMany(User::class, 'likes', 'video_id', 'user_id')->withTimestamps();
    }

    /**
     * Check if the video is liked by the given user.
     *
     * @param User $user
     * @return bool
     */
    public function isLikedBy(User $user)
    {
        return !! $this->liked()->where('user_id', $user->id)->count();
    }
}