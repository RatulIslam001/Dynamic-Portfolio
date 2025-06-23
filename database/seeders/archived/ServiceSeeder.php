<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing services
        Service::truncate();

        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Creating responsive and modern web applications using cutting-edge technologies like React, Vue.js, and Node.js.',
                'icon' => 'code',
                'price' => 2500.00,
                'is_active' => true,
                'features' => [
                    'Responsive Design',
                    'Modern Frameworks',
                    'Performance Optimization',
                    'Cross-browser Compatibility',
                    'Database Integration'
                ]
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'Designing intuitive and beautiful user interfaces that provide exceptional user experiences across all platforms.',
                'icon' => 'layout',
                'price' => 1800.00,
                'is_active' => true,
                'features' => [
                    'User Research',
                    'Wireframing',
                    'Prototyping',
                    'Design Systems',
                    'User Testing'
                ]
            ],
            [
                'title' => 'Mobile Development',
                'description' => 'Building cross-platform mobile applications for iOS and Android using React Native and Flutter.',
                'icon' => 'smartphone',
                'price' => 3500.00,
                'is_active' => true,
                'features' => [
                    'Cross-platform',
                    'Native Performance',
                    'App Store Deployment',
                    'Push Notifications',
                    'Offline Functionality'
                ]
            ],
            [
                'title' => 'Backend Development',
                'description' => 'Developing robust API-first applications with APIs and database solutions for scalable web applications.',
                'icon' => 'database',
                'price' => 2000.00,
                'is_active' => true,
                'features' => [
                    'RESTful APIs',
                    'Database Design',
                    'Cloud Integration',
                    'Security Implementation',
                    'Data Migration'
                ]
            ],
            [
                'title' => 'E-commerce Solutions',
                'description' => 'Building complete online stores with payment integration, inventory management, and customer portal.',
                'icon' => 'shopping-bag',
                'price' => 4000.00,
                'is_active' => true,
                'features' => [
                    'Payment Integration',
                    'Inventory Management',
                    'Order Processing',
                    'Customer Portal',
                    'Product Management'
                ]
            ],
            [
                'title' => 'SEO Optimization',
                'description' => 'Optimizing websites for better search engine visibility and improved organic traffic growth.',
                'icon' => 'search',
                'price' => 800.00,
                'is_active' => true,
                'features' => [
                    'Keyword Research',
                    'On-page SEO',
                    'Technical SEO',
                    'Performance Monitoring',
                    'Content Strategy'
                ]
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
} 