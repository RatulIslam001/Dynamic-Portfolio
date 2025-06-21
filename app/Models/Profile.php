<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'full_name',
        'title',
        'about',
        'avatar',
        'resume',
        'github_url',
        'linkedin_url',
        'twitter_url',
        'years_experience',
        'projects_completed',
        'is_available',
        'cta_text',
        'cta_secondary_text',
        'cta_url',
        'cta_secondary_url',
        'logo_text',
        'logo_type',
        'logo_icon',
        'logo_icon_type',
        'logo_color',
        'navbar_items',
    ];

    protected $casts = [
        'is_available' => 'boolean',
        'years_experience' => 'integer',
        'projects_completed' => 'integer',
        'navbar_items' => 'array',
    ];
} 