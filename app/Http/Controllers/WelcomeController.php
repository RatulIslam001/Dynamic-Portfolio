<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Project;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class WelcomeController extends Controller
{
    public function index()
    {
        $services = Service::where('is_active', true)
            ->orderBy('order')
            ->take(6)
            ->get();
        
        $projects = Project::where('status', 'published')
            ->where('is_featured', true)
            ->orderBy('id')
            ->latest('completion_date')
            ->take(6)
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'image' => $project->image ? Storage::url($project->image) : null,
                    'category' => $project->category,
                    'technologies' => $project->technologies,
                ];
            });
        
        $profile = Profile::first();
        
        // Default navbar items if not set in database
        $defaultNavbarItems = [
            ['title' => 'Home', 'href' => 'home'],
            ['title' => 'Services', 'href' => 'services'],
            ['title' => 'Works', 'href' => 'works'],
            ['title' => 'Skills', 'href' => 'skills'],
            ['title' => 'Resume', 'href' => 'resume'],
            ['title' => 'Testimonials', 'href' => 'testimonials'],
            ['title' => 'Contact', 'href' => 'contact']
        ];
        
        return Inertia::render('welcome', [
            'services' => $services,
            'projects' => $projects,
            'profile' => $profile ? [
                'full_name' => $profile->full_name,
                'title' => $profile->title,
                'about' => $profile->about,
                'years_experience' => $profile->years_experience,
                'projects_completed' => $profile->projects_completed,
                'is_available' => $profile->is_available,
                'cta_text' => $profile->cta_text,
                'cta_secondary_text' => $profile->cta_secondary_text,
                'cta_url' => $profile->cta_url,
                'cta_secondary_url' => $profile->cta_secondary_url,
                'avatar' => $profile->avatar ? Storage::url($profile->avatar) : '/images/Profile.png',
                'logo' => [
                    'text' => $profile->logo_text,
                    'type' => $profile->logo_type,
                    'icon' => $profile->logo_icon,
                    'icon_type' => $profile->logo_icon_type,
                    'color' => $profile->logo_color,
                ],
                'navbar_items' => $profile->navbar_items ?? $defaultNavbarItems,
                'social' => [
                    'github' => $profile->github_url,
                    'twitter' => $profile->twitter_url,
                    'linkedin' => $profile->linkedin_url,
                ],
                'contact' => [
                    'email' => 'contact@example.com',
                    'phone' => '+1(123) 456-7890',
                    'location' => 'San Francisco, CA, USA',
                ],
            ] : null
        ]);
    }
} 