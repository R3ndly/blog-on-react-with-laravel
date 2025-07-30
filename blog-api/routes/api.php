<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CommentController;

Route::middleware('api')->group(function () {
    Route::apiResource('articles', ArticleController::class)->only([
        'index', 'store', 'show'
    ]);

    Route::post('articles/{article}/comments', [CommentController::class, 'store']);
    Route::get('articles/{article}/comments', [CommentController::class, 'index']);
});
