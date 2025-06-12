<?php

use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\adminDashboardController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Models\ServiceProcessStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/authenticate', [AuthenticationController::class, 'authenticate']);

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::post("/logout", [AuthenticationController::class, 'logout']);
    Route::post("/services/create", [ServiceController::class, 'store']);
    Route::put("/services/{service}", [ServiceController::class, 'update']);
    Route::delete("/services/{service}", [ServiceController::class, 'destroy']);
    Route::post("/projects/create", [ProjectController::class, 'store']);
    Route::put("/projects/{id}", [ProjectController::class, 'update']);
    Route::delete("/projects/{id}", [ProjectController::class, 'destroy']);
});
Route::get("/services", [ServiceController::class, 'index']);
Route::get("/projects", [ProjectController::class, 'index']);
