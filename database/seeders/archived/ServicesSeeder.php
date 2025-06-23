<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing services
        Service::truncate();

        // Create services
        Service::create([
            'title' => 'Web Development',
            'description' => 'Creating responsive, fast, and user-friendly websites using modern technologies and best practices.',
            'long_description' => 'Our web development services focus on creating high-performance, responsive websites that deliver exceptional user experiences. We utilize the latest technologies and frameworks to build scalable, secure, and maintainable web applications tailored to your specific business needs.',
            'icon' => 'code',
            'order' => 1,
            'is_active' => true,
            'projects_count' => 25,
            'duration' => '2-6 weeks',
            'starting_price' => 2500,
            'features' => ['Responsive Design', 'SEO Optimization', 'Content Management System', 'Performance Optimization', 'Security Features'],
            'technologies' => ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'PHP', 'Laravel', 'WordPress']
        ]);

        Service::create([
            'title' => 'UI/UX Design',
            'description' => 'Designing intuitive and beautiful user interfaces that provide exceptional user experiences.',
            'long_description' => 'Our UI/UX design services focus on creating visually appealing and intuitive interfaces that enhance user engagement and satisfaction. We follow a user-centered design approach, conducting thorough research and testing to ensure that your digital products not only look great but also function seamlessly.',
            'icon' => 'layout',
            'order' => 2,
            'is_active' => true,
            'projects_count' => 18,
            'duration' => '1-4 weeks',
            'starting_price' => 1800,
            'features' => ['User Research', 'Wireframing', 'Prototyping', 'User Testing', 'Visual Design', 'Interaction Design'],
            'technologies' => ['Figma', 'Adobe XD', 'Sketch', 'InVision', 'Zeplin']
        ]);

        Service::create([
            'title' => 'Mobile Development',
            'description' => 'Building cross-platform mobile applications that work seamlessly on iOS and Android devices.',
            'long_description' => 'Our mobile development services deliver high-quality native and cross-platform applications that engage users and drive business growth. We specialize in creating mobile solutions that offer seamless performance across different devices and operating systems, ensuring a consistent user experience regardless of platform.',
            'icon' => 'smartphone',
            'order' => 3,
            'is_active' => true,
            'projects_count' => 15,
            'duration' => '4-12 weeks',
            'starting_price' => 4000,
            'features' => ['Native App Development', 'Cross-Platform Development', 'App Store Optimization', 'Push Notifications', 'Offline Functionality'],
            'technologies' => ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
        ]);

        Service::create([
            'title' => 'SEO Optimization',
            'description' => 'Improving your website\'s visibility in search engines to drive more organic traffic.',
            'long_description' => 'Our SEO optimization services are designed to improve your website\'s visibility in search engine results, driving more organic traffic and improving conversion rates. We employ proven strategies tailored to your business goals, focusing on both on-page and off-page optimization techniques.',
            'icon' => 'globe',
            'order' => 4,
            'is_active' => true,
            'projects_count' => 30,
            'duration' => 'Ongoing',
            'starting_price' => 800,
            'features' => ['Keyword Research', 'On-Page Optimization', 'Technical SEO', 'Content Strategy', 'Link Building', 'Local SEO'],
            'technologies' => ['Google Analytics', 'Google Search Console', 'SEMrush', 'Ahrefs', 'Moz']
        ]);

        Service::create([
            'title' => 'Digital Marketing',
            'description' => 'Creating and implementing effective digital marketing strategies to grow your business.',
            'long_description' => 'Our digital marketing services help businesses reach their target audience, build brand awareness, and drive conversions through multiple online channels. We develop comprehensive strategies that align with your business objectives, leveraging data-driven insights to maximize your marketing ROI.',
            'icon' => 'bar-chart',
            'order' => 5,
            'is_active' => true,
            'projects_count' => 22,
            'duration' => 'Ongoing',
            'starting_price' => 1200,
            'features' => ['Social Media Marketing', 'Email Marketing', 'Content Marketing', 'PPC Advertising', 'Conversion Rate Optimization'],
            'technologies' => ['Facebook Ads', 'Google Ads', 'Mailchimp', 'HubSpot', 'Hootsuite']
        ]);

        Service::create([
            'title' => 'Content Creation',
            'description' => 'Producing high-quality content that engages your audience and drives conversions.',
            'long_description' => 'Our content creation services focus on developing compelling, relevant content that resonates with your target audience and supports your business goals. From blog posts and articles to videos and infographics, we create content that educates, entertains, and inspires action.',
            'icon' => 'file-text',
            'order' => 6,
            'is_active' => true,
            'projects_count' => 40,
            'duration' => '1-2 weeks',
            'starting_price' => 800,
            'features' => ['Blog Posts', 'Case Studies', 'Whitepapers', 'Video Content', 'Infographics', 'Social Media Content'],
            'technologies' => ['WordPress', 'Grammarly', 'Canva', 'Adobe Creative Suite', 'Loom']
        ]);

        Service::create([
            'title' => 'E-commerce Development',
            'description' => 'Building powerful online stores that drive sales and provide seamless shopping experiences.',
            'long_description' => 'Our e-commerce development services create robust online stores that drive sales and deliver exceptional shopping experiences. We build scalable, secure, and user-friendly e-commerce solutions that integrate smoothly with payment gateways, shipping services, and inventory management systems.',
            'icon' => 'shopping-bag',
            'order' => 7,
            'is_active' => true,
            'projects_count' => 12,
            'duration' => '3-8 weeks',
            'starting_price' => 3500,
            'features' => ['Product Catalog Management', 'Secure Payment Processing', 'Inventory Management', 'Order Tracking', 'Customer Accounts'],
            'technologies' => ['Shopify', 'WooCommerce', 'Magento', 'Stripe', 'PayPal']
        ]);

        Service::create([
            'title' => 'Performance Optimization',
            'description' => 'Optimizing websites and applications for maximum speed and performance.',
            'long_description' => 'Our performance optimization services improve the speed and efficiency of your websites and applications, enhancing user experience and boosting conversion rates. We identify and resolve performance bottlenecks, implement caching strategies, and optimize code and assets to ensure your digital products deliver the best possible performance.',
            'icon' => 'bar-chart-2',
            'order' => 8,
            'is_active' => true,
            'projects_count' => 20,
            'duration' => '1-3 weeks',
            'starting_price' => 1000,
            'features' => ['Website Speed Optimization', 'Database Optimization', 'Code Refactoring', 'Caching Implementation', 'Asset Optimization'],
            'technologies' => ['Google PageSpeed Insights', 'WebPageTest', 'Lighthouse', 'Redis', 'Cloudflare']
        ]);

        Service::create([
            'title' => 'Security Consulting',
            'description' => 'Protecting your digital assets with comprehensive security audits and implementations.',
            'long_description' => 'Our security consulting services help businesses identify and address vulnerabilities in their digital infrastructure, protecting sensitive data and ensuring compliance with industry regulations. We conduct thorough security assessments, implement robust security measures, and provide ongoing monitoring to safeguard your digital assets.',
            'icon' => 'shield',
            'order' => 9,
            'is_active' => true,
            'projects_count' => 15,
            'duration' => '1-4 weeks',
            'starting_price' => 1500,
            'features' => ['Security Audits', 'Vulnerability Assessments', 'Penetration Testing', 'Security Implementation', 'Compliance Consulting'],
            'technologies' => ['OWASP Tools', 'Nessus', 'Metasploit', 'Wireshark', 'OpenVAS']
        ]);
    }
}
