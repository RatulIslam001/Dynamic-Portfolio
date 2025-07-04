<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\ProjectsManagement;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        try {
            // Get only project cards (not content management)
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

            // Get content management from dedicated table
            $contentManagement = ProjectsManagement::getOrCreate();
        } catch (\Exception $e) {
            \Log::error('Error loading projects in ProjectController: ' . $e->getMessage());
            $projects = collect();
            $contentManagement = null;
        }

        // Default content values if content management record is not available
        $defaultContent = [
            // Home page projects section
            'home_section_badge' => 'Portfolio',
            'home_section_title' => 'Featured Projects',
            'home_section_description' => 'Explore my latest work and see how I have helped clients achieve their goals',
            'home_section_button_text' => 'Explore All Projects',

            // Projects page content
            'page_title' => 'My Projects',
            'page_description' => 'Explore my portfolio of innovative projects that showcase creativity, technical expertise, and problem-solving skills.',
            'page_badge' => 'Portfolio',
            'total_projects_label' => 'Total Projects',
            'categories_label' => 'Categories',
            'technologies_label' => 'Technologies',
            'clients_label' => 'Happy Clients',
            'filter_title' => 'Filter Projects',
            'search_placeholder' => 'Search projects...',
            'category_filter_label' => 'Category',
            'all_categories_text' => 'All Categories',
            'projects_section_title' => 'Featured Work',
            'projects_section_description' => 'A collection of projects that demonstrate my skills and expertise in various technologies.',
            'cta_title' => 'Ready to Start Your Project?',
            'cta_description' => 'Let\'s collaborate to bring your ideas to life with innovative solutions and exceptional results.',
            'cta_primary_button' => 'Start a Project',
            'cta_secondary_button' => 'View All Services',
            'cta_primary_url' => '#contact',
            'cta_secondary_url' => '/services',
            'meta_title' => null,
            'meta_description' => null,
            'meta_keywords' => null,
        ];

        // Use content from the projects management record or defaults
        $content = $contentManagement ? [
            // Home page projects section
            'home_section_badge' => $contentManagement->home_section_badge,
            'home_section_title' => $contentManagement->home_section_title,
            'home_section_description' => $contentManagement->home_section_description,
            'home_section_button_text' => $contentManagement->home_section_button_text,

            // Projects page content
            'page_title' => $contentManagement->page_title,
            'page_description' => $contentManagement->page_description,
            'page_badge' => $contentManagement->page_badge,
            'total_projects_label' => $contentManagement->total_projects_label,
            'categories_label' => $contentManagement->categories_label,
            'technologies_label' => $contentManagement->technologies_label,
            'clients_label' => $contentManagement->clients_label,
            'filter_title' => $contentManagement->filter_title,
            'search_placeholder' => $contentManagement->search_placeholder,
            'category_filter_label' => $contentManagement->category_filter_label,
            'all_categories_text' => $contentManagement->all_categories_text,
            'projects_section_title' => $contentManagement->projects_section_title,
            'projects_section_description' => $contentManagement->projects_section_description,
            'cta_title' => $contentManagement->cta_title,
            'cta_description' => $contentManagement->cta_description,
            'cta_primary_button' => $contentManagement->cta_primary_button,
            'cta_secondary_button' => $contentManagement->cta_secondary_button,
            'cta_primary_url' => $contentManagement->cta_primary_url,
            'cta_secondary_url' => $contentManagement->cta_secondary_url,
            'meta_title' => $contentManagement->meta_title,
            'meta_description' => $contentManagement->meta_description,
            'meta_keywords' => $contentManagement->meta_keywords,
            // Filter categories and custom statistics
            'filter_categories' => $contentManagement->filter_categories ?: ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'],
            'stat_total_projects' => $contentManagement->stat_total_projects,
            'stat_categories' => $contentManagement->stat_categories,
            'stat_technologies' => $contentManagement->stat_technologies,
            'stat_clients' => $contentManagement->stat_clients,
        ] : array_merge($defaultContent, [
            'filter_categories' => ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'],
            'stat_total_projects' => '12+',
            'stat_categories' => '5',
            'stat_technologies' => '28+',
            'stat_clients' => '12+',
        ]);

        try {
            return Inertia::render('admin/projects', [
                'projects' => $projects,
                'content' => $content
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in ProjectController index: ' . $e->getMessage());
            return Inertia::render('admin/projects', [
                'projects' => [],
                'content' => $defaultContent,
                'error' => 'There was an error loading projects. Please check the logs for details.'
            ]);
        }
    }

    public function publicIndex()
    {
        try {
            // Get only published project cards
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

            // Get content management from dedicated table
            $contentManagement = ProjectsManagement::getOrCreate();
        } catch (\Exception $e) {
            \Log::error('Error loading projects in publicIndex: ' . $e->getMessage());
            $projects = collect();
            $contentManagement = null;
        }

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

        // Default content values if content management record is not available
        $defaultPublicContent = [
            'page_title' => 'My Projects',
            'page_description' => 'Explore my portfolio of innovative projects that showcase creativity, technical expertise, and problem-solving skills.',
            'page_badge' => 'Portfolio',
            'total_projects_label' => 'Total Projects',
            'categories_label' => 'Categories',
            'technologies_label' => 'Technologies',
            'clients_label' => 'Happy Clients',
            'filter_title' => 'Filter Projects',
            'search_placeholder' => 'Search projects...',
            'category_filter_label' => 'Category',
            'all_categories_text' => 'All Categories',
            'projects_section_title' => 'Featured Work',
            'projects_section_description' => 'A collection of projects that demonstrate my skills and expertise in various technologies.',
            'cta_title' => 'Ready to Start Your Project?',
            'cta_description' => 'Let\'s collaborate to bring your ideas to life with innovative solutions and exceptional results.',
            'cta_primary_button' => 'Start a Project',
            'cta_secondary_button' => 'View All Services',
            'cta_primary_url' => '#contact',
            'cta_secondary_url' => '/services',
        ];

        // Use content from the projects management record or defaults
        $content = $contentManagement ? [
            'page_title' => $contentManagement->page_title,
            'page_description' => $contentManagement->page_description,
            'page_badge' => $contentManagement->page_badge,
            'total_projects_label' => $contentManagement->total_projects_label,
            'categories_label' => $contentManagement->categories_label,
            'technologies_label' => $contentManagement->technologies_label,
            'clients_label' => $contentManagement->clients_label,
            'filter_title' => $contentManagement->filter_title,
            'search_placeholder' => $contentManagement->search_placeholder,
            'category_filter_label' => $contentManagement->category_filter_label,
            'all_categories_text' => $contentManagement->all_categories_text,
            'projects_section_title' => $contentManagement->projects_section_title,
            'projects_section_description' => $contentManagement->projects_section_description,
            'cta_title' => $contentManagement->cta_title,
            'cta_description' => $contentManagement->cta_description,
            'cta_primary_button' => $contentManagement->cta_primary_button,
            'cta_secondary_button' => $contentManagement->cta_secondary_button,
            'cta_primary_url' => $contentManagement->cta_primary_url,
            'cta_secondary_url' => $contentManagement->cta_secondary_url,
            // Filter categories and custom statistics
            'filter_categories' => $contentManagement->filter_categories ?: ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'],
            'stat_total_projects' => $contentManagement->stat_total_projects,
            'stat_categories' => $contentManagement->stat_categories,
            'stat_technologies' => $contentManagement->stat_technologies,
            'stat_clients' => $contentManagement->stat_clients,
        ] : array_merge($defaultPublicContent, [
            'filter_categories' => ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'],
            'stat_total_projects' => '12+',
            'stat_categories' => '5',
            'stat_technologies' => '28+',
            'stat_clients' => '12+',
        ]);

        return Inertia::render('projects', [
            'projects' => $projects,
            'profile' => $profileData,
            'content' => $content
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

    /**
     * Update projects management content
     */
    public function updateContent(Request $request)
    {
        $validated = $request->validate([
            // Home page projects section
            'home_section_badge' => 'required|string|max:255',
            'home_section_title' => 'required|string|max:255',
            'home_section_description' => 'required|string',
            'home_section_button_text' => 'required|string|max:255',

            // Projects page content
            'page_title' => 'required|string|max:255',
            'page_description' => 'required|string',
            'page_badge' => 'required|string|max:255',
            'total_projects_label' => 'required|string|max:255',
            'categories_label' => 'required|string|max:255',
            'technologies_label' => 'required|string|max:255',
            'clients_label' => 'required|string|max:255',
            'search_placeholder' => 'required|string|max:255',
            'all_categories_text' => 'required|string|max:255',
            'projects_section_title' => 'required|string|max:255',
            'cta_title' => 'required|string|max:255',
            'cta_description' => 'required|string',
            'cta_primary_button' => 'required|string|max:255',
            'cta_secondary_button' => 'required|string|max:255',
            'cta_primary_url' => 'required|string|max:255',
            'cta_secondary_url' => 'required|string|max:255',

            // Filter categories and custom statistics
            'filter_categories' => 'nullable|array',
            'filter_categories.*' => 'string|max:255',
            'stat_total_projects' => 'nullable|string|max:255',
            'stat_categories' => 'nullable|string|max:255',
            'stat_technologies' => 'nullable|string|max:255',
            'stat_clients' => 'nullable|string|max:255',
        ]);

        // Get the first record or create if none exists
        $contentManagement = ProjectsManagement::first();
        if (!$contentManagement) {
            $contentManagement = ProjectsManagement::create($validated);
        } else {
            $contentManagement->update($validated);
        }

        return redirect()->back()->with('success', 'Projects content updated successfully.');
    }
}