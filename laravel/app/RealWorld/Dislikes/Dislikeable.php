<?php

namespace App\RealWorld\Dislikes;

use App\User;

trait Dislikeable
{
    /**
     * Check if the authenticated user has liked the video.
     * We make use of lazy loading if the relationship is not already loaded.
     *
     * @return bool
     */
    public function getDisLikedAttribute()
    {
        if (! auth()->check()) {
            return false;
        }

        if (! $this->relationLoaded('disliked')) {
            $this->load(['disliked' => function ($query) {
                $query->where('user_id', auth()->id());
            }]);
        }

        $disliked = $this->getRelation('disliked');

        if (! empty($disliked) && $disliked->contains('id', auth()->id())) {
            return true;
        }

        return false;
    }

    /**
     * Get the likes count of the video.
     *
     * @return integer
     */
    public function getDisLikedCountAttribute()
    {
        if (array_key_exists('dislikesCount', $this->getAttributes())) {
            return $this->likesCount;
        }

        return $this->disliked()->count();
    }

    /**
     * Get the users that like the video.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function disliked()
    {
        return $this->belongsToMany(User::class, 'dislikes', 'video_id', 'user_id')->withTimestamps();
    }

    /**
     * Check if the video is liked by the given user.
     *
     * @param User $user
     * @return bool
     */
    public function isDisLikedBy(User $user)
    {
        return !! $this->disliked()->where('user_id', $user->id)->count();
    }
}