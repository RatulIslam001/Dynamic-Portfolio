<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'proficiency',
        'category',
        'display_type',
        'order',
        'is_visible',
    ];

    protected $casts = [
        'proficiency' => 'integer',
        'order' => 'integer',
        'is_visible' => 'boolean',
    ];

    public function scopeProgress($query)
    {
        return $query->where('display_type', 'progress')->where('is_visible', true)->orderBy('order')->limit(5);
    }

    public function scopeCard($query)
    {
        return $query->where('display_type', 'card')->where('is_visible', true)->orderBy('order')->limit(6);
    }
} 