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
        Schema::table('services', function (Blueprint $table) {
            $table->integer('order')->default(999)->after('is_active');
        });

        // Assign order values to existing services
        $services = DB::table('services')->orderBy('id')->get();
        foreach ($services as $index => $service) {
            DB::table('services')
                ->where('id', $service->id)
                ->update(['order' => $index + 1]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('services', function (Blueprint $table) {
            $table->dropColumn('order');
        });
    }
};
