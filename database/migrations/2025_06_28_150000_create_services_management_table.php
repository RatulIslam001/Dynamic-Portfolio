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

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services_management');
    }
};
