<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Project;
use App\Models\ProjectsManagement;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryComboboxTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create admin user
        $this->user = User::factory()->create([
            'email' => 'admin@example.com',
        ]);
    }

    /** @test */
    public function admin_projects_page_loads_with_category_options()
    {
        // Create some projects with different categories
        Project::create([
            'title' => 'Test Project 1',
            'description' => 'Test description',
            'category' => 'Web Development',
            'status' => 'published',
            'is_featured' => false,
            'completion_date' => '2024-01-01',
            'technologies' => ['React', 'Laravel'],
        ]);

        Project::create([
            'title' => 'Test Project 2',
            'description' => 'Test description',
            'category' => 'Mobile App',
            'status' => 'published',
            'is_featured' => false,
            'completion_date' => '2024-01-01',
            'technologies' => ['React Native'],
        ]);

        Project::create([
            'title' => 'Test Project 3',
            'description' => 'Test description',
            'category' => 'Custom Category',
            'status' => 'published',
            'is_featured' => false,
            'completion_date' => '2024-01-01',
            'technologies' => ['Vue.js'],
        ]);

        // Create projects management with filter categories
        ProjectsManagement::create([
            'home_section_badge' => 'Portfolio',
            'home_section_title' => 'Featured Projects',
            'home_section_description' => 'Test description',
            'home_section_button_text' => 'View All',
            'page_title' => 'Projects',
            'page_description' => 'Test description',
            'page_badge' => 'Portfolio',
            'total_projects_label' => 'Projects',
            'categories_label' => 'Categories',
            'technologies_label' => 'Technologies',
            'clients_label' => 'Clients',
            'search_placeholder' => 'Search projects...',
            'all_categories_text' => 'All',
            'projects_section_title' => 'Projects',
            'cta_title' => 'Ready to Start Your Project?',
            'cta_description' => 'Let\'s collaborate',
            'cta_primary_button' => 'Get Started',
            'cta_secondary_button' => 'View Services',
            'cta_primary_url' => '/contact',
            'cta_secondary_url' => '/services',
            'filter_categories' => ['E-commerce', 'UI/UX Design'],
        ]);

        $response = $this->actingAs($this->user)
            ->get('/admin/projects');

        $response->assertStatus(200);
        
        // Check that the page contains the projects data
        $response->assertInertia(fn ($page) => 
            $page->component('admin/projects')
                ->has('projects')
                ->has('content')
                ->where('content.filter_categories', ['E-commerce', 'UI/UX Design'])
        );
    }

    /** @test */
    public function can_create_project_with_custom_category()
    {
        $projectData = [
            'title' => 'Test Project',
            'description' => 'Test description',
            'category' => 'Custom New Category', // This should be a new category
            'status' => 'published',
            'is_featured' => false,
            'client_name' => 'Test Client',
            'project_url' => 'https://example.com',
            'completion_date' => '2024-01-01',
            'technologies' => ['React', 'Laravel'],
        ];

        $response = $this->actingAs($this->user)
            ->post('/admin/projects', $projectData);

        $response->assertRedirect();
        
        // Verify the project was created with the custom category
        $this->assertDatabaseHas('projects', [
            'title' => 'Test Project',
            'category' => 'Custom New Category',
        ]);
    }

    /** @test */
    public function can_update_project_with_different_category()
    {
        $project = Project::create([
            'title' => 'Test Project',
            'description' => 'Test description',
            'category' => 'Web Development',
            'status' => 'published',
            'is_featured' => false,
            'completion_date' => '2024-01-01',
            'technologies' => ['React', 'Laravel'],
        ]);

        $updateData = [
            'title' => $project->title,
            'description' => $project->description,
            'category' => 'Another Custom Category', // Change to new category
            'status' => $project->status,
            'is_featured' => $project->is_featured,
            'client_name' => $project->client_name,
            'project_url' => $project->project_url,
            'completion_date' => $project->completion_date->format('Y-m-d'),
            'technologies' => $project->technologies,
            '_method' => 'PUT',
        ];

        $response = $this->actingAs($this->user)
            ->post("/admin/projects/{$project->id}", $updateData);

        $response->assertRedirect();
        
        // Verify the project category was updated
        $this->assertDatabaseHas('projects', [
            'id' => $project->id,
            'category' => 'Another Custom Category',
        ]);
    }

    /** @test */
    public function category_validation_works_correctly()
    {
        $projectData = [
            'title' => 'Test Project',
            'description' => 'Test description',
            'category' => '', // Empty category should fail validation
            'status' => 'published',
            'is_featured' => false,
        ];

        $response = $this->actingAs($this->user)
            ->post('/admin/projects', $projectData);

        $response->assertSessionHasErrors(['category']);
    }
}
