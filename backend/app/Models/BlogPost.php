<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BlogPost extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'cover_image',
        'team_member_id',
        'status', 
        'views',
        'category', // Campo adicionado
    ];
    
    protected $attributes = [
        'status' => 'draft',
        'views' => 0,
        'category' => 'Geral', // Valor padrão adicionado
    ];
    
    public static function boot()
    {
        parent::boot();

        static::creating(function ($post) {
            $post->slug = Str::slug($post->title);
        });

        static::updating(function ($post) {
            if ($post->isDirty('title')) {
                $post->slug = Str::slug($post->title);
            }
        });
    }

    public function author(): BelongsTo
    {
        return $this->belongsTo(TeamMember::class, 'team_member_id');
    }
}