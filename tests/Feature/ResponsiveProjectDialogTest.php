<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ResponsiveProjectDialogTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        // Create and authenticate a user
        $user = User::factory()->create();
        $this->actingAs($user);
    }

    /** @test */
    public function projects_page_loads_successfully()
    {
        $response = $this->get('/admin/projects');

        $response->assertStatus(200);
        $response->assertSee('Projects');
        // Note: "Add Project" text is in React component, not server-rendered
    }

    /** @test */
    public function projects_page_contains_responsive_dialog_component()
    {
        $response = $this->get('/admin/projects');

        // Check that the page loads the projects component which contains our responsive dialog
        $response->assertStatus(200);
        $response->assertSee('admin/projects', false); // Check component name in data-page
    }

    /** @test */
    public function can_create_project_with_all_fields()
    {
        $projectData = [
            'title' => 'Test Responsive Project',
            'description' => 'A test project to verify responsive dialog functionality',
            'category' => 'Web Development',
            'status' => 'published',
            'is_featured' => true,
            'client_name' => 'Test Client',
            'project_url' => 'https://example.com',
            'completion_date' => '2024-01-15',
            'technologies' => ['React', 'Laravel', 'Tailwind CSS'],
        ];

        $response = $this->post('/admin/projects', $projectData);

        // Should redirect on success
        $response->assertRedirect();

        // Verify project was created
        $this->assertDatabaseHas('projects', [
            'title' => 'Test Responsive Project',
            'category' => 'Web Development',
            'client_name' => 'Test Client',
        ]);
    }

    /** @test */
    public function dialog_form_validation_works_correctly()
    {
        // Test with missing required fields
        $response = $this->post('/admin/projects', []);

        // Should have validation errors for required fields
        $response->assertSessionHasErrors(['title', 'category', 'status']);
    }

    /** @test */
    public function projects_page_has_proper_viewport_meta_tag()
    {
        $response = $this->get('/admin/projects');

        // Check that viewport meta tag is present for mobile responsiveness
        $response->assertSee('name="viewport"', false);
        $response->assertSee('width=device-width, initial-scale=1', false);
    }
}
