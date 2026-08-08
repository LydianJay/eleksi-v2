<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Services\AuthService;
use Illuminate\Support\Facades\Log;
use Throwable;
class AuthController extends Controller
{

    public function __construct(
        private AuthService $authService
    )
    {
    }
    public function login(Request $request) {
        
        

        $validator = Validator::make($request->all(), [
            'email'     => 'required|email',
            'password'  => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'msg' => $validator->messages()->first(),
            ], 422);
        }
        $email      = $request->input('email');
        $password   = $request->input('password');
        try {
            if($this->authService->login($email, $password)) {
                return response()->json([
                    'msg' => 'Invalid email or password!',
                ], 400);
            }
        } catch(Throwable $e) {
            $msg    = $e->getMessage();
            $trace  = $e->getTrace();

            Log::error("$msg -- $trace");

            return response()->json([
                'msg' => 'Server Error'
            ], 500);
        } 
        


        return response()->json([
            'msg'   => "login success",
            'url'   => route('records.view'),
        ]);

    }
}
