<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectsManagement extends Model
{
    protected $fillable = [
        // Home page projects section
        'home_section_badge',
        'home_section_title',
        'home_section_description',
        'home_section_button_text',

        // Projects page content
        'page_title',
        'page_description',
        'page_badge',
        'total_projects_label',
        'categories_label',
        'technologies_label',
        'clients_label',

        // Filter categories and statistics
        'filter_categories',
        'stat_total_projects',
        'stat_categories',
        'stat_technologies',
        'stat_clients',

        'search_placeholder',
        'all_categories_text',
        'projects_section_title',
        'cta_title',
        'cta_description',
        'cta_primary_button',
        'cta_secondary_button',
        'cta_primary_url',
        'cta_secondary_url',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'filter_categories' => 'array',
    ];

    /**
     * Get the first (and should be only) projects management record.
     * Create one with defaults if it doesn't exist.
     *
     * @return ProjectsManagement
     */
    public static function getOrCreate()
    {
        // Always get fresh data from database - get the most recently updated record
        $record = static::orderBy('updated_at', 'desc')->first();

        if (!$record) {
            $record = static::create([
                // Home page projects section defaults
                'home_section_badge' => 'Portfolio',
                'home_section_title' => 'Featured Projects',
                'home_section_description' => 'Explore my latest work and see how I have helped clients achieve their goals',
                'home_section_button_text' => 'Explore All Projects',

                // Projects page defaults
                'page_title' => 'My Projects',
                'page_description' => 'Explore my portfolio of innovative projects that showcase creativity, technical expertise, and problem-solving skills.',
                'page_badge' => 'Portfolio',
                'total_projects_label' => 'Total Projects',
                'categories_label' => 'Categories',
                'technologies_label' => 'Technologies',
                'clients_label' => 'Happy Clients',

                // Filter categories (same for both home and projects page)
                'filter_categories' => ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'],

                // Custom statistics (override auto-calculated ones)
                'stat_total_projects' => '12+',
                'stat_categories' => '5',
                'stat_technologies' => '28+',
                'stat_clients' => '12+',

                'search_placeholder' => 'Search projects...',
                'all_categories_text' => 'All Categories',
                'projects_section_title' => 'Featured Work',
                'cta_title' => 'Ready to Start Your Project?',
                'cta_description' => 'Let\'s collaborate to bring your ideas to life with innovative solutions and exceptional results.',
                'cta_primary_button' => 'Start a Project',
                'cta_secondary_button' => 'View All Services',
                'cta_primary_url' => '#contact',
                'cta_secondary_url' => '/services',
            ]);
        }

        return $record;
    }
}
