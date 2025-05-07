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
                'order' => 1,
                'is_visible' => true,
            ],
            [
                'name' => 'React',
                'proficiency' => 85,
                'category' => 'Frontend',
                'icon' => 'react',
                'order' => 2,
                'is_visible' => true,
            ],
            [
                'name' => 'Vue.js',
                'proficiency' => 80,
                'category' => 'Frontend',
                'icon' => 'vue',
                'order' => 3,
                'is_visible' => true,
            ],
            [
                'name' => 'Node.js',
                'proficiency' => 85,
                'category' => 'Backend',
                'icon' => 'nodejs',
                'order' => 4,
                'is_visible' => true,
            ],
            [
                'name' => 'TypeScript',
                'proficiency' => 80,
                'category' => 'Programming',
                'icon' => 'typescript',
                'order' => 5,
                'is_visible' => true,
            ],
            [
                'name' => 'MySQL',
                'proficiency' => 85,
                'category' => 'Database',
                'icon' => 'mysql',
                'order' => 6,
                'is_visible' => true,
            ],
            [
                'name' => 'MongoDB',
                'proficiency' => 75,
                'category' => 'Database',
                'icon' => 'mongodb',
                'order' => 7,
                'is_visible' => true,
            ],
            [
                'name' => 'Docker',
                'proficiency' => 70,
                'category' => 'DevOps',
                'icon' => 'docker',
                'order' => 8,
                'is_visible' => true,
            ],
            [
                'name' => 'AWS',
                'proficiency' => 75,
                'category' => 'Cloud',
                'icon' => 'aws',
                'order' => 9,
                'is_visible' => true,
            ],
            [
                'name' => 'Git',
                'proficiency' => 90,
                'category' => 'Tools',
                'icon' => 'git',
                'order' => 10,
                'is_visible' => true,
            ],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
} 