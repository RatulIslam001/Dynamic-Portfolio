<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Education;

class EducationSeeder extends Seeder
{
    public function run(): void
    {
        $education = [
            [
                'degree' => 'Master\'s in Computer Science',
                'institution' => 'Tech University',
                'location' => 'San Francisco, CA',
                'start_date' => '2014-09-01',
                'end_date' => '2016-06-01',
                'description' => 'Specialized in web technologies and user interface design.',
                'order' => 1,
            ],
            [
                'degree' => 'Bachelor\'s in Computer Science',
                'institution' => 'State University',
                'location' => 'New York, NY',
                'start_date' => '2010-09-01',
                'end_date' => '2014-05-01',
                'description' => 'Focused on software development and design principles.',
                'order' => 2,
            ],
            [
                'degree' => 'Associate\'s in Graphic Design',
                'institution' => 'Design Institute',
                'location' => 'Boston, MA',
                'start_date' => '2008-09-01',
                'end_date' => '2010-05-01',
                'description' => 'Studied visual communication and digital design fundamentals.',
                'order' => 3,
            ],
        ];

        foreach ($education as $item) {
            Education::create($item);
        }
    }
} 