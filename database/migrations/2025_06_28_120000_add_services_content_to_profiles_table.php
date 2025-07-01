<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            // Home page services section content
            $table->string('services_section_badge')->default('Professional Services')->after('navbar_items');
            $table->string('services_section_title')->default('Areas of Expertise')->after('services_section_badge');
            $table->text('services_section_description')->default('Delivering tailored, high-quality solutions to help your business thrive in the digital landscape')->after('services_section_title');
            $table->string('services_button_text')->default('Explore All Services')->after('services_section_description');
            
            // Services page content
            $table->string('services_page_title')->default('Professional Services')->after('services_button_text');
            $table->text('services_page_description')->default('Comprehensive digital solutions tailored to your business needs. From concept to deployment, I provide end-to-end services that drive results and exceed expectations.')->after('services_page_title');
            
            // Services page benefits
            $table->string('services_benefit_1_text')->default('Fast Delivery')->after('services_page_description');
            $table->string('services_benefit_1_icon')->default('Zap')->after('services_benefit_1_text');
            $table->string('services_benefit_2_text')->default('Quality Guaranteed')->after('services_benefit_1_icon');
            $table->string('services_benefit_2_icon')->default('CheckCircle')->after('services_benefit_2_text');
            $table->string('services_benefit_3_text')->default('24/7 Support')->after('services_benefit_2_icon');
            $table->string('services_benefit_3_icon')->default('Clock')->after('services_benefit_3_text');
            
            // Work process section
            $table->string('work_process_title')->default('My Work Process')->after('services_benefit_3_icon');
            $table->text('work_process_description')->default('A systematic approach that ensures quality results and client satisfaction.')->after('work_process_title');
            $table->json('work_process_steps')->nullable()->after('work_process_description');
            
            // CTA section
            $table->string('services_cta_title')->default('Ready to Start Your Project?')->after('work_process_steps');
            $table->text('services_cta_description')->default('Let us discuss your requirements and create something amazing together.')->after('services_cta_title');
            $table->string('services_cta_primary_text')->default('Get Free Consultation')->after('services_cta_description');
            $table->string('services_cta_secondary_text')->default('View Portfolio')->after('services_cta_primary_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
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
