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
            'about' => 'I am a dedicated full-stack developer who loves turning complex problems into simple, beautiful, and intuitive solutions. With expertise in both front-end and back-end development, I create scalable web applications that provide exceptional user experiences.',
            'avatar' => null,
            'resume' => null,
            'github_url' => 'https://github.com/johndoe',
            'linkedin_url' => 'https://linkedin.com/in/johndoe',
            'twitter_url' => 'https://twitter.com/johndoe',
            'years_experience' => 5,
            'projects_completed' => 50,
            'is_available' => true,
            'cta_text' => 'Contact Me',
            'cta_url' => '#contact',
            'cta_secondary_text' => 'View Portfolio',
            'cta_secondary_url' => '#portfolio',
            'logo_text' => 'Portfolio',
            'logo_type' => 'text_with_icon',
            'logo_icon' => 'P',
            'logo_icon_type' => 'letter',
            'logo_color' => '#20B2AA',
            'navbar_items' => json_encode([
                ['title' => 'Home', 'href' => 'home'],
                ['title' => 'Services', 'href' => 'services'],
                ['title' => 'Projects', 'href' => 'projects'],
                ['title' => 'Skills', 'href' => 'skills'],
                ['title' => 'Resume', 'href' => 'resume'],
                ['title' => 'Testimonials', 'href' => 'testimonials'],
                ['title' => 'Contact', 'href' => 'contact']
            ]),
        ]);
    }
} 