<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'E-commerce Website Redesign',
                'description' => 'Complete redesign of an e-commerce platform focusing on user experience and conversion optimization.',
                'category' => 'Web Design',
                'status' => 'published',
                'is_featured' => true,
                'client_name' => 'Fashion Boutique Inc.',
                'project_url' => 'https://example.com/fashion-boutique',
                'completion_date' => '2023-10-15',
                'technologies' => ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
            ],
            [
                'title' => 'Mobile Banking App',
                'description' => 'Developed a secure and user-friendly mobile banking application with real-time transaction tracking.',
                'category' => 'Mobile App',
                'status' => 'published',
                'is_featured' => true,
                'client_name' => 'Digital Bank Ltd.',
                'project_url' => 'https://example.com/digital-bank',
                'completion_date' => '2023-09-22',
                'technologies' => ['Flutter', 'Firebase', 'Node.js', 'PostgreSQL'],
            ],
            [
                'title' => 'Healthcare Dashboard',
                'description' => 'Built an intuitive healthcare analytics dashboard for monitoring patient data and hospital performance.',
                'category' => 'Web App',
                'status' => 'published',
                'is_featured' => false,
                'client_name' => 'City Hospital',
                'project_url' => 'https://example.com/city-hospital',
                'completion_date' => '2023-08-10',
                'technologies' => ['Vue.js', 'Laravel', 'MySQL', 'D3.js'],
            ],
            [
                'title' => 'Restaurant Branding',
                'description' => 'Created a complete brand identity including logo, website, and marketing materials.',
                'category' => 'Branding',
                'status' => 'published',
                'is_featured' => false,
                'client_name' => 'Taste of Italy',
                'project_url' => 'https://example.com/taste-of-italy',
                'completion_date' => '2023-07-05',
                'technologies' => ['Adobe Creative Suite', 'WordPress', 'HTML/CSS'],
            ],
            [
                'title' => 'Fitness Tracker App',
                'description' => 'Developing a comprehensive fitness tracking application with workout plans and progress monitoring.',
                'category' => 'Mobile App',
                'status' => 'draft',
                'is_featured' => false,
                'client_name' => 'FitLife Pro',
                'project_url' => 'https://example.com/fitlife-pro',
                'completion_date' => '2023-11-01',
                'technologies' => ['React Native', 'Express.js', 'MongoDB', 'Redux'],
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
} 