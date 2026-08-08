<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RecordsController;
use App\Http\Controllers\AuthController;

Route::get('/login', function () {
    return view('view');
});

Route::post('/login', [AuthController::class, 'login']);


Route::middleware('auth:web')->group(function (){
    Route::apiResource('records', RecordsController::class);

    Route::prefix('view')->group(function(){
        Route::get('records', function(){
            return view('view');
        })->name('records.view');
    });
});