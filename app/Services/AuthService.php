<?php

namespace App\Services;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
class AuthService {

    public function login(string $email, string $password) : bool {
        
        return Auth::attempt(['email' => $email, 'password' => $password]);

    }
}