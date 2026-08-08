<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Attributes\Fillable;

#[Fillable([
    'voltage',
    'current',
    'power',
    'energy',
])]
class Records extends Model
{
    protected $table    = 'records';
    public $timestamps  = true;
}
