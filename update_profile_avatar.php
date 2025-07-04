<?php

// Load Laravel application
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\Profile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

// Get the profile
$profile = Profile::first();

if (!$profile) {
    // Create a new profile if none exists
    $profile = new Profile();
    $profile->full_name = 'John Doe';
    $profile->title = 'Creative Designer & Developer';
    $profile->about = 'I create exceptional digital experiences that solve complex problems and connect people through elegant, user-focused design.';
    $profile->years_experience = 5;
    $profile->projects_completed = 50;
    $profile->is_available = true;
    $profile->cta_text = 'View Work';
    $profile->cta_secondary_text = 'Download CV';
    $profile->cta_url = '#works';
    $profile->cta_secondary_url = '#';
    $profile->logo_text = 'Portfolio';
    $profile->logo_type = 'text_with_icon';
    $profile->logo_icon = 'P';
    $profile->logo_icon_type = 'letter';
    $profile->logo_color = '#20B2AA';
    $profile->navbar_items = [
        ['title' => 'Home', 'href' => 'home'],
        ['title' => 'Services', 'href' => 'services'],
        ['title' => 'Works', 'href' => 'works'],
        ['title' => 'Skills', 'href' => 'skills'],
        ['title' => 'Resume', 'href' => 'resume'],
        ['title' => 'Testimonials', 'href' => 'testimonials'],
        ['title' => 'Contact', 'href' => 'contact']
    ];
    
    echo "Created new profile record\n";
}

// Check if public/images/Profile.png exists
$sourcePath = __DIR__ . '/public/images/Profile.png';
if (!File::exists($sourcePath)) {
    echo "Profile.png not found in public/images directory\n";
    exit(1);
}

// Create the avatars directory if it doesn't exist
$avatarsDir = __DIR__ . '/storage/app/public/avatars';
if (!File::exists($avatarsDir)) {
    File::makeDirectory($avatarsDir, 0755, true);
    echo "Created avatars directory\n";
}

// Copy the Profile.png to storage/app/public/avatars
$destinationPath = 'avatars/profile.png';
File::copy($sourcePath, __DIR__ . '/storage/app/public/' . $destinationPath);

// Update the profile record
$profile->avatar = $destinationPath;
$profile->save();

echo "Profile avatar updated successfully\n"; 