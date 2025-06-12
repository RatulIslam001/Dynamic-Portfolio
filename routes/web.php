<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\MessageController;

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

    // Projects routes
    Route::get('/projects', [ProjectController::class, 'index'])->name('admin.projects');
    Route::post('/projects', [ProjectController::class, 'store'])->name('admin.projects.store');
    Route::put('/projects/{project}', [ProjectController::class, 'update'])->name('admin.projects.update');
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy'])->name('admin.projects.destroy');
    Route::post('/projects/{project}/toggle-featured', [ProjectController::class, 'toggleFeatured'])->name('admin.projects.toggle-featured');

    // Skills routes
    Route::get('/skills', [SkillController::class, 'index'])->name('admin.skills');
    Route::post('/skills', [SkillController::class, 'store'])->name('admin.skills.store');
    Route::put('/skills/{skill}', [SkillController::class, 'update'])->name('admin.skills.update');
    Route::delete('/skills/{skill}', [SkillController::class, 'destroy'])->name('admin.skills.destroy');
    Route::post('/skills/reorder', [SkillController::class, 'reorder'])->name('admin.skills.reorder');
    Route::post('/skills/{skill}/toggle-visibility', [SkillController::class, 'toggleVisibility'])->name('admin.skills.toggle-visibility');

    // Experience routes
    Route::get('/experiences', [ExperienceController::class, 'index'])->name('admin.experiences.index');
    Route::post('/experiences', [ExperienceController::class, 'store'])->name('admin.experiences.store');
    Route::put('/experiences/{experience}', [ExperienceController::class, 'update'])->name('admin.experiences.update');
    Route::delete('/experiences/{experience}', [ExperienceController::class, 'destroy'])->name('admin.experiences.destroy');
    Route::post('/experiences/reorder', [ExperienceController::class, 'reorder'])->name('admin.experiences.reorder');

    Route::get('/resume', function () {
        return Inertia::render('resume');
    })->name('admin.resume');

    // Testimonials routes
    Route::get('/testimonials', [TestimonialController::class, 'index'])->name('admin.testimonials');
    Route::post('/testimonials', [TestimonialController::class, 'store'])->name('admin.testimonials.store');
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update'])->name('admin.testimonials.update');
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy'])->name('admin.testimonials.destroy');
    Route::post('/testimonials/reorder', [TestimonialController::class, 'reorder'])->name('admin.testimonials.reorder');
    Route::post('/testimonials/{testimonial}/toggle-featured', [TestimonialController::class, 'toggleFeatured'])->name('admin.testimonials.toggle-featured');

    Route::get('/messages', [MessageController::class, 'index'])->name('admin.messages');
    Route::get('/messages/{message}', [MessageController::class, 'show'])->name('admin.messages.show');
    Route::post('/messages/{message}/read', [MessageController::class, 'markAsRead'])->name('admin.messages.read');
    Route::post('/messages/{message}/unread', [MessageController::class, 'markAsUnread'])->name('admin.messages.unread');
    Route::post('/messages/{message}/reply', [MessageController::class, 'reply'])->name('admin.messages.reply');
    Route::post('/messages/{message}/archive', [MessageController::class, 'archive'])->name('admin.messages.archive');
    Route::post('/messages/{message}/unarchive', [MessageController::class, 'unarchive'])->name('admin.messages.unarchive');
    Route::delete('/messages/{message}', [MessageController::class, 'destroy'])->name('admin.messages.destroy');

    Route::get('/appearance', function () {
        return Inertia::render('admin/appearance');
    })->name('admin.appearance');

    Route::get('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'index'])->name('admin.settings');
    Route::post('/settings', [App\Http\Controllers\Admin\SettingsController::class, 'update'])->name('admin.settings.update');
    Route::post('/settings/clear-cache', [App\Http\Controllers\Admin\SettingsController::class, 'clearCache'])->name('admin.settings.clear-cache');
    Route::post('/settings/export-data', [App\Http\Controllers\Admin\SettingsController::class, 'exportData'])->name('admin.settings.export-data');
});

Route::get('/services', [ServiceController::class, 'publicIndex'])->name('services');

require __DIR__.'/auth.php';
