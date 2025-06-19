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
        // First, save any non-empty bio data to the 'about' field
        $profiles = DB::table('profiles')->get();
        foreach ($profiles as $profile) {
            if (!empty($profile->bio) && ($profile->about === null || $profile->about === '')) {
                DB::table('profiles')
                    ->where('id', $profile->id)
                    ->update(['about' => $profile->bio]);
            }
        }

        // Then remove the bio column
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn('bio');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->text('bio')->nullable()->after('title');
        });

        // Restore data from 'about' to 'bio' field for all profiles
        $profiles = DB::table('profiles')->get();
        foreach ($profiles as $profile) {
            DB::table('profiles')
                ->where('id', $profile->id)
                ->update(['bio' => $profile->about]);
        }
    }
}; 