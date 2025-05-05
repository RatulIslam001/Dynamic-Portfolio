<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
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
        'image',
        'category',
        'status',
        'is_featured',
        'client_name',
        'project_url',
        'completion_date',
        'technologies',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_featured' => 'boolean',
        'completion_date' => 'date',
        'technologies' => 'array',
    ];

    /**
     * Get the formatted completion date.
     */
    public function getFormattedDateAttribute(): string
    {
        return $this->completion_date?->format('n/j/Y') ?? '';
    }
} 