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
            // Logo settings
            $table->string('logo_text')->default('Portfolio')->after('twitter_url');
            $table->string('logo_type')->default('text_with_icon')->after('logo_text'); // Options: text_only, icon_only, text_with_icon
            $table->string('logo_icon')->default('P')->after('logo_type'); // Default "P" letter or can be path to SVG/PNG
            $table->string('logo_icon_type')->default('letter')->after('logo_icon'); // Options: letter, svg, image
            $table->string('logo_color')->default('#20B2AA')->after('logo_icon_type');
            
            // Navbar items (stored as JSON)
            $table->json('navbar_items')->nullable()->after('logo_color');
            
            // Add is_available field
            $table->boolean('is_available')->default(true)->after('projects_completed');
            
            // Add CTA fields
            $table->string('cta_text')->default('Contact Me')->after('is_available');
            $table->string('cta_url')->default('#contact')->after('cta_text');
            $table->string('cta_secondary_text')->default('View Portfolio')->after('cta_url');
            $table->string('cta_secondary_url')->default('#portfolio')->after('cta_secondary_text');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'logo_text',
                'logo_type',
                'logo_icon',
                'logo_icon_type',
                'logo_color',
                'navbar_items',
                'is_available',
                'cta_text',
                'cta_url',
                'cta_secondary_text',
                'cta_secondary_url'
            ]);
        });
    }
};
