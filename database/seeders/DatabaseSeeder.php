<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AdminSeeder::class,
            ServiceSeeder::class,
            ProjectSeeder::class,
            SkillSeeder::class,
            ExperienceSeeder::class,
            TestimonialSeeder::class,
            EducationSeeder::class,
            DummyProjectsSeeder::class,
        ]);
    }
}
