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
            // Filter categories (JSON array to store dynamic categories)
            if (!Schema::hasColumn('projects_management', 'filter_categories')) {
                $table->json('filter_categories')->nullable()->after('all_categories_text');
            }

            // Custom statistics numbers (override auto-calculated ones)
            if (!Schema::hasColumn('projects_management', 'stat_total_projects')) {
                $table->string('stat_total_projects')->nullable()->after('clients_label');
            }
            if (!Schema::hasColumn('projects_management', 'stat_categories')) {
                $table->string('stat_categories')->nullable()->after('stat_total_projects');
            }
            if (!Schema::hasColumn('projects_management', 'stat_technologies')) {
                $table->string('stat_technologies')->nullable()->after('stat_categories');
            }
            if (!Schema::hasColumn('projects_management', 'stat_clients')) {
                $table->string('stat_clients')->nullable()->after('stat_technologies');
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
                'filter_categories',
                'stat_total_projects',
                'stat_categories',
                'stat_technologies',
                'stat_clients'
            ]);
        });
    }
};
