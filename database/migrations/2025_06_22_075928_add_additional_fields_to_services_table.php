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
        Schema::table('services', function (Blueprint $table) {
            $table->string('long_description')->nullable()->after('description');
            $table->string('duration')->nullable()->after('price');
            $table->boolean('is_featured')->default(false)->after('is_active');
            $table->integer('projects_count')->default(0)->after('duration');
            $table->json('technologies')->nullable()->after('features');
            $table->string('image_url')->nullable()->after('technologies');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn([
                'long_description',
                'duration',
                'is_featured',
                'projects_count',
                'technologies',
                'image_url'
            ]);
        });
    }
};
