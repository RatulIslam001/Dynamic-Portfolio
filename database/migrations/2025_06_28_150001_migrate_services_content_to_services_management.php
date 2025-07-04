<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, ensure the services_management table exists
        if (!Schema::hasTable('services_management')) {
            Schema::create('services_management', function (Blueprint $table) {
                $table->id();
                
                // Home page services section content
                $table->string('services_section_badge')->default('Professional Services');
                $table->string('services_section_title')->default('Areas of Expertise');
                $table->text('services_section_description')->default('Delivering tailored, high-quality solutions to help your business thrive in the digital landscape');
                $table->string('services_button_text')->default('Explore All Services');
                
                // Services page header content
                $table->string('services_page_title')->default('Professional Services');
                $table->text('services_page_description')->default('Comprehensive digital solutions tailored to your business needs.');
                
                // Services page benefits
                $table->string('services_benefit_1_text')->default('Fast Delivery');
                $table->string('services_benefit_1_icon')->default('Zap');
                $table->string('services_benefit_2_text')->default('Quality Guaranteed');
                $table->string('services_benefit_2_icon')->default('CheckCircle');
                $table->string('services_benefit_3_text')->default('24/7 Support');
                $table->string('services_benefit_3_icon')->default('Clock');
                
                // Work process section
                $table->string('work_process_title')->default('My Work Process');
                $table->text('work_process_description')->default('A systematic approach that ensures quality results and client satisfaction.');
                $table->json('work_process_steps')->nullable();
                
                // CTA section
                $table->string('services_cta_title')->default('Ready to Start Your Project?');
                $table->text('services_cta_description')->default('Let us discuss your requirements and create something amazing together.');
                $table->string('services_cta_primary_text')->default('Get Free Consultation');
                $table->string('services_cta_secondary_text')->default('View Portfolio');
                
                $table->timestamps();
            });
        }

        // Migrate existing data from profiles table to services_management table
        $profile = DB::table('profiles')->first();
        
        if ($profile) {
            // Check if services_management table is empty
            $existingRecord = DB::table('services_management')->first();
            
            if (!$existingRecord) {
                DB::table('services_management')->insert([
                    'services_section_badge' => $profile->services_section_badge ?? 'Professional Services',
                    'services_section_title' => $profile->services_section_title ?? 'Areas of Expertise',
                    'services_section_description' => $profile->services_section_description ?? 'Delivering tailored, high-quality solutions to help your business thrive in the digital landscape',
                    'services_button_text' => $profile->services_button_text ?? 'Explore All Services',
                    'services_page_title' => $profile->services_page_title ?? 'Professional Services',
                    'services_page_description' => $profile->services_page_description ?? 'Comprehensive digital solutions tailored to your business needs.',
                    'services_benefit_1_text' => $profile->services_benefit_1_text ?? 'Fast Delivery',
                    'services_benefit_1_icon' => $profile->services_benefit_1_icon ?? 'Zap',
                    'services_benefit_2_text' => $profile->services_benefit_2_text ?? 'Quality Guaranteed',
                    'services_benefit_2_icon' => $profile->services_benefit_2_icon ?? 'CheckCircle',
                    'services_benefit_3_text' => $profile->services_benefit_3_text ?? '24/7 Support',
                    'services_benefit_3_icon' => $profile->services_benefit_3_icon ?? 'Clock',
                    'work_process_title' => $profile->work_process_title ?? 'My Work Process',
                    'work_process_description' => $profile->work_process_description ?? 'A systematic approach that ensures quality results and client satisfaction.',
                    'work_process_steps' => $profile->work_process_steps ?? json_encode([
                        ['number' => '01', 'title' => 'Discovery', 'description' => 'Understanding your requirements, goals, and target audience to create an optimal solution.'],
                        ['number' => '02', 'title' => 'Planning', 'description' => 'Creating detailed project plans, wireframes, and technical specifications.'],
                        ['number' => '03', 'title' => 'Development', 'description' => 'Building your solution using best practices and cutting-edge technologies.'],
                        ['number' => '04', 'title' => 'Testing', 'description' => 'Rigorous testing across all devices and browsers to ensure quality and performance.'],
                        ['number' => '05', 'title' => 'Launch', 'description' => 'Deploying your project and providing ongoing support and maintenance.']
                    ]),
                    'services_cta_title' => $profile->services_cta_title ?? 'Ready to Start Your Project?',
                    'services_cta_description' => $profile->services_cta_description ?? 'Let us discuss your requirements and create something amazing together.',
                    'services_cta_primary_text' => $profile->services_cta_primary_text ?? 'Get Free Consultation',
                    'services_cta_secondary_text' => $profile->services_cta_secondary_text ?? 'View Portfolio',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        } else {
            // Create default record if no profile exists
            DB::table('services_management')->insert([
                'services_section_badge' => 'Professional Services',
                'services_section_title' => 'Areas of Expertise',
                'services_section_description' => 'Delivering tailored, high-quality solutions to help your business thrive in the digital landscape',
                'services_button_text' => 'Explore All Services',
                'services_page_title' => 'Professional Services',
                'services_page_description' => 'Comprehensive digital solutions tailored to your business needs.',
                'services_benefit_1_text' => 'Fast Delivery',
                'services_benefit_1_icon' => 'Zap',
                'services_benefit_2_text' => 'Quality Guaranteed',
                'services_benefit_2_icon' => 'CheckCircle',
                'services_benefit_3_text' => '24/7 Support',
                'services_benefit_3_icon' => 'Clock',
                'work_process_title' => 'My Work Process',
                'work_process_description' => 'A systematic approach that ensures quality results and client satisfaction.',
                'work_process_steps' => json_encode([
                    ['number' => '01', 'title' => 'Discovery', 'description' => 'Understanding your requirements, goals, and target audience to create an optimal solution.'],
                    ['number' => '02', 'title' => 'Planning', 'description' => 'Creating detailed project plans, wireframes, and technical specifications.'],
                    ['number' => '03', 'title' => 'Development', 'description' => 'Building your solution using best practices and cutting-edge technologies.'],
                    ['number' => '04', 'title' => 'Testing', 'description' => 'Rigorous testing across all devices and browsers to ensure quality and performance.'],
                    ['number' => '05', 'title' => 'Launch', 'description' => 'Deploying your project and providing ongoing support and maintenance.']
                ]),
                'services_cta_title' => 'Ready to Start Your Project?',
                'services_cta_description' => 'Let us discuss your requirements and create something amazing together.',
                'services_cta_primary_text' => 'Get Free Consultation',
                'services_cta_secondary_text' => 'View Portfolio',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Don't drop the table in down method to preserve data
        // Schema::dropIfExists('services_management');
    }
};
