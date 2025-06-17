<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DummyServicesResetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // First, truncate the services table to remove all existing data
        DB::statement('SET FOREIGN_KEY_CHECKS=0');
        DB::statement('TRUNCATE TABLE services');
        DB::statement('SET FOREIGN_KEY_CHECKS=1');
        
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
                ],
                'order' => 1
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
                ],
                'order' => 2
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
                ],
                'order' => 3
            ],
            [
                'title' => 'Backend Development',
                'description' => 'Developing robust API-first applications with secure endpoints and database solutions for scalable web applications.',
                'icon' => 'server',
                'price' => 2800.00,
                'is_active' => true,
                'features' => [
                    'RESTful APIs',
                    'Database Design',
                    'Cloud Integration',
                    'Security Implementation',
                    'Microservices Architecture'
                ],
                'order' => 4
            ],
            [
                'title' => 'E-commerce Solutions',
                'description' => 'Building complete online stores with payment integration, inventory management, and customer portal.',
                'icon' => 'shopping-bag',
                'price' => 4000.00,
                'is_active' => true,
                'features' => [
                    'Payment Processing',
                    'Inventory Management',
                    'Order Tracking',
                    'Customer Accounts',
                    'Product Management'
                ],
                'order' => 5
            ],
            [
                'title' => 'SEO Optimization',
                'description' => 'Improving website visibility in search engines to drive more organic traffic and increase conversions.',
                'icon' => 'search',
                'price' => 800.00,
                'is_active' => true,
                'features' => [
                    'Keyword Research',
                    'On-page SEO',
                    'Technical SEO',
                    'Link Building',
                    'Content Strategy'
                ],
                'order' => 6
            ],
            [
                'title' => 'Digital Marketing',
                'description' => 'Creating comprehensive digital marketing strategies to increase brand awareness and drive customer acquisition.',
                'icon' => 'bar-chart',
                'price' => 1200.00,
                'is_active' => true,
                'features' => [
                    'Social Media Marketing',
                    'Email Campaigns',
                    'Content Marketing',
                    'PPC Advertising',
                    'Analytics & Reporting'
                ],
                'order' => 7
            ],
            [
                'title' => 'Content Writing',
                'description' => 'Creating engaging, SEO-optimized content that resonates with your target audience and drives conversions.',
                'icon' => 'file-text',
                'price' => 600.00,
                'is_active' => true,
                'features' => [
                    'Blog Posts',
                    'Website Copy',
                    'Product Descriptions',
                    'Email Newsletters',
                    'Technical Writing'
                ],
                'order' => 8
            ],
            [
                'title' => 'DevOps Services',
                'description' => 'Implementing CI/CD pipelines and infrastructure automation for faster, more reliable software delivery.',
                'icon' => 'git-branch',
                'price' => 3000.00,
                'is_active' => true,
                'features' => [
                    'CI/CD Implementation',
                    'Infrastructure as Code',
                    'Containerization',
                    'Cloud Migration',
                    'Monitoring & Logging'
                ],
                'order' => 9
            ],
            [
                'title' => 'Cybersecurity',
                'description' => 'Protecting your digital assets with comprehensive security audits, penetration testing, and security implementations.',
                'icon' => 'shield',
                'price' => 2500.00,
                'is_active' => true,
                'features' => [
                    'Security Audits',
                    'Penetration Testing',
                    'Vulnerability Assessment',
                    'Security Monitoring',
                    'Compliance Management'
                ],
                'order' => 10
            ]
        ];

        // Insert services with proper ID sequencing
        foreach ($services as $index => $service) {
            Service::create([
                'title' => $service['title'],
                'description' => $service['description'],
                'icon' => $service['icon'],
                'price' => $service['price'],
                'features' => $service['features'],
                'is_active' => $service['is_active'],
                'order' => $service['order'],
                'created_at' => now(),
                'updated_at' => now()
            ]);
        }
    }
} 