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
            // Adding 4 more services
            [
                'title' => 'DevOps & Deployment',
                'description' => 'Setting up CI/CD pipelines, containerization, and cloud infrastructure for seamless deployment and scaling.',
                'long_description' => 'I help teams implement efficient DevOps practices to streamline development workflows and deployment processes. From continuous integration to containerization and cloud infrastructure, I set up systems that improve productivity and reliability.',
                'icon' => 'Activity',
                'price' => 3200,
                'duration' => '3-5 weeks',
                'projects_count' => 24,
                'features' => [
                    'CI/CD Pipeline Setup',
                    'Docker Containerization',
                    'Kubernetes Orchestration',
                    'Cloud Infrastructure',
                    'Monitoring & Logging'
                ],
                'technologies' => [
                    'Docker', 'Kubernetes', 'Jenkins', 'GitHub Actions', 'AWS', 'GCP', 'Azure'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 7
            ],
            [
                'title' => 'Performance Optimization',
                'description' => 'Improving website and application speed for better user experience, SEO, and conversion rates.',
                'long_description' => 'I optimize web applications to deliver exceptional performance across all devices and network conditions. By identifying and resolving bottlenecks, implementing caching strategies, and optimizing code, I help your applications load faster and run smoother.',
                'icon' => 'Zap',
                'price' => 1800,
                'duration' => '2-4 weeks',
                'projects_count' => 31,
                'features' => [
                    'Performance Auditing',
                    'Code Optimization',
                    'Image & Asset Optimization',
                    'Caching Strategies',
                    'CDN Implementation'
                ],
                'technologies' => [
                    'Lighthouse', 'WebPageTest', 'GTmetrix', 'Redis', 'Cloudflare'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 8
            ],
            [
                'title' => 'API Development',
                'description' => 'Building robust and secure APIs for seamless data exchange between applications and services.',
                'long_description' => 'I specialize in creating well-designed, efficient, and secure APIs that enable seamless communication between different systems. Whether you need RESTful APIs, GraphQL, or microservices, I deliver solutions that are reliable and easy to integrate with.',
                'icon' => 'Code',
                'price' => 2400,
                'duration' => '3-6 weeks',
                'projects_count' => 27,
                'features' => [
                    'RESTful API Design',
                    'GraphQL Implementation',
                    'Authentication & Authorization',
                    'Documentation',
                    'Testing & Monitoring'
                ],
                'technologies' => [
                    'Node.js', 'Express', 'Django', 'Laravel', 'Swagger', 'Postman'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 9
            ],
            [
                'title' => 'Technical Consultation',
                'description' => 'Expert advice on technology choices, architecture decisions, and implementation strategies.',
                'long_description' => 'I provide expert guidance on technical decisions to help you make informed choices for your projects. From technology selection to architecture planning and implementation strategies, I offer insights based on industry best practices and years of experience.',
                'icon' => 'FileText',
                'price' => 200,
                'duration' => 'Hourly',
                'projects_count' => 40,
                'features' => [
                    'Technology Stack Assessment',
                    'Architecture Planning',
                    'Code Reviews',
                    'Performance Evaluation',
                    'Security Assessment'
                ],
                'technologies' => [
                    'All major web and mobile technologies'
                ],
                'is_active' => true,
                'is_featured' => false,
                'order' => 10
            ],
        ];

        // Insert services
        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
