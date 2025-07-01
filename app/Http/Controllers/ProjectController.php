<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('id')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'image' => $project->image ? Storage::url($project->image) : null,
                    'category' => $project->category,
                    'status' => $project->status,
                    'is_featured' => $project->is_featured,
                    'completion_date' => $project->formatted_date,
                    'client_name' => $project->client_name,
                    'project_url' => $project->project_url,
                    'technologies' => $project->technologies,
                ];
            });
        
        return Inertia::render('admin/projects', [
            'projects' => $projects
        ]);
    }

    public function publicIndex()
    {
        $projects = Project::where('status', 'published')
            ->orderBy('id')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'description' => $project->description,
                    'image' => $project->image ? Storage::url($project->image) : null,
                    'category' => $project->category,
                    'status' => $project->status,
                    'is_featured' => $project->is_featured,
                    'completion_date' => $project->formatted_date,
                    'client_name' => $project->client_name,
                    'project_url' => $project->project_url,
                    'technologies' => $project->technologies,
                    'github_url' => $project->github_url,
                    'live_url' => $project->live_url,
                ];
            });

        // Get profile for navigation items
        $profile = Profile::first();

        // Prepare profile data for navigation
        $profileData = null;
        if ($profile) {
            $profileData = [
                'navbar_items' => is_array($profile->navbar_items) ? $profile->navbar_items :
                    (is_string($profile->navbar_items) ? json_decode($profile->navbar_items, true) : []),
                'logo' => [
                    'text' => $profile->logo_text,
                    'type' => $profile->logo_type,
                    'icon' => $profile->logo_icon,
                    'icon_type' => $profile->logo_icon_type,
                    'color' => $profile->logo_color,
                ],
            ];
        }

        return Inertia::render('projects', [
            'projects' => $projects,
            'profile' => $profileData
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|string|max:255',
            'status' => 'required|string|in:draft,published',
            'is_featured' => 'boolean',
            'client_name' => 'nullable|string|max:255',
            'project_url' => 'nullable|url|max:255',
            'completion_date' => 'nullable|date',
            'technologies' => 'nullable|array',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        Project::create($validated);

        return redirect()->back()->with('success', 'Project created successfully.');
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'sometimes|required|string|max:255',
            'status' => 'sometimes|required|string|in:draft,published',
            'is_featured' => 'sometimes|boolean',
            'client_name' => 'nullable|string|max:255',
            'project_url' => 'nullable|url|max:255',
            'completion_date' => 'nullable|date',
            'technologies' => 'nullable|array',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($project->image) {
                Storage::disk('public')->delete($project->image);
            }
            $validated['image'] = $request->file('image')->store('projects', 'public');
        }

        $project->update($validated);

        return redirect()->back()->with('success', 'Project updated successfully.');
    }

    public function destroy(Project $project)
    {
        if ($project->image) {
            Storage::disk('public')->delete($project->image);
        }
        
        $project->delete();

        return redirect()->back()->with('success', 'Project deleted successfully.');
    }

    public function toggleFeatured(Project $project)
    {
        $project->update([
            'is_featured' => !$project->is_featured
        ]);

        return redirect()->back()->with('success', 'Project featured status updated successfully.');
    }

    public function show(Project $project)
    {
        // Check if the project is published
        if ($project->status !== 'published') {
            abort(404);
        }
        
        $projectData = [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'image' => $project->image ? Storage::url($project->image) : null,
            'category' => $project->category,
            'is_featured' => $project->is_featured,
            'completion_date' => $project->formatted_date,
            'client_name' => $project->client_name,
            'project_url' => $project->project_url,
            'technologies' => $project->technologies,
            'github_url' => $project->github_url,
            'live_url' => $project->live_url,
        ];
        
        // Get related projects (same category, excluding current)
        $relatedProjects = Project::where('status', 'published')
            ->where('category', $project->category)
            ->where('id', '!=', $project->id)
            ->orderBy('id')
            ->limit(3)
            ->get()
            ->map(function ($relatedProject) {
                return [
                    'id' => $relatedProject->id,
                    'title' => $relatedProject->title,
                    'description' => $relatedProject->description,
                    'image' => $relatedProject->image ? Storage::url($relatedProject->image) : null,
                    'category' => $relatedProject->category,
                ];
            });
        
        return Inertia::render('project-detail', [
            'project' => $projectData,
            'relatedProjects' => $relatedProjects
        ]);
    }
} 