<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Records;
class DataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $f = fake();
        for($i = 0; $i < 100; $i++) {

            Records::create([
                'voltage' => $f->numberBetween(230, 240),
                'current' => $f->numberBetween(1, 5),
                'power'   => $f->numberBetween(50, 100),
                'energy'  => $f->numberBetween(1, 500),
            ]);

        }


    }
}
