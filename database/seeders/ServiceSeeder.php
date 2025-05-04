<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'order' => 1,
                'title' => 'Web Development',
                'description' => 'Creating responsive, fast, and user-friendly websites using modern technologies and best practices.',
                'icon' => 'Code',
                'is_active' => true,
            ],
            [
                'order' => 2,
                'title' => 'UI/UX Design',
                'description' => 'Designing intuitive and beautiful user interfaces that provide exceptional user experiences.',
                'icon' => 'Palette',
                'is_active' => true,
            ],
            [
                'order' => 3,
                'title' => 'Mobile Development',
                'description' => 'Building cross-platform mobile applications that work seamlessly on iOS and Android devices.',
                'icon' => 'Smartphone',
                'is_active' => true,
            ],
            [
                'order' => 4,
                'title' => 'SEO Optimization',
                'description' => "Improving your website's visibility in search engines to drive more organic traffic.",
                'icon' => 'Search',
                'is_active' => true,
            ],
            [
                'order' => 5,
                'title' => 'Digital Marketing',
                'description' => 'Creating and implementing effective digital marketing strategies to grow your business.',
                'icon' => 'BarChart',
                'is_active' => true,
            ],
            [
                'order' => 6,
                'title' => 'Content Creation',
                'description' => 'Producing high-quality content that engages your audience and drives conversions.',
                'icon' => 'FileText',
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
} 