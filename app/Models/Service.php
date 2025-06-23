<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'title',
        'description',
        'long_description',
        'icon',
        'price',
        'starting_price',
        'duration',
        'projects_count',
        'features',
        'technologies',
        'image_url',
        'is_active',
        'is_featured',
        'order'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
        'features' => 'array',
        'technologies' => 'array',
        'projects_count' => 'integer',
        'order' => 'integer'
    ];
} 