<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;

class ProfileSeeder extends Seeder
{
    public function run(): void
    {
        Profile::create([
            'full_name' => 'John Doe',
            'title' => 'Full Stack Developer',
            'bio' => 'Passionate full-stack developer with 5+ years of experience in building modern web applications. Specialized in Laravel, React, and cloud technologies.',
            'about' => 'I am a dedicated full-stack developer who loves turning complex problems into simple, beautiful, and intuitive solutions. With expertise in both front-end and back-end development, I create scalable web applications that provide exceptional user experiences.',
            'email' => 'john.doe@example.com',
            'phone' => '+1 (555) 123-4567',
            'location' => 'New York, USA',
            'avatar' => null,
            'resume' => null,
            'github_url' => 'https://github.com/johndoe',
            'linkedin_url' => 'https://linkedin.com/in/johndoe',
            'twitter_url' => 'https://twitter.com/johndoe',
        ]);
    }
} 