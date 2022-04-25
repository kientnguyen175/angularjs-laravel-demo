<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Task;

class Image extends Model
{
    protected $fillable = [
        'url'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
