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
                'company' => 'Tech Innovations Inc.',
                'location' => 'San Francisco, CA',
                'start_date' => '2021-01',
                'end_date' => null,
                'is_current' => true,
                'description' => 'Leading a team of developers in building scalable web applications using Laravel and React. Implementing CI/CD pipelines and maintaining cloud infrastructure.',
                'type' => 'work',
                'order' => 1,
            ],
            [
                'title' => 'Full Stack Developer',
                'company' => 'Digital Solutions Ltd.',
                'location' => 'New York, NY',
                'start_date' => '2019-03',
                'end_date' => '2020-12',
                'is_current' => false,
                'description' => 'Developed and maintained multiple client projects using Vue.js and Node.js. Implemented automated testing and improved deployment processes.',
                'type' => 'work',
                'order' => 2,
            ],
            [
                'title' => 'Frontend Developer',
                'company' => 'WebTech Startup',
                'location' => 'Boston, MA',
                'start_date' => '2017-06',
                'end_date' => '2019-02',
                'is_current' => false,
                'description' => 'Built responsive web applications using React and Redux. Collaborated with UX designers to implement pixel-perfect designs.',
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