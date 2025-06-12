<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'status',
        'progress',
        'location',
        'description',
        'image',
        'start_date',
        'end_date',
        'area',
        'investment',
        'category',
        'completed',
    ];
}
