<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Image;

class Task extends Model
{
    protected $fillable = [
        'title', 
        'content'
    ];

    public function image()
    {
        return $this->hasOne(Image::class);
    }
}
