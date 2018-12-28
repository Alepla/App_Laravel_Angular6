<?php

namespace App\RealWorld\Subscribes;

use App\User;

trait Subscriable
{
    /**
     * Check if the authenticated user has liked the user.
     * We make use of lazy loading if the relationship is not already loaded.
     *
     * @return bool
     */
    public function getSubscribedAttribute()
    {
        if (! auth()->check()) {
            return false;
        }

        if (! $this->relationLoaded('subscribed')) {
            $this->load(['subscribed' => function ($query) {
                $query->where('user_id', auth()->id());
            }]);
        }

        $subscribed = $this->getRelation('subscribed');

        if (! empty($subscribed) && $subscribed->contains('id', auth()->id())) {
            return true;
        }

        return false;
    }

    /**
     * Get the likes count of the user.
     *
     * @return integer
     */
    public function getSubscribedCountAttribute()
    {
        if (array_key_exists('subscribesCount', $this->getAttributes())) {
            return $this->subscribesCount;
        }

        return $this->subscribed()->count();
    }

    /**
     * Get the users that like the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function subscribed()
    {
        return $this->belongsToMany(User::class, 'subscribes', 'users_id', 'user_id')->withTimestamps();
    }

    /**
     * Check if the user is liked by the given user.
     *
     * @param User $user
     * @return bool
     */
    public function isSubscribedBy(User $user)
    {
        return !! $this->subscribed()->where('user_id', $user->id)->count();
    }
}