<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            [
                'name' => 'Laravel',
                'proficiency' => 90,
                'category' => 'Backend',
                'icon' => 'laravel',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 1,
            ],
            [
                'name' => 'React',
                'proficiency' => 85,
                'category' => 'Frontend',
                'icon' => 'react',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 2,
            ],
            [
                'name' => 'Vue.js',
                'proficiency' => 80,
                'category' => 'Frontend',
                'icon' => 'vue',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 3,
            ],
            [
                'name' => 'Node.js',
                'proficiency' => 75,
                'category' => 'Backend',
                'icon' => 'nodejs',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 4,
            ],
            [
                'name' => 'MySQL',
                'proficiency' => 85,
                'category' => 'Database',
                'icon' => 'mysql',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 5,
            ],
            [
                'name' => 'MongoDB',
                'proficiency' => 75,
                'category' => 'Database',
                'icon' => 'mongodb',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 6,
            ],
            [
                'name' => 'Docker',
                'proficiency' => 70,
                'category' => 'DevOps',
                'icon' => 'docker',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 7,
            ],
            [
                'name' => 'AWS',
                'proficiency' => 75,
                'category' => 'Cloud',
                'icon' => 'aws',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 8,
            ],
            [
                'name' => 'Git',
                'proficiency' => 90,
                'category' => 'Tools',
                'icon' => 'git',
                'display_type' => 'progress',
                'is_visible' => true,
                'order' => 9,
            ],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
} 