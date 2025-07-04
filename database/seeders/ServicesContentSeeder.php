<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profile;

class ServicesContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the first profile or create one if none exists
        $profile = Profile::first();
        
        if (!$profile) {
            $profile = Profile::create([
                'full_name' => 'John Doe',
                'title' => 'Full Stack Developer',
                'about' => 'Passionate developer with expertise in modern web technologies.',
            ]);
        }

        // Default work process steps
        $workProcessSteps = [
            [
                'number' => '01',
                'title' => 'Discovery',
                'description' => 'Understanding your requirements, goals, and target audience to create an optimal solution.'
            ],
            [
                'number' => '02',
                'title' => 'Planning',
                'description' => 'Creating detailed project plans, wireframes, and technical specifications.'
            ],
            [
                'number' => '03',
                'title' => 'Development',
                'description' => 'Building your solution using best practices and cutting-edge technologies.'
            ],
            [
                'number' => '04',
                'title' => 'Testing',
                'description' => 'Rigorous testing across all devices and browsers to ensure quality and performance.'
            ],
            [
                'number' => '05',
                'title' => 'Launch',
                'description' => 'Deploying your project and providing ongoing support and maintenance.'
            ]
        ];

        // Update the profile with services content
        $profile->update([
            // Home page services section content
            'services_section_badge' => 'Professional Services',
            'services_section_title' => 'Areas of Expertise',
            'services_section_description' => 'Delivering tailored, high-quality solutions to help your business thrive in the digital landscape',
            'services_button_text' => 'Explore All Services',
            
            // Services page content
            'services_page_title' => 'Professional Services',
            'services_page_description' => 'Comprehensive digital solutions tailored to your business needs. From concept to deployment, I provide end-to-end services that drive results and exceed expectations.',
            
            // Services page benefits
            'services_benefit_1_text' => 'Fast Delivery',
            'services_benefit_1_icon' => 'Zap',
            'services_benefit_2_text' => 'Quality Guaranteed',
            'services_benefit_2_icon' => 'CheckCircle',
            'services_benefit_3_text' => '24/7 Support',
            'services_benefit_3_icon' => 'Clock',
            
            // Work process section
            'work_process_title' => 'My Work Process',
            'work_process_description' => 'A systematic approach that ensures quality results and client satisfaction.',
            'work_process_steps' => $workProcessSteps,
            
            // CTA section
            'services_cta_title' => 'Ready to Start Your Project?',
            'services_cta_description' => 'Let us discuss your requirements and create something amazing together.',
            'services_cta_primary_text' => 'Get Free Consultation',
            'services_cta_secondary_text' => 'View Portfolio',
        ]);

        $this->command->info('Services content seeded successfully!');
    }
}
