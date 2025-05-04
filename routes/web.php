<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ServiceController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Guest routes
Route::middleware('guest')->group(function () {
    Route::get('/login', function () {
        return Inertia::render('auth/login');
    })->name('login');
});

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('admin.dashboard');

    Route::get('/profile', function () {
        return Inertia::render('profile');
    })->name('admin.profile');

    // Services routes
    Route::get('/services', [ServiceController::class, 'index'])->name('admin.services');
    Route::post('/services', [ServiceController::class, 'store'])->name('admin.services.store');
    Route::put('/services/{service}', [ServiceController::class, 'update'])->name('admin.services.update');
    Route::delete('/services/{service}', [ServiceController::class, 'destroy'])->name('admin.services.destroy');
    Route::post('/services/reorder', [ServiceController::class, 'reorder'])->name('admin.services.reorder');

    Route::get('/projects', function () {
        return Inertia::render('projects');
    })->name('admin.projects');

    Route::get('/skills', function () {
        return Inertia::render('skills');
    })->name('admin.skills');

    Route::get('/resume', function () {
        return Inertia::render('resume');
    })->name('admin.resume');

    Route::get('/testimonials', function () {
        return Inertia::render('testimonials');
    })->name('admin.testimonials');

    Route::get('/messages', function () {
        return Inertia::render('messages');
    })->name('admin.messages');

    Route::get('/appearance', function () {
        return Inertia::render('appearance');
    })->name('admin.appearance');

    Route::get('/settings', function () {
        return Inertia::render('settings');
    })->name('admin.settings');
});

require __DIR__.'/auth.php';
