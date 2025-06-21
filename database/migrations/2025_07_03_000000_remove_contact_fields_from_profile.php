<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Backup contact data before removal
        Schema::table('profiles', function (Blueprint $table) {
            // Create backup columns
            $table->string('email_backup')->nullable();
            $table->string('phone_backup')->nullable();
            $table->string('location_backup')->nullable();
        });

        // Copy data to backup columns
        $profiles = DB::table('profiles')->get();
        foreach ($profiles as $profile) {
            DB::table('profiles')
                ->where('id', $profile->id)
                ->update([
                    'email_backup' => $profile->email,
                    'phone_backup' => $profile->phone,
                    'location_backup' => $profile->location,
                ]);
        }

        // Remove contact fields
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['email', 'phone', 'location']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Add contact fields back
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('email')->nullable()->after('about');
            $table->string('phone')->nullable()->after('email');
            $table->string('location')->nullable()->after('phone');
        });

        // Restore data from backup columns
        $profiles = DB::table('profiles')->get();
        foreach ($profiles as $profile) {
            DB::table('profiles')
                ->where('id', $profile->id)
                ->update([
                    'email' => $profile->email_backup,
                    'phone' => $profile->phone_backup,
                    'location' => $profile->location_backup,
                ]);
        }

        // Remove backup columns
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['email_backup', 'phone_backup', 'location_backup']);
        });
    }
}; 