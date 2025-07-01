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
            // Add missing columns
            if (!Schema::hasColumn('profiles', 'services_cta_description')) {
                $table->text('services_cta_description')->default('Let us discuss your requirements and create something amazing together.')->after('services_cta_title');
            }
            if (!Schema::hasColumn('profiles', 'services_cta_primary_text')) {
                $table->string('services_cta_primary_text')->default('Get Free Consultation')->after('services_cta_description');
            }
            if (!Schema::hasColumn('profiles', 'services_cta_secondary_text')) {
                $table->string('services_cta_secondary_text')->default('View Portfolio')->after('services_cta_primary_text');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'services_cta_description',
                'services_cta_primary_text',
                'services_cta_secondary_text',
            ]);
        });
    }
};
