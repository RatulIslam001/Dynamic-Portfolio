<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Experience;

class ExperienceSeeder extends Seeder
{
    public function run(): void
    {
        $experiences = [
            [
                'title' => 'Senior Full Stack Developer',
                'company' => 'Tech Innovators Inc.',
                'location' => 'San Francisco, CA',
                'start_date' => '2021-01-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Leading development of enterprise web applications using Laravel and React. Managing a team of 5 developers.',
                'type' => 'work',
                'order' => 1,
            ],
            [
                'title' => 'Full Stack Developer',
                'company' => 'Digital Solutions Ltd.',
                'location' => 'New York, NY',
                'start_date' => '2019-03-01',
                'end_date' => '2020-12-31',
                'is_current' => false,
                'description' => 'Developed and maintained multiple client projects using Vue.js and Node.js. Implemented CI/CD pipelines.',
                'type' => 'work',
                'order' => 2,
            ],
            [
                'title' => 'Junior Developer',
                'company' => 'StartUp Hub',
                'location' => 'Boston, MA',
                'start_date' => '2018-06-01',
                'end_date' => '2019-02-28',
                'is_current' => false,
                'description' => 'Worked on frontend development using React and backend API development with Node.js.',
                'type' => 'work',
                'order' => 3,
            ],
            [
                'title' => 'Master of Computer Science',
                'company' => 'Tech University',
                'location' => 'San Francisco, CA',
                'start_date' => '2015-09',
                'end_date' => '2017-05',
                'is_current' => false,
                'description' => 'Specialized in Software Engineering and Artificial Intelligence. Completed thesis on scalable web architectures.',
                'type' => 'education',
                'order' => 4,
            ],
            [
                'title' => 'Bachelor of Computer Science',
                'company' => 'State University',
                'location' => 'Los Angeles, CA',
                'start_date' => '2011-09',
                'end_date' => '2015-05',
                'is_current' => false,
                'description' => 'Major in Computer Science with minor in Mathematics. Dean\'s List all semesters.',
                'type' => 'education',
                'order' => 5,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::create($experience);
        }
    }
} 