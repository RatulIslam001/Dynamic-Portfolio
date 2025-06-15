<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use Carbon\Carbon;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing projects
        Project::truncate();
        
        $projects = [
            [
                'title' => 'E-commerce Platform',
                'description' => 'A comprehensive online shopping platform with advanced features including user authentication, payment processing, inventory management, and analytics dashboard.',
                'image' => 'projects/ecommerce.jpg',
                'category' => 'E-commerce',
                'status' => 'published',
                'technologies' => ['React', 'Redux', 'Node.js', 'MongoDB'],
                'github_url' => 'https://github.com/username/ecommerce',
                'live_url' => 'https://ecommerce-demo.com',
                'client_name' => 'Fashion Retailer Inc.',
                'project_url' => 'https://fashion-store.com',
                'completion_date' => Carbon::now()->subMonths(2),
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'Task Management App',
                'description' => 'A collaborative task management tool with real-time updates, team collaboration features, file sharing, and progress tracking capabilities.',
                'image' => 'projects/task-manager.jpg',
                'category' => 'Web Development',
                'status' => 'published',
                'technologies' => ['Vue.js', 'Firebase', 'Tailwind CSS'],
                'github_url' => 'https://github.com/username/task-manager',
                'live_url' => 'https://task-manager-demo.com',
                'client_name' => 'Productivity Solutions LLC',
                'project_url' => 'https://task-master.io',
                'completion_date' => Carbon::now()->subMonths(4),
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'Analytics Dashboard',
                'description' => 'Real-time data visualization platform with interactive charts, custom reports, data filtering, and export functionality for business intelligence.',
                'image' => 'projects/analytics.jpg',
                'category' => 'Web Development',
                'status' => 'published',
                'technologies' => ['React', 'D3.js', 'Python'],
                'github_url' => 'https://github.com/username/analytics-dashboard',
                'live_url' => 'https://analytics-demo.com',
                'client_name' => 'Data Insights Co.',
                'project_url' => 'https://data-insights.com',
                'completion_date' => Carbon::now()->subMonths(6),
                'is_featured' => true,
                'order' => 3,
            ],
            [
                'title' => 'Food Delivery App',
                'description' => 'Cross-platform mobile application for food ordering with GPS tracking, real-time notifications, payment integration, and user reviews.',
                'image' => 'projects/food-delivery.jpg',
                'category' => 'Mobile App',
                'status' => 'published',
                'technologies' => ['React Native', 'Redux', 'Node.js', 'Google Maps'],
                'github_url' => 'https://github.com/username/food-delivery',
                'live_url' => 'https://food-delivery-demo.com',
                'client_name' => 'Local Eats Inc.',
                'project_url' => 'https://local-eats.com',
                'completion_date' => Carbon::now()->subMonths(8),
                'is_featured' => false,
                'order' => 4,
            ],
            [
                'title' => 'Healthcare Portal',
                'description' => 'Patient management system with appointment scheduling, medical records, telemedicine features, and secure communication platform.',
                'image' => 'projects/healthcare.jpg',
                'category' => 'Web Development',
                'status' => 'published',
                'technologies' => ['Angular', 'Spring Boot', 'MySQL'],
                'github_url' => 'https://github.com/username/healthcare-portal',
                'live_url' => 'https://healthcare-demo.com',
                'client_name' => 'MediCare Solutions',
                'project_url' => 'https://medicare-solutions.com',
                'completion_date' => Carbon::now()->subMonths(10),
                'is_featured' => false,
                'order' => 5,
            ],
            [
                'title' => 'Finance Dashboard',
                'description' => 'Personal finance management application with expense tracking, budget planning, investment portfolio, and financial goal setting.',
                'image' => 'projects/finance.jpg',
                'category' => 'UI/UX Design',
                'status' => 'published',
                'technologies' => ['Figma', 'Adobe XD', 'Sketch'],
                'github_url' => 'https://github.com/username/finance-dashboard',
                'live_url' => 'https://finance-demo.com',
                'client_name' => 'FinTech Startup',
                'project_url' => 'https://fintech-startup.com',
                'completion_date' => Carbon::now()->subMonths(12),
                'is_featured' => false,
                'order' => 6,
            ],
            [
                'title' => 'Real Estate Platform',
                'description' => 'Property listing and management platform with advanced search, virtual tours, mortgage calculator, and agent communication system.',
                'image' => 'projects/real-estate.jpg',
                'category' => 'E-commerce',
                'status' => 'published',
                'technologies' => ['Next.js', 'MongoDB', 'MapBox'],
                'github_url' => 'https://github.com/username/real-estate',
                'live_url' => 'https://real-estate-demo.com',
                'client_name' => 'Dream Homes Realty',
                'project_url' => 'https://dream-homes.com',
                'completion_date' => Carbon::now()->subMonths(14),
                'is_featured' => false,
                'order' => 7,
            ],
            [
                'title' => 'Learning Management System',
                'description' => 'Educational platform with course creation, student progress tracking, video streaming, assignments, and certification system.',
                'image' => 'projects/lms.jpg',
                'category' => 'Web Development',
                'status' => 'published',
                'technologies' => ['Laravel', 'Vue.js', 'MySQL'],
                'github_url' => 'https://github.com/username/lms',
                'live_url' => 'https://lms-demo.com',
                'client_name' => 'EdTech Solutions',
                'project_url' => 'https://edtech-solutions.com',
                'completion_date' => Carbon::now()->subMonths(16),
                'is_featured' => false,
                'order' => 8,
            ],
            [
                'title' => 'Social Media App',
                'description' => 'Social networking platform with post sharing, real-time messaging, story features, and community building tools.',
                'image' => 'projects/social-media.jpg',
                'category' => 'Mobile App',
                'status' => 'published',
                'technologies' => ['Flutter', 'Dart', 'Firebase'],
                'github_url' => 'https://github.com/username/social-media',
                'live_url' => 'https://social-media-demo.com',
                'client_name' => 'Connect Network',
                'project_url' => 'https://connect-network.com',
                'completion_date' => Carbon::now()->subMonths(18),
                'is_featured' => false,
                'order' => 9,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
} 