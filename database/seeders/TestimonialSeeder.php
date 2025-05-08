<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Testimonial;

class TestimonialSeeder extends Seeder
{
    public function run(): void
    {
        $testimonials = [
            [
                'name' => 'John Smith',
                'position' => 'CEO',
                'company' => 'Tech Solutions Inc.',
                'quote' => 'Exceptional work! Delivered our project on time and exceeded our expectations. Great communication throughout the process.',
                'rating' => 5,
                'image' => null,
                'is_featured' => true,
                'order' => 1,
            ],
            [
                'name' => 'Sarah Johnson',
                'position' => 'Product Manager',
                'company' => 'Digital Innovations',
                'quote' => 'Outstanding developer with excellent problem-solving skills. Helped us create a beautiful and functional web application.',
                'rating' => 5,
                'image' => null,
                'is_featured' => true,
                'order' => 2,
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'CTO',
                'company' => 'StartUp Hub',
                'quote' => 'Highly skilled and professional. Great attention to detail and always delivers high-quality work.',
                'rating' => 5,
                'image' => null,
                'is_featured' => true,
                'order' => 3,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
} 