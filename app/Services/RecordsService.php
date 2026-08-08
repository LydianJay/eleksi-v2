<?php 

namespace App\Services;


use App\Models\Records;
use Carbon\Carbon;

class RecordsService {


    public function paginate(int $perPage = 12) : array {
        
        return  Records::whereBetween('created_at', [
                    Carbon::today()->startOfDay(), 
                    Carbon::today()->endOfDay()
                ])
                ->orderBy('created_at', 'asc')
                ->paginate($perPage)
                ->toArray();

    }

    public function all() : array {
        return Records::all()->toArray();
    }


    public function create(array $data) {

        
        return Records::create($data);
    }

    public function update(array $data, int $id) {
        Records::findOrFail($id)->update($data);
    }


    public function show(int $id) {
       return Records::findOrFail($id)->toArray();
    } 


    public function delete(int $id) {
        Records::findOrFail($id)->delete();
    }
}
