<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;
    public $timestamps = false;

    protected $fillable = ['article_id', 'author_name', 'content', 'created_at'];

    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}
