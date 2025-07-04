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
            // Remove SEO fields
            if (Schema::hasColumn('projects_management', 'meta_title')) {
                $table->dropColumn('meta_title');
            }
            if (Schema::hasColumn('projects_management', 'meta_description')) {
                $table->dropColumn('meta_description');
            }
            if (Schema::hasColumn('projects_management', 'meta_keywords')) {
                $table->dropColumn('meta_keywords');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('projects_management', function (Blueprint $table) {
            // Add back SEO fields if needed
            $table->string('meta_title')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();
        });
    }
};
