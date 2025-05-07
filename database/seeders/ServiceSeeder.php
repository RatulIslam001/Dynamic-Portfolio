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
                'description' => 'Building modern, responsive web applications using the latest technologies and best practices.',
                'icon' => 'code',
                'order' => 1,
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'Creating native and cross-platform mobile applications for iOS and Android.',
                'icon' => 'smartphone',
                'order' => 2,
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'Designing beautiful and intuitive user interfaces that provide exceptional user experiences.',
                'icon' => 'layout',
                'order' => 3,
            ],
            [
                'title' => 'API Development',
                'description' => 'Building robust and scalable APIs that power modern web and mobile applications.',
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