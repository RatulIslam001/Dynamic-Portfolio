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
        Schema::create('projects_management', function (Blueprint $table) {
            $table->id();

            // Projects page header content
            $table->string('page_title');
            $table->text('page_description');
            $table->string('page_badge');

            // Projects page statistics/counters
            $table->string('total_projects_label');
            $table->string('categories_label');
            $table->string('technologies_label');
            $table->string('clients_label');

            // Filter section
            $table->string('filter_title');
            $table->string('search_placeholder');
            $table->string('category_filter_label');
            $table->string('all_categories_text');

            // Project cards section
            $table->string('projects_section_title');
            $table->text('projects_section_description');

            // Call to action section
            $table->string('cta_title');
            $table->text('cta_description');
            $table->string('cta_primary_button');
            $table->string('cta_secondary_button');
            $table->string('cta_primary_url');
            $table->string('cta_secondary_url');

            // SEO and meta
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects_management');
    }
};
