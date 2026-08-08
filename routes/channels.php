<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('new-data', function ($user) {
    return true;
});
