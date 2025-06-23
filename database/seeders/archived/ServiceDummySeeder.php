<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceDummySeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Custom web application development using modern frameworks and technologies.',
                'long_description' => 'I create responsive, high-performance web applications tailored to your specific business needs. From simple landing pages to complex enterprise systems, I deliver solutions that drive results.',
                'icon' => 'Code',
                'price' => 1500.00,
                'starting_price' => 1500.00,
                'duration' => '4-8 weeks',
                'projects_count' => 25,
                'features' => [
                    'Responsive design',
                    'SEO optimization',
                    'Performance tuning',
                    'API integration',
                    'Database design',
                    'User authentication'
                ],
                'technologies' => [
                    'Laravel',
                    'React',
                    'Vue.js',
                    'Node.js',
                    'MySQL',
                    'MongoDB'
                ],
                'image_url' => null,
                'is_active' => true,
                'is_featured' => true,
                'order' => 1
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'User-centered design solutions that enhance user experience and engagement.',
                'long_description' => 'I create intuitive and visually appealing interfaces that prioritize user experience. My design process includes user research, wireframing, prototyping, and usability testing to ensure your product meets user needs.',
                'icon' => 'Palette',
                'price' => 1200.00,
                'starting_price' => 1200.00,
                'duration' => '2-4 weeks',
                'projects_count' => 18,
                'features' => [
                    'User research',
                    'Wireframing',
                    'Prototyping',
                    'Usability testing',
                    'Design systems',
                    'Interaction design'
                ],
                'technologies' => [
                    'Figma',
                    'Adobe XD',
                    'Sketch',
                    'InVision',
                    'Adobe Photoshop',
                    'Adobe Illustrator'
                ],
                'image_url' => null,
                'is_active' => true,
                'is_featured' => false,
                'order' => 2
            ],
            [
                'title' => 'Mobile App Development',
                'description' => 'Native and cross-platform mobile applications for iOS and Android.',
                'long_description' => 'I develop high-quality mobile applications that work seamlessly across platforms. Whether you need a native iOS/Android app or a cross-platform solution, I deliver mobile experiences that users love.',
                'icon' => 'Smartphone',
                'price' => 2000.00,
                'starting_price' => 2000.00,
                'duration' => '6-12 weeks',
                'projects_count' => 15,
                'features' => [
                    'Cross-platform development',
                    'Native iOS/Android',
                    'Push notifications',
                    'Offline functionality',
                    'App store optimization',
                    'Analytics integration'
                ],
                'technologies' => [
                    'React Native',
                    'Flutter',
                    'Swift',
                    'Kotlin',
                    'Firebase',
                    'App Store Connect'
                ],
                'image_url' => null,
                'is_active' => true,
                'is_featured' => true,
                'order' => 3
            ],
            [
                'title' => 'SEO Optimization',
                'description' => 'Improve your website\'s visibility and ranking in search engine results.',
                'long_description' => 'I help businesses improve their online visibility through comprehensive SEO strategies. My approach includes technical SEO, content optimization, link building, and performance monitoring to drive organic traffic.',
                'icon' => 'Search',
                'price' => 800.00,
                'starting_price' => 800.00,
                'duration' => '1-3 months',
                'projects_count' => 12,
                'features' => [
                    'Keyword research',
                    'On-page optimization',
                    'Technical SEO',
                    'Link building',
                    'Content strategy',
                    'Performance tracking'
                ],
                'technologies' => [
                    'Google Analytics',
                    'Google Search Console',
                    'SEMrush',
                    'Ahrefs',
                    'Moz',
                    'Screaming Frog'
                ],
                'image_url' => null,
                'is_active' => true,
                'is_featured' => false,
                'order' => 4
            ],
            [
                'title' => 'Digital Marketing',
                'description' => 'Comprehensive digital marketing strategies to grow your online presence.',
                'long_description' => 'I create and execute data-driven digital marketing campaigns that deliver measurable results. From social media marketing to email campaigns and PPC advertising, I help businesses reach their target audience effectively.',
                'icon' => 'BarChart',
                'price' => 1000.00,
                'starting_price' => 1000.00,
                'duration' => '3-6 months',
                'projects_count' => 10,
                'features' => [
                    'Social media marketing',
                    'Email campaigns',
                    'PPC advertising',
                    'Content marketing',
                    'Analytics & reporting',
                    'Conversion optimization'
                ],
                'technologies' => [
                    'Google Ads',
                    'Facebook Ads',
                    'Mailchimp',
                    'HubSpot',
                    'Google Analytics',
                    'Hootsuite'
                ],
                'image_url' => null,
                'is_active' => true,
                'is_featured' => false,
                'order' => 5
            ]
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
} 