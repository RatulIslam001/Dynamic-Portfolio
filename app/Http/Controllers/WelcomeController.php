<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServicesManagement;
use App\Models\Project;
use App\Models\ProjectsManagement;
use App\Models\Profile;
use App\Models\Skill;
use App\Models\Testimonial;
use App\Models\Experience;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Schema;

class WelcomeController extends Controller
{
    public function index()
    {
        // Get the profile
        $profile = Profile::first();
        
        // Get services for home page (always show 6 services if available)
        try {
            // First, get featured services
            $featuredServices = Service::where('is_active', true)
                ->where('is_featured', true)
                ->orderBy('order')
                ->get();

            // If we have less than 6 featured services, fill with non-featured ones
            $servicesNeeded = 6 - $featuredServices->count();

            if ($servicesNeeded > 0) {
                $nonFeaturedServices = Service::where('is_active', true)
                    ->where('is_featured', false)
                    ->orderBy('order')
                    ->take($servicesNeeded)
                    ->get();

                $services = $featuredServices->merge($nonFeaturedServices);
            } else {
                $services = $featuredServices->take(6);
            }

            // Get content management from dedicated table
            $contentManagement = ServicesManagement::getOrCreate();
        } catch (\Exception $e) {
            \Log::error('Error loading services in WelcomeController: ' . $e->getMessage());
            $services = collect();
            $contentManagement = null;
        }
        
        // Default content values if content management record is not available
        $defaultServicesContent = [
            'services_section_badge' => 'Professional Services',
            'services_section_title' => 'Areas of Expertise',
            'services_section_description' => 'Delivering tailored, high-quality solutions to help your business thrive in the digital landscape',
            'services_button_text' => 'Explore All Services',
        ];
        
        // Use content from the services management record
        $servicesContent = $contentManagement ? [
            'services_section_badge' => $contentManagement->services_section_badge,
            'services_section_title' => $contentManagement->services_section_title,
            'services_section_description' => $contentManagement->services_section_description,
            'services_button_text' => $contentManagement->services_button_text,
        ] : $defaultServicesContent;
        
        // Get projects for home page (always show 6 projects if available)
        // First, get featured projects
        $featuredProjects = Project::where('status', 'published')
            ->where('is_featured', true)
            ->orderBy('order')
            ->get();

        // If we have less than 6 featured projects, fill with non-featured ones
        $projectsNeeded = 6 - $featuredProjects->count();

        if ($projectsNeeded > 0) {
            $nonFeaturedProjects = Project::where('status', 'published')
                ->where('is_featured', false)
                ->orderBy('order')
                ->take($projectsNeeded)
                ->get();

            $projects = $featuredProjects->merge($nonFeaturedProjects);
        } else {
            $projects = $featuredProjects->take(6);
        }
        
        // Get featured testimonials
        $testimonials = Testimonial::where('is_featured', true)
            ->orderBy('created_at', 'desc')
            ->take(3)
            ->get();
        
        // Get skills grouped by category
        $skills = Skill::where('is_visible', true)
            ->orderBy('category')
            ->orderBy('order')
            ->get()
            ->groupBy('category');
        
        // Get experiences
        $experiences = Experience::orderBy('start_date', 'desc')
            ->get();

        // Get projects content management
        try {
            $projectsManagement = ProjectsManagement::getOrCreate();
        } catch (\Exception $e) {
            \Log::error('Error loading projects content in WelcomeController: ' . $e->getMessage());
            $projectsManagement = null;
        }

        // Default content values if projects management record is not available
        $defaultProjectsContent = [
            'home_section_badge' => 'Portfolio',
            'home_section_title' => 'Featured Projects',
            'home_section_description' => 'Explore my latest work and see how I have helped clients achieve their goals',
            'home_section_button_text' => 'Explore All Projects',
        ];
        
        // Transform profile data to ensure proper structure
        $profileData = null;
        if ($profile) {
            $profileData = [
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
                'avatar' => $profile->avatar ? Storage::url($profile->avatar) : null,
                'logo' => [
                    'text' => $profile->logo_text,
                    'type' => $profile->logo_type,
                    'icon' => $profile->logo_icon,
                    'icon_type' => $profile->logo_icon_type,
                    'color' => $profile->logo_color,
                ],
                'navbar_items' => is_array($profile->navbar_items) ? $profile->navbar_items :
                    (is_string($profile->navbar_items) ? json_decode($profile->navbar_items, true) : []),
                'social' => [
                    'github' => $profile->github_url,
                    'twitter' => $profile->twitter_url,
                    'linkedin' => $profile->linkedin_url,
                ],
                'contact' => [
                    'email' => 'ratul.innovations@gmail.com', // Default email
                    'phone' => '01781-935014', // Default phone
                    'location' => 'Kushtia, Bangladesh', // Default location
                ],
            ];
        }

        return Inertia::render('welcome', [
            'profile' => $profileData,
            'services' => $services,
            'projects' => $projects,
            'testimonials' => $testimonials,
            'skills' => $skills,
            'experiences' => $experiences,
            'servicesContent' => [
                'badge' => $servicesContent['services_section_badge'],
                'title' => $servicesContent['services_section_title'],
                'description' => $servicesContent['services_section_description'],
                'button_text' => $servicesContent['services_button_text'],
            ],
            'projectsContent' => $projectsManagement ? [
                'badge' => $projectsManagement->home_section_badge,
                'title' => $projectsManagement->home_section_title,
                'description' => $projectsManagement->home_section_description,
                'button_text' => $projectsManagement->home_section_button_text,
                'filter_categories' => $projectsManagement->filter_categories ?: ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding'],
            ] : array_merge($defaultProjectsContent, [
                'filter_categories' => ['Web Development', 'E-commerce', 'Mobile App', 'UI/UX Design', 'Branding']
            ]),
            'testimonialsContent' => [
                'badge' => 'Testimonials',
                'title' => 'What Clients Say',
                'description' => 'Feedback from clients who have experienced working with me.',
            ],
        ]);
    }
} 