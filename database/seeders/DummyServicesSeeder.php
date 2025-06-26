<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class DummyServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the current maximum order
        $maxOrder = Service::max('order') ?? 0;
        
        // Array of dummy services
        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Custom web applications and websites built with modern technologies and frameworks.',
                'icon' => 'code',
                'price' => 1500.00,
                'features' => [
                    'Responsive design for all devices',
                    'SEO optimization',
                    'Performance optimization',
                    'Cross-browser compatibility',
                    'Content management system',
                    'Custom functionality',
                    'API integrations'
                ],
                'is_active' => true,
                'order' => $maxOrder + 1
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'Native and cross-platform mobile applications for iOS and Android devices.',
                'icon' => 'smartphone',
                'price' => 2500.00,
                'features' => [
                    'Native iOS & Android development',
                    'Cross-platform solutions',
                    'Intuitive user interfaces',
                    'Offline functionality',
                    'Push notifications',
                    'In-app purchases',
                    'Analytics integration'
                ],
                'is_active' => true,
                'order' => $maxOrder + 2
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'User-centered design solutions that enhance user experience and drive engagement.',
                'icon' => 'palette',
                'price' => 1200.00,
                'features' => [
                    'User research & personas',
                    'Wireframing & prototyping',
                    'Visual design & branding',
                    'Usability testing',
                    'Interaction design',
                    'Design systems',
                    'Responsive design'
                ],
                'is_active' => true,
                'order' => $maxOrder + 3
            ],
            [
                'title' => 'E-commerce Solutions',
                'description' => 'Complete online store solutions with secure payment gateways and inventory management.',
                'icon' => 'shopping-bag',
                'price' => 2000.00,
                'features' => [
                    'Product catalog management',
                    'Secure payment processing',
                    'Inventory management',
                    'Customer accounts & profiles',
                    'Order tracking & history',
                    'Discount & coupon systems',
                    'Analytics & reporting'
                ],
                'is_active' => true,
                'order' => $maxOrder + 4
            ],
            [
                'title' => 'SEO & Digital Marketing',
                'description' => 'Improve your online visibility and drive targeted traffic to your website.',
                'icon' => 'search',
                'price' => 800.00,
                'features' => [
                    'Keyword research & analysis',
                    'On-page & off-page SEO',
                    'Content strategy & creation',
                    'Link building',
                    'Social media marketing',
                    'PPC campaign management',
                    'Analytics & reporting'
                ],
                'is_active' => true,
                'order' => $maxOrder + 5
            ],
            [
                'title' => 'Database Design',
                'description' => 'Efficient database architecture and optimization for improved performance.',
                'icon' => 'database',
                'price' => 1800.00,
                'features' => [
                    'Database architecture design',
                    'Performance optimization',
                    'Data migration & integration',
                    'Query optimization',
                    'Backup & recovery solutions',
                    'Security implementation',
                    'Scaling strategies'
                ],
                'is_active' => true,
                'order' => $maxOrder + 6
            ],
            [
                'title' => 'API Development',
                'description' => 'Custom API development and third-party service integrations.',
                'icon' => 'code',
                'price' => 1600.00,
                'features' => [
                    'RESTful API development',
                    'GraphQL API development',
                    'Third-party API integration',
                    'Authentication & security',
                    'Documentation',
                    'Testing & monitoring',
                    'Versioning & maintenance'
                ],
                'is_active' => true,
                'order' => $maxOrder + 7
            ],
            [
                'title' => 'Performance Optimization',
                'description' => 'Speed up your website or application for better user experience and SEO.',
                'icon' => 'zap',
                'price' => 900.00,
                'features' => [
                    'Performance auditing',
                    'Code optimization',
                    'Image & asset optimization',
                    'Caching strategies',
                    'Database query optimization',
                    'Server configuration',
                    'CDN implementation'
                ],
                'is_active' => true,
                'order' => $maxOrder + 8
            ],
            [
                'title' => 'DevOps & Deployment',
                'description' => 'Streamline your development workflow and automate deployment processes.',
                'icon' => 'activity',
                'price' => 2200.00,
                'features' => [
                    'CI/CD pipeline setup',
                    'Docker containerization',
                    'Infrastructure as code',
                    'Automated testing',
                    'Monitoring & logging',
                    'Scalability planning',
                    'Disaster recovery'
                ],
                'is_active' => true,
                'order' => $maxOrder + 9
            ],
            [
                'title' => 'Technical Consultation',
                'description' => 'Expert advice on technology choices, architecture, and implementation strategies.',
                'icon' => 'file-text',
                'price' => 150.00,
                'features' => [
                    'Technology stack recommendations',
                    'Architecture planning',
                    'Code reviews',
                    'Security assessments',
                    'Performance evaluations',
                    'Scalability planning',
                    'Team training & mentoring'
                ],
                'is_active' => true,
                'order' => $maxOrder + 10
            ],
        ];

        // Insert the services
        foreach ($services as $service) {
            Service::create($service);
        }
    }
} 