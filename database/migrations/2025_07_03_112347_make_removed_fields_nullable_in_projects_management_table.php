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
            // Make removed fields nullable and provide default values
            $table->string('filter_title')->nullable()->default('Filter Projects')->change();
            $table->string('category_filter_label')->nullable()->default('Category')->change();
            $table->text('projects_section_description')->nullable()->default('A collection of projects that demonstrate my skills and expertise in various technologies.')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects_management', function (Blueprint $table) {
            // Revert the changes
            $table->string('filter_title')->nullable(false)->change();
            $table->string('category_filter_label')->nullable(false)->change();
            $table->text('projects_section_description')->nullable(false)->change();
        });
    }
};
