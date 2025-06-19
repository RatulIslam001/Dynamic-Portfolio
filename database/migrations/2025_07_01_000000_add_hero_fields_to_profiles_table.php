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
            $table->boolean('is_available')->default(true)->after('projects_completed');
            $table->string('cta_text')->default('View Work')->after('is_available');
            $table->string('cta_secondary_text')->default('Download CV')->after('cta_text');
            $table->string('cta_url')->nullable()->after('cta_secondary_text');
            $table->string('cta_secondary_url')->nullable()->after('cta_url');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn([
                'is_available',
                'cta_text',
                'cta_secondary_text',
                'cta_url',
                'cta_secondary_url'
            ]);
        });
    }
}; 