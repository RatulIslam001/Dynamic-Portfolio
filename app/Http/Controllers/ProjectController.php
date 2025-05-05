<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::latest('completion_date')
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'image' => $project->image ? Storage::url($project->image) : null,
                    'category' => $project->category,
                    'status' => $project->status,
                    'is_featured' => $project->is_featured,
                    'completion_date' => $project->formatted_date,
                ];
            });
        
        return Inertia::render('admin/projects', [
            'projects' => $projects
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
} 