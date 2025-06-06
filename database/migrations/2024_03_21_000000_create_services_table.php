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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->integer('order')->default(0);
            $table->string('title');
            $table->text('description');
            $table->string('icon')->default('Code');
            $table->boolean('is_active')->default(true);
            $table->text('long_description')->nullable();
            $table->integer('projects_count')->default(0);
            $table->string('duration')->nullable();
            $table->decimal('starting_price', 10, 2)->nullable();
            $table->json('features')->nullable();
            $table->json('technologies')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
}; 