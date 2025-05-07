<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $fillable = [
        'full_name',
        'title',
        'bio',
        'about',
        'email',
        'phone',
        'location',
        'avatar',
        'resume',
        'github_url',
        'linkedin_url',
        'twitter_url',
    ];
} 