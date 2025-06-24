<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'first_name' => 'Admin',
            'last_name' => 'User',
            'email' => 'admin@example.com',
            'employee_id' => 'ADMIN001',
            'role' => 'admin',
            'password' => bcrypt('password'),
        ]);

        User::create([
            'first_name' => 'Employee',
            'last_name' => 'One',
            'email' => 'employee1@example.com',
            'employee_id' => 'EMP001',
            'role' => 'employee',
            'password' => bcrypt('password'),
        ]);
    }
}
