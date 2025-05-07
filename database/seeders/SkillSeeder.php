<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Skill;

class SkillSeeder extends Seeder
{
    public function run(): void
    {
        $skills = [
            // Left Side - Progress Bar Skills (Max 5 shown)
            [
                'name' => 'HTML/CSS',
                'proficiency' => 95,
                'category' => 'Technical',
                'display_type' => 'progress',
                'order' => 1,
                'is_visible' => true,
            ],
            [
                'name' => 'JavaScript',
                'proficiency' => 90,
                'category' => 'Technical',
                'display_type' => 'progress',
                'order' => 2,
                'is_visible' => true,
            ],
            [
                'name' => 'React',
                'proficiency' => 85,
                'category' => 'Technical',
                'display_type' => 'progress',
                'order' => 3,
                'is_visible' => true,
            ],
            [
                'name' => 'Next.js',
                'proficiency' => 80,
                'category' => 'Technical',
                'display_type' => 'progress',
                'order' => 4,
                'is_visible' => true,
            ],
            [
                'name' => 'UI/UX Design',
                'proficiency' => 85,
                'category' => 'Design',
                'display_type' => 'progress',
                'order' => 5,
                'is_visible' => true,
            ],
            // Additional progress skills (won't show in main portfolio unless others are hidden)
            [
                'name' => 'PHP/Laravel',
                'proficiency' => 85,
                'category' => 'Technical',
                'display_type' => 'progress',
                'order' => 6,
                'is_visible' => true,
            ],
            [
                'name' => 'MySQL',
                'proficiency' => 80,
                'category' => 'Technical',
                'display_type' => 'progress',
                'order' => 7,
                'is_visible' => true,
            ],

            // Right Side - Card Skills (Max 6 shown)
            [
                'name' => 'Node.js',
                'proficiency' => 75,
                'category' => 'Technical',
                'display_type' => 'card',
                'order' => 1,
                'is_visible' => true,
            ],
            [
                'name' => 'TypeScript',
                'proficiency' => 85,
                'category' => 'Technical',
                'display_type' => 'card',
                'order' => 2,
                'is_visible' => true,
            ],
            [
                'name' => 'Figma',
                'proficiency' => 90,
                'category' => 'Design',
                'display_type' => 'card',
                'order' => 3,
                'is_visible' => true,
            ],
            [
                'name' => 'GraphQL',
                'proficiency' => 75,
                'category' => 'Technical',
                'display_type' => 'card',
                'order' => 4,
                'is_visible' => true,
            ],
            [
                'name' => 'Responsive Design',
                'proficiency' => 95,
                'category' => 'Design',
                'display_type' => 'card',
                'order' => 5,
                'is_visible' => true,
            ],
            [
                'name' => 'Git',
                'proficiency' => 80,
                'category' => 'Technical',
                'display_type' => 'card',
                'order' => 6,
                'is_visible' => true,
            ],
            // Additional card skills (won't show in main portfolio unless others are hidden)
            [
                'name' => 'Adobe XD',
                'proficiency' => 85,
                'category' => 'Design',
                'display_type' => 'card',
                'order' => 7,
                'is_visible' => true,
            ],

            // Soft Skills
            [
                'name' => 'Problem Solving',
                'proficiency' => 90,
                'category' => 'Soft Skills',
                'display_type' => 'card',
                'order' => 8,
                'is_visible' => true,
            ],
            [
                'name' => 'Team Collaboration',
                'proficiency' => 95,
                'category' => 'Soft Skills',
                'display_type' => 'card',
                'order' => 9,
                'is_visible' => true,
            ],
            [
                'name' => 'Communication',
                'proficiency' => 90,
                'category' => 'Soft Skills',
                'display_type' => 'card',
                'order' => 10,
                'is_visible' => true,
            ],

            // Languages
            [
                'name' => 'English',
                'proficiency' => 90,
                'category' => 'Languages',
                'display_type' => 'progress',
                'order' => 8,
                'is_visible' => true,
            ],
            [
                'name' => 'Bengali',
                'proficiency' => 100,
                'category' => 'Languages',
                'display_type' => 'progress',
                'order' => 9,
                'is_visible' => true,
            ],
            [
                'name' => 'Hindi',
                'proficiency' => 75,
                'category' => 'Languages',
                'display_type' => 'progress',
                'order' => 10,
                'is_visible' => true,
            ],
        ];

        foreach ($skills as $skill) {
            Skill::create($skill);
        }
    }
} 