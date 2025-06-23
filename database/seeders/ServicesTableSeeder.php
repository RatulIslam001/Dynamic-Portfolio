<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing services
        Service::truncate();

        // Sample services data
        $services = [
            [
                'title' => 'Web Development',
                'description' => 'Creating responsive and modern web applications using cutting-edge technologies like React, Vue.js, and Node.js.',
                'long_description' => 'I specialize in building custom web applications that are fast, secure, and scalable. Using the latest technologies and best practices, I create solutions that meet your business needs and provide an exceptional user experience.',
                'icon' => 'Code',
                'price' => 2500,
                'duration' => '4-6 weeks',
                'projects_count' => 45,
                'features' => [
                    'Responsive Design',
                    'Modern Frameworks',
                    'Performance Optimization',
                    'Cross-browser Compatibility',
                    'Database Integration'
                ],
                'technologies' => [
                    'React', 'Vue.js', 'Node.js', 'Laravel', 'MongoDB', 'MySQL'
                ],
                'is_active' => true,
                'is_featured' => true,
                'order' => 1
            ],
            [
                'title' => 'UI/UX Design',
                'description' => 'Designing intuitive and beautiful user interfaces that provide exceptional user experiences across all platforms.',
                'long_description' => 'I create user-centered designs that are not only visually appealing but also functional and intuitive. My design process focuses on understanding user needs and business goals to deliver interfaces that drive engagement and conversion.',
                'icon' => 'Palette',
                'price' => 1800,
                'duration' => '2-3 weeks',
                'projects_count' => 32,
                'features' => [
                    'User Research',
                    'Wireframing',
                    'Prototyping',
                    'Design Systems',
                    'User Testing'
                ],
                'technologies' => [
                    'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 2
            ],
            [
                'title' => 'Mobile Development',
                'description' => 'Building cross-platform mobile applications for iOS and Android using React Native and Flutter.',
                'long_description' => 'I develop high-performance mobile applications that work seamlessly across iOS and Android platforms. Using cross-platform technologies, I deliver cost-effective solutions without compromising on quality or user experience.',
                'icon' => 'Smartphone',
                'price' => 3000,
                'duration' => '6-8 weeks',
                'projects_count' => 28,
                'features' => [
                    'Cross-platform',
                    'Native Performance',
                    'App Store Deployment',
                    'Offline Functionality',
                    'Push Notifications'
                ],
                'technologies' => [
                    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 3
            ],
            [
                'title' => 'Backend Development',
                'description' => 'Developing robust API-first applications with secure endpoints and database solutions for scalable web applications.',
                'long_description' => 'I build secure, scalable, and performant backend systems that power your web and mobile applications. My solutions include RESTful APIs, database design, authentication systems, and cloud infrastructure setup.',
                'icon' => 'Database',
                'price' => 2800,
                'duration' => '4-8 weeks',
                'projects_count' => 37,
                'features' => [
                    'RESTful APIs',
                    'Database Design',
                    'Cloud Integration',
                    'Security Implementation',
                    'Microservice Architecture'
                ],
                'technologies' => [
                    'Node.js', 'Laravel', 'Express', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 4
            ],
            [
                'title' => 'E-commerce Solutions',
                'description' => 'Building complete online stores with payment integration, inventory management, and customer portal.',
                'long_description' => 'I create comprehensive e-commerce solutions that help businesses sell online effectively. From product catalogs to payment processing and order management, I build systems that drive sales and improve customer experience.',
                'icon' => 'ShoppingBag',
                'price' => 4000,
                'duration' => '8-12 weeks',
                'projects_count' => 22,
                'features' => [
                    'Payment Processing',
                    'Inventory Management',
                    'Order Tracking',
                    'Customer Accounts',
                    'Product Management'
                ],
                'technologies' => [
                    'Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal', 'React', 'Node.js'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 5
            ],
            [
                'title' => 'SEO Optimization',
                'description' => 'Improving website visibility in search engines to drive more organic traffic and increase conversions.',
                'long_description' => 'I help businesses improve their online visibility through comprehensive SEO strategies. By optimizing website structure, content, and technical aspects, I help you rank higher in search results and attract more qualified traffic.',
                'icon' => 'Search',
                'price' => 1500,
                'duration' => '1-2 months',
                'projects_count' => 19,
                'features' => [
                    'Keyword Research',
                    'On-page SEO',
                    'Technical SEO',
                    'Link Building',
                    'Content Strategy'
                ],
                'technologies' => [
                    'Google Analytics', 'SEMrush', 'Ahrefs', 'Moz', 'Google Search Console'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 6
            ],
        ];

        // Insert services
        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
