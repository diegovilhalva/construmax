<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
     use HasFactory;
     
        protected $fillable = [
        'title',
        'description',
        'detailed_description',
        'image',
    ];

    public function features()
    {
        return $this->hasMany(ServiceFeature::class);
    }


    public function processSteps()
    {
        return $this->hasMany(ServiceProcessStep::class)->orderBy('step');
    }    
}
