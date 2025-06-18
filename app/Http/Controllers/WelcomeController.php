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
                'years_experience' => $profile->years_experience,
                'projects_completed' => $profile->projects_completed,
                'avatar' => '/images/Profile.png',
            ] : null
        ]);
    }
} 