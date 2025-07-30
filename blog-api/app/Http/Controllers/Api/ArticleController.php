<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'articles' => Article::all()
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string']
        ]);

        $article = Article::create($validated);

        return response()->json($article, 201);
    }

    public function show(Article $article): JsonResponse
    {
        return response()->json(['article' => $article]);
    }
}
