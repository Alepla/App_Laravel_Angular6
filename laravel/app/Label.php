<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Label extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name'
    ];

    /**
     * Get all the articles that belong to the tag.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function videos()
    {
        return $this->belongsToMany(Video::class)->latest();
    }
}
