<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Project;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        $projects = [
            [
                'title' => 'E-commerce Platform',
                'description' => 'A full-featured e-commerce platform built with Laravel and React',
                'image' => 'projects/ecommerce.jpg',
                'category' => 'Web Development',
                'technologies' => ['Laravel', 'React', 'MySQL', 'Tailwind CSS'],
                'github_url' => 'https://github.com/username/ecommerce',
                'live_url' => 'https://ecommerce-demo.com',
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'title' => 'Task Management App',
                'description' => 'A collaborative task management application with real-time updates',
                'image' => 'projects/task-manager.jpg',
                'category' => 'Web Application',
                'technologies' => ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
                'github_url' => 'https://github.com/username/task-manager',
                'live_url' => 'https://task-manager-demo.com',
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'title' => 'Fitness Tracking Mobile App',
                'description' => 'A cross-platform mobile app for tracking workouts and nutrition',
                'image' => 'projects/fitness-app.jpg',
                'category' => 'Mobile Development',
                'technologies' => ['React Native', 'Firebase', 'Redux'],
                'github_url' => 'https://github.com/username/fitness-app',
                'live_url' => 'https://fitness-app-demo.com',
                'is_featured' => true,
                'order' => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
} 