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
            // First check if the column exists
            if (Schema::hasColumn('services', 'long_description')) {
                // Modify the existing column to TEXT type
                $table->text('long_description')->change();
            } else {
                // Add the column if it doesn't exist
                $table->text('long_description')->nullable()->after('description');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            // We can't really revert back to a specific string length
            // But we can ensure the column exists
            if (Schema::hasColumn('services', 'long_description')) {
                $table->string('long_description', 255)->change();
            }
        });
    }
}; 