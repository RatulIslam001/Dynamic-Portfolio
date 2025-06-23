<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;
use Carbon\Carbon;

class ProjectDummySeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'Portfolio Website',
                'description' => 'A personal portfolio website built with Laravel and React to showcase projects and services.',
                'image' => 'projects/portfolio.jpg',
                'category' => 'Web Development',
                'status' => 'published',
                'technologies' => ['Laravel', 'React', 'Inertia.js', 'Tailwind CSS'],
                'github_url' => 'https://github.com/username/portfolio',
                'live_url' => 'https://portfolio-demo.com',
                'client_name' => 'Self Project',
                'project_url' => 'https://portfolio-demo.com',
                'completion_date' => Carbon::now()->subDays(15),
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'E-Learning Platform',
                'description' => 'An interactive e-learning platform with course management, video lessons, quizzes, and student tracking.',
                'image' => 'projects/elearning.jpg',
                'category' => 'Web Development',
                'status' => 'published',
                'technologies' => ['PHP', 'MySQL', 'Vue.js', 'Bootstrap'],
                'github_url' => 'https://github.com/username/elearning',
                'live_url' => 'https://elearning-demo.com',
                'client_name' => 'Education Tech Inc.',
                'project_url' => 'https://edtech.com',
                'completion_date' => Carbon::now()->subDays(45),
                'is_featured' => false,
                'order' => 2,
            ],
            [
                'title' => 'Inventory Management System',
                'description' => 'A comprehensive inventory management system for tracking products, orders, suppliers, and generating reports.',
                'image' => 'projects/inventory.jpg',
                'category' => 'Web Application',
                'status' => 'published',
                'technologies' => ['Laravel', 'Alpine.js', 'MySQL', 'Livewire'],
                'github_url' => 'https://github.com/username/inventory',
                'live_url' => 'https://inventory-demo.com',
                'client_name' => 'Supply Chain Solutions',
                'project_url' => 'https://supplychain.com',
                'completion_date' => Carbon::now()->subDays(75),
                'is_featured' => false,
                'order' => 3,
            ],
            [
                'title' => 'Mobile Banking App',
                'description' => 'A secure mobile banking application with transaction history, fund transfers, bill payments, and account management.',
                'image' => 'projects/banking.jpg',
                'category' => 'Mobile App',
                'status' => 'published',
                'technologies' => ['React Native', 'Node.js', 'MongoDB', 'Express'],
                'github_url' => 'https://github.com/username/banking-app',
                'live_url' => 'https://banking-demo.com',
                'client_name' => 'Digital Banking Corp',
                'project_url' => 'https://digitalbanking.com',
                'completion_date' => Carbon::now()->subDays(120),
                'is_featured' => true,
                'order' => 4,
            ],
            [
                'title' => 'Restaurant Ordering System',
                'description' => 'An online food ordering system for restaurants with menu management, order tracking, and payment processing.',
                'image' => 'projects/restaurant.jpg',
                'category' => 'Web Application',
                'status' => 'published',
                'technologies' => ['PHP', 'MySQL', 'jQuery', 'Bootstrap'],
                'github_url' => 'https://github.com/username/restaurant',
                'live_url' => 'https://restaurant-demo.com',
                'client_name' => 'FoodTech Solutions',
                'project_url' => 'https://foodtech.com',
                'completion_date' => Carbon::now()->subDays(180),
                'is_featured' => false,
                'order' => 5,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
} 