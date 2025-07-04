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
        Schema::table('projects_management', function (Blueprint $table) {
            // Check if columns exist before adding them
            if (!Schema::hasColumn('projects_management', 'home_section_badge')) {
                $table->string('home_section_badge')->default('Portfolio')->after('id');
            }
            if (!Schema::hasColumn('projects_management', 'home_section_title')) {
                $table->string('home_section_title')->default('Featured Projects')->after('home_section_badge');
            }
            if (!Schema::hasColumn('projects_management', 'home_section_description')) {
                $table->text('home_section_description')->default('Explore my latest work and see how I have helped clients achieve their goals')->after('home_section_title');
            }
            if (!Schema::hasColumn('projects_management', 'home_section_button_text')) {
                $table->string('home_section_button_text')->default('Explore All Projects')->after('home_section_description');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects_management', function (Blueprint $table) {
            $table->dropColumn([
                'home_section_badge',
                'home_section_title', 
                'home_section_description',
                'home_section_button_text'
            ]);
        });
    }
};
