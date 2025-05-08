<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'subject',
        'message',
        'status',
        'read_at',
        'replied_at',
        'archived_at',
    ];

    protected $casts = [
        'read_at' => 'datetime',
        'replied_at' => 'datetime',
        'archived_at' => 'datetime',
    ];

    public function scopeUnread($query)
    {
        return $query->whereNull('read_at');
    }

    public function scopeRead($query)
    {
        return $query->whereNotNull('read_at')->whereNull('replied_at')->whereNull('archived_at');
    }

    public function scopeReplied($query)
    {
        return $query->whereNotNull('replied_at');
    }

    public function scopeArchived($query)
    {
        return $query->whereNotNull('archived_at');
    }

    public function getStatusAttribute()
    {
        if ($this->archived_at) return 'archived';
        if ($this->replied_at) return 'replied';
        if ($this->read_at) return 'read';
        return 'unread';
    }
} 