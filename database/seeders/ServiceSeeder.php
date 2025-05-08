<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Full-stack web development using modern technologies like Laravel, React, and Vue.js',
                'icon' => 'code',
                'order' => 1,
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'Native and cross-platform mobile app development for iOS and Android',
                'icon' => 'smartphone',
                'order' => 2,
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'Creating beautiful and intuitive user interfaces with great user experience',
                'icon' => 'layout',
                'order' => 3,
            ],
            [
                'title' => 'API Development',
                'description' => 'Building robust and scalable RESTful APIs for web and mobile applications',
                'icon' => 'database',
                'order' => 4,
            ],
            [
                'title' => 'Cloud Solutions',
                'description' => 'Deploying and managing applications on cloud platforms like AWS, Google Cloud, and Azure.',
                'icon' => 'cloud',
                'order' => 5,
            ],
            [
                'title' => 'Technical Consulting',
                'description' => 'Providing expert advice on technology stack, architecture, and best practices.',
                'icon' => 'users',
                'order' => 6,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
} 