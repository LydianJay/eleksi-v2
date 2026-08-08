<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecordsController;

Route::post('records', [RecordsController::class, 'create']);