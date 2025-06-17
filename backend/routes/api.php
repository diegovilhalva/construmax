<?php

use App\Http\Controllers\admin\DashboardController;
use App\Http\Controllers\adminDashboardController;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\TeamMemberController;
use App\Http\Controllers\TestimonialController;
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
    Route::post('/testimonials/create', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{id}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{id}', [TestimonialController::class, 'destroy']);
    Route::post("/team-members/create", [TeamMemberController::class, 'store']);
    Route::put('/team-members/{teamMember}', [TeamMemberController::class, 'update']);
    Route::delete('/team-members/{teamMember}', [TeamMemberController::class, 'destroy']);
    Route::post('/blog-posts/create', [BlogPostController::class, 'store']);
    Route::put('/blog-posts/{id}', [BlogPostController::class, 'update']);
    Route::delete('/blog-posts/{id}', [BlogPostController::class, 'destroy']);
});
Route::get("/services", [ServiceController::class, 'index']);
Route::get("/projects", [ProjectController::class, 'index']);
Route::get("/testimonials", [TestimonialController::class, 'index']);
Route::get("/team-members", [TeamMemberController::class, 'index']);
Route::get('/blog-posts', [BlogPostController::class, 'index']);
Route::get('/blog-posts/search', [BlogPostController::class, 'search']);
Route::get('/blog-posts/most-viewed', [BlogPostController::class, 'mostViewed']);
Route::get('/blog-posts/{slug}', [BlogPostController::class, 'show']);
Route::post('/contact', [ContactController::class, 'send']);

