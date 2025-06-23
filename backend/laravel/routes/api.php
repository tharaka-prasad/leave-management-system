<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\employee\leaveController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('register', [RegisteredUserController::class, 'store']);
Route::post('login', [LoginController::class, 'login']);

Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    return $request->user();
});
Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('leaves', [leaveController::class, 'index']);
    Route::get('leaves-current-user', [leaveController::class, 'currentUserRecords']);
    Route::post('leaves', [LeaveController::class, 'store']);
    Route::put('leaves/{id}/update', [LeaveController::class, 'update']);
    Route::put('leaves/{id}/updateStatus', [LeaveController::class, 'updateStatus']);
    Route::delete('leaves/{id}/delete', [LeaveController::class, 'destroy']);
});
