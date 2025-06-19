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
                'social' => [
                    'github' => $profile->github_url,
                    'twitter' => $profile->twitter_url,
                    'linkedin' => $profile->linkedin_url,
                ],
                'contact' => [
                    'email' => $profile->email,
                    'phone' => $profile->phone,
                    'location' => $profile->location,
                ],
            ] : null
        ]);
    }
} 