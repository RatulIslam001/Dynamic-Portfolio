<?php

namespace App\Console\Commands;

use App\Models\Profile;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;

class UpdateProfileAvatar extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'profile:update-avatar';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update profile avatar to use the Profile.png image';

    /**
     * Execute the console command.
     */
    public function handle()
    {
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
            
            $this->info('Created new profile record');
        }

        // Check if public/images/Profile.png exists
        $sourcePath = public_path('images/Profile.png');
        if (!File::exists($sourcePath)) {
            $this->error('Profile.png not found in public/images directory');
            return 1;
        }

        // Create the avatars directory if it doesn't exist
        $avatarsDir = storage_path('app/public/avatars');
        if (!File::exists($avatarsDir)) {
            File::makeDirectory($avatarsDir, 0755, true);
            $this->info('Created avatars directory');
        }

        // Copy the Profile.png to storage/app/public/avatars
        $destinationPath = 'avatars/profile.png';
        File::copy($sourcePath, storage_path('app/public/' . $destinationPath));
        
        // Update the profile record
        $profile->avatar = $destinationPath;
        $profile->save();
        
        $this->info('Profile avatar updated successfully');
        
        return 0;
    }
} 