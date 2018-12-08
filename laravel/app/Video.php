<?php

namespace App;

use App\RealWorld\Slug\HasSlug;
use App\RealWorld\Filters\Filterable;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use HasSlug, Filterable;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'link'
    ];

    protected $with = [
        'labels'
    ];

    public function getLabelListAttribute()
    {
        return $this->labels->pluck('name')->toArray();
    }

    /**
     * Get the key name for route model binding.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }

    /**
     * Get the attribute name to slugify.
     *
     * @return string
     */
    public function getSlugSourceColumn()
    {
        return 'title';
    }

    public function labels()
    {
        return $this->belongsToMany(Label::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeLoadRelations($query)
    {
    
    }
}
