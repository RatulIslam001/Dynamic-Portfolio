<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class DummyProjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing projects
        // Project::truncate(); // Uncomment if you want to clear all existing projects

        // Sample projects for each category
        $projects = [
            // Web Development projects
            [
                'title' => 'Corporate Website Redesign',
                'description' => 'A complete redesign of a corporate website with modern UI/UX, improved navigation, and responsive design.',
                'category' => 'Web Development',
                'technologies' => ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
                'image' => 'projects/web-development-1.jpg',
                'github_url' => 'https://github.com/example/corporate-website',
                'live_url' => 'https://example-corporate.com',
                'is_featured' => true,
                'status' => 'published',
                'client_name' => 'ABC Corporation',
                'completion_date' => now()->subMonths(2),
            ],
            [
                'title' => 'Restaurant Booking System',
                'description' => 'A dynamic website for restaurant bookings with real-time availability and payment processing.',
                'category' => 'Web Development',
                'technologies' => ['PHP', 'Laravel', 'MySQL', 'Alpine.js', 'Tailwind CSS'],
                'image' => 'projects/web-development-2.jpg',
                'github_url' => 'https://github.com/example/restaurant-booking',
                'live_url' => 'https://foodbooking-example.com',
                'is_featured' => true,
                'status' => 'published',
                'client_name' => 'Gourmet Dining Group',
                'completion_date' => now()->subMonths(3),
            ],

            // E-commerce projects
            [
                'title' => 'Fashion E-commerce Platform',
                'description' => 'A full-featured e-commerce platform for a fashion brand with inventory management, payment processing, and customer accounts.',
                'category' => 'E-commerce',
                'technologies' => ['React', 'Next.js', 'Node.js', 'MongoDB', 'Stripe'],
                'image' => 'projects/ecommerce-1.jpg',
                'github_url' => 'https://github.com/example/fashion-store',
                'live_url' => 'https://fashion-example.com',
                'is_featured' => true,
                'status' => 'published',
                'client_name' => 'StyleHub Clothing',
                'completion_date' => now()->subMonths(1),
            ],
            [
                'title' => 'Electronics Online Store',
                'description' => 'A comprehensive e-commerce solution for an electronics retailer with product comparisons and review system.',
                'category' => 'E-commerce',
                'technologies' => ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Bootstrap'],
                'image' => 'projects/ecommerce-2.jpg',
                'github_url' => 'https://github.com/example/electronics-store',
                'live_url' => 'https://tech-store-example.com',
                'is_featured' => false,
                'status' => 'published',
                'client_name' => 'TechWorld Electronics',
                'completion_date' => now()->subMonths(4),
            ],

            // Mobile App projects
            [
                'title' => 'Fitness Tracking App',
                'description' => 'A mobile application for tracking workouts, setting fitness goals, and monitoring progress with detailed analytics.',
                'category' => 'Mobile App',
                'technologies' => ['React Native', 'Firebase', 'Redux', 'Chart.js'],
                'image' => 'projects/mobile-app-1.jpg',
                'github_url' => 'https://github.com/example/fitness-tracker',
                'live_url' => 'https://fittrack-example.com',
                'is_featured' => true,
                'status' => 'published',
                'client_name' => 'FitLife Health',
                'completion_date' => now()->subMonths(2),
            ],
            [
                'title' => 'Food Delivery App',
                'description' => 'A mobile app for food ordering and delivery with real-time tracking, payment integration, and restaurant management.',
                'category' => 'Mobile App',
                'technologies' => ['Flutter', 'Dart', 'Firebase', 'Google Maps API', 'Stripe'],
                'image' => 'projects/mobile-app-2.jpg',
                'github_url' => 'https://github.com/example/food-delivery',
                'live_url' => 'https://quickbite-example.com',
                'is_featured' => true,
                'status' => 'published',
                'client_name' => 'QuickBite Delivery',
                'completion_date' => now()->subMonths(3),
            ],

            // UI/UX Design projects
            [
                'title' => 'Banking App Redesign',
                'description' => 'A complete UI/UX redesign of a banking mobile application focused on improving user experience and accessibility.',
                'category' => 'UI/UX Design',
                'technologies' => ['Figma', 'Adobe XD', 'Sketch', 'Illustrator', 'Photoshop'],
                'image' => 'projects/ui-ux-1.jpg',
                'github_url' => null,
                'live_url' => 'https://behance.net/example/banking-app',
                'is_featured' => true,
                'status' => 'published',
                'client_name' => 'SecureBank Financial',
                'completion_date' => now()->subMonths(1),
            ],
            [
                'title' => 'Travel Booking UI Kit',
                'description' => 'A comprehensive UI kit for travel booking platforms with a focus on visual hierarchy and intuitive interaction design.',
                'category' => 'UI/UX Design',
                'technologies' => ['Adobe XD', 'Illustrator', 'Photoshop', 'After Effects'],
                'image' => 'projects/ui-ux-2.jpg',
                'github_url' => null,
                'live_url' => 'https://dribbble.com/example/travel-ui-kit',
                'is_featured' => false,
                'status' => 'published',
                'client_name' => 'TravelEase',
                'completion_date' => now()->subMonths(5),
            ],

            // Branding projects
            [
                'title' => 'Cafe Brand Identity',
                'description' => 'Complete brand identity design including logo, color palette, typography, packaging, and marketing materials for a specialty coffee shop.',
                'category' => 'Branding',
                'technologies' => ['Illustrator', 'Photoshop', 'InDesign'],
                'image' => 'projects/branding-1.jpg',
                'github_url' => null,
                'live_url' => 'https://behance.net/example/cafe-branding',
                'is_featured' => true,
                'status' => 'published',
                'client_name' => 'BrewHouse Cafe',
                'completion_date' => now()->subMonths(2),
            ],
            [
                'title' => 'Tech Startup Rebrand',
                'description' => 'A rebranding project for a tech startup, including new visual identity, website design, and marketing collateral.',
                'category' => 'Branding',
                'technologies' => ['Illustrator', 'Photoshop', 'Figma', 'InDesign'],
                'image' => 'projects/branding-2.jpg',
                'github_url' => null,
                'live_url' => 'https://innovatech-example.com',
                'is_featured' => false,
                'status' => 'published',
                'client_name' => 'InnovaTech Solutions',
                'completion_date' => now()->subMonths(4),
            ],
        ];

        foreach ($projects as $project) {
            // Check if a project with the same title already exists
            if (!Project::where('title', $project['title'])->exists()) {
                Project::create($project);
            }
        }
    }
} 