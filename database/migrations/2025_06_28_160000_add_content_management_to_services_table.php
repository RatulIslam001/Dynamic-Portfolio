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
        Schema::table('services', function (Blueprint $table) {
            // Add a flag to identify content management record
            $table->boolean('is_content_management')->default(false)->after('order');
            
            // Home page services section content
            $table->string('services_section_badge')->nullable()->after('is_content_management');
            $table->string('services_section_title')->nullable()->after('services_section_badge');
            $table->text('services_section_description')->nullable()->after('services_section_title');
            $table->string('services_button_text')->nullable()->after('services_section_description');
            
            // Services page header content
            $table->string('services_page_title')->nullable()->after('services_button_text');
            $table->text('services_page_description')->nullable()->after('services_page_title');
            
            // Services page benefits
            $table->string('services_benefit_1_text')->nullable()->after('services_page_description');
            $table->string('services_benefit_1_icon')->nullable()->after('services_benefit_1_text');
            $table->string('services_benefit_2_text')->nullable()->after('services_benefit_1_icon');
            $table->string('services_benefit_2_icon')->nullable()->after('services_benefit_2_text');
            $table->string('services_benefit_3_text')->nullable()->after('services_benefit_2_icon');
            $table->string('services_benefit_3_icon')->nullable()->after('services_benefit_3_text');
            
            // Work process section
            $table->string('work_process_title')->nullable()->after('services_benefit_3_icon');
            $table->text('work_process_description')->nullable()->after('work_process_title');
            $table->json('work_process_steps')->nullable()->after('work_process_description');
            
            // CTA section
            $table->string('services_cta_title')->nullable()->after('work_process_steps');
            $table->text('services_cta_description')->nullable()->after('services_cta_title');
            $table->string('services_cta_primary_text')->nullable()->after('services_cta_description');
            $table->string('services_cta_secondary_text')->nullable()->after('services_cta_primary_text');
        });

        // Migrate existing content from profiles table
        $profile = DB::table('profiles')->first();
        
        if ($profile) {
            // Check if content management record already exists
            $existingContentRecord = DB::table('services')->where('is_content_management', true)->first();
            
            if (!$existingContentRecord) {
                // Create the content management record
                DB::table('services')->insert([
                    'title' => 'Content Management',
                    'description' => 'This record stores all services content management data',
                    'icon' => 'Settings',
                    'price' => 0,
                    'starting_price' => 0,
                    'features' => json_encode([]),
                    'is_active' => false, // Hidden from public display
                    'is_featured' => false,
                    'is_content_management' => true,
                    'order' => 0, // Always first
                    
                    // Content management fields
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
            // Create default content management record if no profile exists
            DB::table('services')->insert([
                'title' => 'Content Management',
                'description' => 'This record stores all services content management data',
                'icon' => 'Settings',
                'price' => 0,
                'starting_price' => 0,
                'features' => json_encode([]),
                'is_active' => false,
                'is_featured' => false,
                'is_content_management' => true,
                'order' => 0,
                
                // Default content management fields
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
        // Remove the content management record
        DB::table('services')->where('is_content_management', true)->delete();
        
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'is_content_management',
                'services_section_badge',
                'services_section_title',
                'services_section_description',
                'services_button_text',
                'services_page_title',
                'services_page_description',
                'services_benefit_1_text',
                'services_benefit_1_icon',
                'services_benefit_2_text',
                'services_benefit_2_icon',
                'services_benefit_3_text',
                'services_benefit_3_icon',
                'work_process_title',
                'work_process_description',
                'work_process_steps',
                'services_cta_title',
                'services_cta_description',
                'services_cta_primary_text',
                'services_cta_secondary_text',
            ]);
        });
    }
};
