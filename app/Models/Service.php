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
        'icon',
        'order',
        'is_active',
        'long_description',
        'projects_count',
        'duration',
        'starting_price',
        'features',
        'technologies'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
        'projects_count' => 'integer',
        'starting_price' => 'decimal:2',
        'features' => 'array',
        'technologies' => 'array'
    ];
} 