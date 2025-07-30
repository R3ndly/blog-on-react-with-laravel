<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = ['title', 'content', 'created_at'];

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
