<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\ProjectsManagement;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProjectsManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_projects_management_returns_default_data_when_database_is_empty()
    {
        // Ensure database is empty
        $this->assertDatabaseCount('projects_management', 0);
        
        // Call getOrCreate method
        $projectsManagement = ProjectsManagement::getOrCreate();
        
        // Verify default data is created
        $this->assertNotNull($projectsManagement);
        $this->assertEquals('Portfolio', $projectsManagement->home_section_badge);
        $this->assertEquals('Featured Projects', $projectsManagement->home_section_title);
        $this->assertEquals('Explore my latest work and see how I have helped clients achieve their goals', $projectsManagement->home_section_description);
        $this->assertEquals('Explore All Projects', $projectsManagement->home_section_button_text);
        
        // Verify projects page defaults
        $this->assertEquals('My Projects', $projectsManagement->page_title);
        $this->assertEquals('Portfolio', $projectsManagement->page_badge);
        $this->assertEquals('Total Projects', $projectsManagement->total_projects_label);
        
        // Verify record was created in database
        $this->assertDatabaseCount('projects_management', 1);
    }

    public function test_projects_management_returns_existing_data_when_database_has_record()
    {
        // Create a record with custom data
        $customData = [
            'home_section_badge' => 'Custom Portfolio',
            'home_section_title' => 'Custom Projects',
            'home_section_description' => 'Custom description',
            'home_section_button_text' => 'Custom Button',
            'page_title' => 'Custom Page Title',
            'page_badge' => 'Custom Badge',
            'page_description' => 'Custom page description',
            'total_projects_label' => 'Custom Total',
            'categories_label' => 'Custom Categories',
            'technologies_label' => 'Custom Technologies',
            'clients_label' => 'Custom Clients',
            'filter_title' => 'Custom Filter',
            'search_placeholder' => 'Custom search...',
            'category_filter_label' => 'Custom Category',
            'all_categories_text' => 'Custom All Categories',
            'projects_section_title' => 'Custom Section Title',
            'projects_section_description' => 'Custom section description',
            'cta_title' => 'Custom CTA Title',
            'cta_description' => 'Custom CTA description',
            'cta_primary_button' => 'Custom Primary',
            'cta_secondary_button' => 'Custom Secondary',
            'cta_primary_url' => '#custom-primary',
            'cta_secondary_url' => '/custom-secondary',
        ];
        
        ProjectsManagement::create($customData);
        
        // Call getOrCreate method
        $projectsManagement = ProjectsManagement::getOrCreate();
        
        // Verify custom data is returned
        $this->assertEquals('Custom Portfolio', $projectsManagement->home_section_badge);
        $this->assertEquals('Custom Projects', $projectsManagement->home_section_title);
        $this->assertEquals('Custom description', $projectsManagement->home_section_description);
        $this->assertEquals('Custom Button', $projectsManagement->home_section_button_text);
        
        // Verify only one record exists
        $this->assertDatabaseCount('projects_management', 1);
    }

    public function test_admin_projects_page_loads_with_default_content()
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->get('/admin/projects');
        
        $response->assertOk();
        
        // Verify that default content is passed to the view
        $response->assertInertia(fn ($page) => 
            $page->component('admin/projects')
                ->has('content')
                ->where('content.home_section_badge', 'Portfolio')
                ->where('content.home_section_title', 'Featured Projects')
                ->where('content.page_title', 'My Projects')
        );
    }

    public function test_public_projects_page_loads_with_default_content()
    {
        $response = $this->get('/projects');
        
        $response->assertOk();
        
        // Verify that default content is passed to the view
        $response->assertInertia(fn ($page) => 
            $page->component('projects')
                ->has('content')
                ->where('content.page_title', 'My Projects')
                ->where('content.page_badge', 'Portfolio')
                ->where('content.total_projects_label', 'Total Projects')
        );
    }

    public function test_home_page_loads_with_default_projects_content()
    {
        $response = $this->get('/');

        $response->assertOk();

        // Verify that default projects content is passed to the home page
        $response->assertInertia(fn ($page) =>
            $page->component('welcome')
                ->has('projectsContent')
                ->where('projectsContent.badge', 'Portfolio')
                ->where('projectsContent.title', 'Featured Projects')
                ->where('projectsContent.description', 'Explore my latest work and see how I have helped clients achieve their goals')
                ->where('projectsContent.button_text', 'Explore All Projects')
                ->has('projectsContent.filter_categories')
                ->where('projectsContent.filter_categories.0', 'Web Development')
                ->where('projectsContent.filter_categories.1', 'E-commerce')
        );
    }

    public function test_projects_management_handles_custom_filter_categories()
    {
        // Create a record with custom filter categories
        $customData = [
            'home_section_badge' => 'Portfolio',
            'home_section_title' => 'Featured Projects',
            'home_section_description' => 'Test description',
            'home_section_button_text' => 'View Projects',
            'page_title' => 'My Projects',
            'page_badge' => 'Portfolio',
            'page_description' => 'Test page description',
            'total_projects_label' => 'Total Projects',
            'categories_label' => 'Categories',
            'technologies_label' => 'Technologies',
            'clients_label' => 'Happy Clients',
            'filter_title' => 'Filter Projects',
            'search_placeholder' => 'Search projects...',
            'category_filter_label' => 'Category',
            'all_categories_text' => 'All Categories',
            'projects_section_title' => 'Featured Work',
            'projects_section_description' => 'Test section description',
            'cta_title' => 'Ready to Start Your Project?',
            'cta_description' => 'Test CTA description',
            'cta_primary_button' => 'Start a Project',
            'cta_secondary_button' => 'View All Services',
            'cta_primary_url' => '#contact',
            'cta_secondary_url' => '/services',
            'filter_categories' => ['Custom Category 1', 'Custom Category 2', 'Custom Category 3'],
            'stat_total_projects' => '25+',
            'stat_categories' => '8',
            'stat_technologies' => '40+',
            'stat_clients' => '20+',
        ];

        ProjectsManagement::create($customData);

        $response = $this->get('/projects');

        $response->assertOk();

        // Verify that custom filter categories and statistics are used
        $response->assertInertia(fn ($page) =>
            $page->component('projects')
                ->has('content')
                ->has('content.filter_categories')
                ->where('content.filter_categories.0', 'Custom Category 1')
                ->where('content.filter_categories.1', 'Custom Category 2')
                ->where('content.filter_categories.2', 'Custom Category 3')
                ->where('content.stat_total_projects', '25+')
                ->where('content.stat_categories', '8')
                ->where('content.stat_technologies', '40+')
                ->where('content.stat_clients', '20+')
        );
    }

    public function test_home_page_uses_custom_filter_categories()
    {
        // Create a record with custom filter categories
        ProjectsManagement::create([
            'home_section_badge' => 'Portfolio',
            'home_section_title' => 'Featured Projects',
            'home_section_description' => 'Test description',
            'home_section_button_text' => 'View Projects',
            'page_title' => 'My Projects',
            'page_badge' => 'Portfolio',
            'page_description' => 'Test page description',
            'total_projects_label' => 'Total Projects',
            'categories_label' => 'Categories',
            'technologies_label' => 'Technologies',
            'clients_label' => 'Happy Clients',
            'filter_title' => 'Filter Projects',
            'search_placeholder' => 'Search projects...',
            'category_filter_label' => 'Category',
            'all_categories_text' => 'All Categories',
            'projects_section_title' => 'Featured Work',
            'projects_section_description' => 'Test section description',
            'cta_title' => 'Ready to Start Your Project?',
            'cta_description' => 'Test CTA description',
            'cta_primary_button' => 'Start a Project',
            'cta_secondary_button' => 'View All Services',
            'cta_primary_url' => '#contact',
            'cta_secondary_url' => '/services',
            'filter_categories' => ['React Development', 'Vue.js Apps', 'Laravel Projects'],
        ]);

        $response = $this->get('/');

        $response->assertOk();

        // Verify that custom filter categories are used on home page
        $response->assertInertia(fn ($page) =>
            $page->component('welcome')
                ->has('projectsContent')
                ->has('projectsContent.filter_categories')
                ->where('projectsContent.filter_categories.0', 'React Development')
                ->where('projectsContent.filter_categories.1', 'Vue.js Apps')
                ->where('projectsContent.filter_categories.2', 'Laravel Projects')
        );
    }

    public function test_admin_can_update_filter_categories_and_statistics()
    {
        $user = User::factory()->create();

        // Create initial record
        ProjectsManagement::create([
            'home_section_badge' => 'Portfolio',
            'home_section_title' => 'Featured Projects',
            'home_section_description' => 'Test description',
            'home_section_button_text' => 'View Projects',
            'page_title' => 'My Projects',
            'page_badge' => 'Portfolio',
            'page_description' => 'Test page description',
            'total_projects_label' => 'Total Projects',
            'categories_label' => 'Categories',
            'technologies_label' => 'Technologies',
            'clients_label' => 'Happy Clients',
            'filter_title' => 'Filter Projects',
            'search_placeholder' => 'Search projects...',
            'category_filter_label' => 'Category',
            'all_categories_text' => 'All Categories',
            'projects_section_title' => 'Featured Work',
            'projects_section_description' => 'Test section description',
            'cta_title' => 'Ready to Start Your Project?',
            'cta_description' => 'Test CTA description',
            'cta_primary_button' => 'Start a Project',
            'cta_secondary_button' => 'View All Services',
            'cta_primary_url' => '#contact',
            'cta_secondary_url' => '/services',
        ]);

        // Update with new filter categories and statistics
        $updateData = [
            'home_section_badge' => 'Portfolio',
            'home_section_title' => 'Featured Projects',
            'home_section_description' => 'Updated description',
            'home_section_button_text' => 'View Projects',
            'page_title' => 'My Projects',
            'page_badge' => 'Portfolio',
            'page_description' => 'Updated page description',
            'total_projects_label' => 'Total Projects',
            'categories_label' => 'Categories',
            'technologies_label' => 'Technologies',
            'clients_label' => 'Happy Clients',
            'filter_title' => 'Filter Projects',
            'search_placeholder' => 'Search projects...',
            'category_filter_label' => 'Category',
            'all_categories_text' => 'All Categories',
            'projects_section_title' => 'Featured Work',
            'projects_section_description' => 'Updated section description',
            'cta_title' => 'Ready to Start Your Project?',
            'cta_description' => 'Updated CTA description',
            'cta_primary_button' => 'Start a Project',
            'cta_secondary_button' => 'View All Services',
            'cta_primary_url' => '#contact',
            'cta_secondary_url' => '/services',
            'filter_categories' => ['Updated Category 1', 'Updated Category 2'],
            'stat_total_projects' => '50+',
            'stat_categories' => '10',
            'stat_technologies' => '60+',
            'stat_clients' => '30+',
        ];

        $response = $this->actingAs($user)->post(route('admin.projects.content.update'), $updateData);

        $response->assertRedirect();
        $response->assertSessionHas('success', 'Projects content updated successfully.');

        // Verify the data was updated in the database
        $this->assertDatabaseHas('projects_management', [
            'filter_categories' => json_encode(['Updated Category 1', 'Updated Category 2']),
            'stat_total_projects' => '50+',
            'stat_categories' => '10',
            'stat_technologies' => '60+',
            'stat_clients' => '30+',
        ]);
    }

    public function test_home_page_description_is_dynamic_from_admin_panel()
    {
        // Create a record with custom description
        ProjectsManagement::create([
            // Home page projects section
            'home_section_badge' => 'Portfolio',
            'home_section_title' => 'Featured Projects',
            'home_section_description' => 'This is a custom dynamic description from admin panel',
            'home_section_button_text' => 'Explore All Projects',

            // Projects page
            'page_title' => 'My Projects',
            'page_description' => 'Test page description',
            'page_badge' => 'Portfolio',
            'total_projects_label' => 'Total Projects',
            'categories_label' => 'Categories',
            'technologies_label' => 'Technologies',
            'clients_label' => 'Happy Clients',

            // Filter categories
            'filter_categories' => ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'],

            // Custom statistics
            'stat_total_projects' => '12+',
            'stat_categories' => '5',
            'stat_technologies' => '28+',
            'stat_clients' => '12+',

            'search_placeholder' => 'Search projects...',
            'all_categories_text' => 'All Categories',
            'projects_section_title' => 'Featured Work',
            'cta_title' => 'Ready to Start Your Project?',
            'cta_description' => 'Test CTA description',
            'cta_primary_button' => 'Start a Project',
            'cta_secondary_button' => 'View All Services',
            'cta_primary_url' => '#contact',
            'cta_secondary_url' => '/services',
        ]);

        $response = $this->get('/');

        $response->assertOk();

        // Verify that the custom description is used on home page
        $response->assertInertia(fn ($page) =>
            $page->component('welcome')
                ->has('projectsContent')
                ->where('projectsContent.description', 'This is a custom dynamic description from admin panel')
        );
    }
}
