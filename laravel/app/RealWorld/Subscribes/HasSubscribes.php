<?php

namespace App\RealWorld\Subscribes;

use App\User;

trait HasSubscribes
{
    /**
     * Like the given user.
     *
     * @param User $user
     * @return mixed
     */
    public function subscribe(User $user)
    {
        if (! $this->hasSubscribes($user))
        {
            return $this->subscribes()->attach($user);
        }
    }

    /**
     * Unlike the given user.
     *
     * @param User $user
     * @return mixed
     */
    public function unSubscribe(User $user)
    {
        return $this->subscribes()->detach($user);
    }

    /**
     * Get the user liked by the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function subscribes()
    {
        return $this->belongsToMany(User::class, 'subscribes', 'user_id', 'users_id')->withTimestamps();
    }

    /**
     * Check if the user has liked the given user.
     *
     * @param User $user
     * @return bool
     */
    public function hasSubscribes(User $user)
    {
        return !! $this->subscribes()->where('users_id', $user->id)->count();
    }
}