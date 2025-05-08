<?php

namespace Database\Seeders;

use App\Models\Education;
use Illuminate\Database\Seeder;

class EducationSeeder extends Seeder
{
    public function run(): void
    {
        $educations = [
            [
                'degree' => 'Master of Science in Computer Science',
                'institution' => 'Stanford University',
                'location' => 'Stanford, CA',
                'start_date' => '2019-09-01',
                'end_date' => '2021-06-30',
                'description' => 'Specialized in Artificial Intelligence and Machine Learning. Completed thesis on Deep Learning applications.',
                'order' => 1,
            ],
            [
                'degree' => 'Bachelor of Science in Computer Science',
                'institution' => 'University of California, Berkeley',
                'location' => 'Berkeley, CA',
                'start_date' => '2015-09-01',
                'end_date' => '2019-05-30',
                'description' => 'Major in Computer Science with minor in Mathematics. Dean\'s List all semesters.',
                'order' => 2,
            ],
        ];

        foreach ($educations as $education) {
            Education::create($education);
        }
    }
} 