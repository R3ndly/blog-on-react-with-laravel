<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function index(int $id): JsonResponse
    {
        return response()->json(Comment::where('article_id', $id)->get(), 200);
    }

    public function store(Request $request, Article $article): JsonResponse
    {
        $validated = $request->validate([
            'author_name' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string']
        ]);

        $comment = $article->comments()->create($validated);

        return response()->json(['comment' => $comment], 201);
    }
}
