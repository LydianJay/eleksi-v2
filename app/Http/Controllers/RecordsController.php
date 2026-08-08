<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\RecordsService;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Throwable;
use App\Events\NewData;

class RecordsController extends Controller
{
    public function __construct(
        private RecordsService $recordsService
    ){}
    public function index(Request $request) {
        $data = $this->recordsService->today();

        return response()->json($data);
    }

    public function create(Request $request) {
        $validator = Validator::make($request->all(), [
            'voltage'   => 'required',
            'current'   => 'required',
            'power'     => 'required',
            'energy'    => 'required',
        ]);

        if($validator->fails()) {
            return response()->json([
                'msg' => $validator->messages()->first(),
            ], 422);
        }

        $data           = $request->all();

        try {
            $this->recordsService->create($data);


            event(new NewData());
            return response()->json([
                'msg' => 'created!'
            ], 201);

        } catch(Throwable $e) {
            $msg    = $e->getMessage();
            $trace  = $e->getTraceAsString();
            Log::error("$msg -- $trace");

            return response()->json([
                'msg' => 'There was an error',
            ]);
        }
    }

    
}
