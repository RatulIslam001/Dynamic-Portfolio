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
                'description' => 'Creating modern, responsive websites that not only look great but perform exceptionally. Using cutting-edge technologies like React, Next.js, and TypeScript, I build scalable web applications that grow with your business.',
                'long_description' => 'My development process focuses on performance, accessibility, and user experience to ensure your website stands out in today\'s competitive digital landscape.',
                'icon' => 'Code',
                'order' => 1,
                'projects_count' => 45,
                'duration' => '2-6 weeks',
                'starting_price' => 2500.00,
                'features' => [
                    'Responsive Design that works on all devices',
                    'Performance Optimization for fast loading times',
                    'SEO-Friendly Code structure and implementation',
                    'Modern Frameworks like React and Next.js',
                    'Cross-Browser Compatibility testing',
                    'Progressive Web Apps (PWA) development'
                ],
                'technologies' => [
                    'React',
                    'Next.js',
                    'TypeScript',
                    'Tailwind CSS',
                    'Node.js',
                    'MongoDB'
                ]
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'Designing intuitive and beautiful user interfaces that provide exceptional user experiences.',
                'long_description' => 'Creating user-centered designs that not only look beautiful but also provide intuitive navigation and exceptional user experiences. Every design decision is backed by research and best practices.',
                'icon' => 'Palette',
                'order' => 2,
                'projects_count' => 30,
                'duration' => '1-4 weeks',
                'starting_price' => 1800.00,
                'features' => [
                    'User Research and Analysis',
                    'Wireframing and Prototyping',
                    'Interactive Design',
                    'User Testing',
                    'Design System Creation',
                    'Responsive Design'
                ],
                'technologies' => [
                    'Figma',
                    'Adobe XD',
                    'Sketch',
                    'InVision',
                    'Principle',
                    'Zeplin'
                ]
            ],
            [
                'title' => 'Mobile Development',
                'description' => 'Building cross-platform mobile applications that work seamlessly on iOS and Android devices.',
                'long_description' => 'Developing native and cross-platform mobile applications that provide seamless experiences across iOS and Android platforms. Focus on performance, offline capabilities, and user engagement.',
                'icon' => 'Smartphone',
                'order' => 3,
                'projects_count' => 25,
                'duration' => '4-12 weeks',
                'starting_price' => 5000.00,
                'features' => [
                    'Native iOS and Android Development',
                    'Cross-platform Solutions',
                    'Push Notifications',
                    'Offline Support',
                    'App Store Optimization',
                    'Performance Monitoring'
                ],
                'technologies' => [
                    'React Native',
                    'Flutter',
                    'Swift',
                    'Kotlin',
                    'Firebase',
                    'App Center'
                ]
            ],
            [
                'title' => 'SEO Optimization',
                'description' => 'Improving your website\'s visibility in search engines to drive more organic traffic.',
                'long_description' => 'Implementing proven SEO strategies to improve your website\'s visibility in search engines and drive more organic traffic to your business.',
                'icon' => 'Search',
                'order' => 4,
                'projects_count' => 20,
                'duration' => '1-3 months',
                'starting_price' => 1500.00,
                'features' => [
                    'Keyword Research and Analysis',
                    'On-page SEO Optimization',
                    'Technical SEO Audit',
                    'Content Strategy',
                    'Link Building',
                    'Performance Optimization'
                ],
                'technologies' => [
                    'Google Analytics',
                    'SEMrush',
                    'Ahrefs',
                    'Google Search Console',
                    'Screaming Frog',
                    'Moz Pro'
                ]
            ],
            [
                'title' => 'Digital Marketing',
                'description' => 'Creating and implementing effective digital marketing strategies to grow your business.',
                'long_description' => 'Developing comprehensive digital marketing strategies that help businesses reach their target audience and achieve their growth objectives.',
                'icon' => 'BarChart',
                'order' => 5,
                'projects_count' => 15,
                'duration' => '3-6 months',
                'starting_price' => 2000.00,
                'features' => [
                    'Social Media Marketing',
                    'Email Marketing',
                    'Content Marketing',
                    'PPC Advertising',
                    'Analytics and Reporting',
                    'Marketing Automation'
                ],
                'technologies' => [
                    'Google Ads',
                    'Facebook Ads',
                    'Mailchimp',
                    'HubSpot',
                    'Buffer',
                    'Google Analytics'
                ]
            ],
            [
                'title' => 'Content Writing',
                'description' => 'Crafting engaging and SEO-friendly content that resonates with your target audience.',
                'long_description' => 'Creating compelling, SEO-optimized content that engages your audience and helps achieve your business objectives.',
                'icon' => 'FileText',
                'order' => 6,
                'projects_count' => 35,
                'duration' => '1-2 weeks',
                'starting_price' => 500.00,
                'features' => [
                    'Blog Writing',
                    'Website Copy',
                    'Technical Writing',
                    'SEO Optimization',
                    'Content Strategy',
                    'Editorial Calendar'
                ],
                'technologies' => [
                    'Grammarly',
                    'Hemingway Editor',
                    'Yoast SEO',
                    'CoSchedule',
                    'Clearscope',
                    'WordPress'
                ]
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
} 