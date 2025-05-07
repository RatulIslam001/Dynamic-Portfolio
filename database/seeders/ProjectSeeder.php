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
                'description' => 'A full-featured e-commerce platform built with Laravel and React. Includes features like product management, cart, checkout, and admin dashboard.',
                'category' => 'Web Development',
                'technologies' => json_encode(['Laravel', 'React', 'MySQL', 'Stripe']),
                'image' => null,
                'github_url' => 'https://github.com/johndoe/ecommerce',
                'live_url' => 'https://ecommerce-demo.com',
                'order' => 1,
                'is_featured' => true,
            ],
            [
                'title' => 'Task Management App',
                'description' => 'A collaborative task management application with real-time updates, file sharing, and team management features.',
                'category' => 'Web Application',
                'technologies' => json_encode(['Vue.js', 'Node.js', 'MongoDB', 'Socket.io']),
                'image' => null,
                'github_url' => 'https://github.com/johndoe/taskmanager',
                'live_url' => 'https://taskmanager-demo.com',
                'order' => 2,
                'is_featured' => true,
            ],
            [
                'title' => 'Fitness Tracking Mobile App',
                'description' => 'A cross-platform mobile application for tracking workouts, nutrition, and fitness goals.',
                'category' => 'Mobile Development',
                'technologies' => json_encode(['React Native', 'Firebase', 'Redux']),
                'image' => null,
                'github_url' => 'https://github.com/johndoe/fitnessapp',
                'live_url' => 'https://fitnessapp-demo.com',
                'order' => 3,
                'is_featured' => true,
            ],
            [
                'title' => 'AI-Powered Chat Bot',
                'description' => 'An intelligent chatbot built with natural language processing capabilities for customer support.',
                'category' => 'AI/ML',
                'technologies' => json_encode(['Python', 'TensorFlow', 'FastAPI', 'Docker']),
                'image' => null,
                'github_url' => 'https://github.com/johndoe/chatbot',
                'live_url' => 'https://chatbot-demo.com',
                'order' => 4,
                'is_featured' => false,
            ],
        ];

        foreach ($projects as $project) {
            Project::create($project);
        }
    }
} 