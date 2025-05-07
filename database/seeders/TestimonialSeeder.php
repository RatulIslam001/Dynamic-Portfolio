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
                'name' => 'Sarah Johnson',
                'position' => 'CEO',
                'company' => 'TechStart Inc.',
                'quote' => 'Working with this developer was an absolute pleasure. They delivered our project on time and exceeded our expectations in every way.',
                'rating' => 5,
                'image' => null,
                'order' => 1,
                'is_featured' => true,
            ],
            [
                'name' => 'Michael Chen',
                'position' => 'CTO',
                'company' => 'Innovation Labs',
                'quote' => 'The attention to detail and creative solutions provided made our website stand out from competitors. Highly recommended!',
                'rating' => 5,
                'image' => null,
                'order' => 2,
                'is_featured' => true,
            ],
            [
                'name' => 'Emily Rodriguez',
                'position' => 'Product Manager',
                'company' => 'Digital Solutions',
                'quote' => 'Exceptional work ethic and communication throughout the project. The final product was exactly what we envisioned and more.',
                'rating' => 5,
                'image' => null,
                'order' => 3,
                'is_featured' => true,
            ],
            [
                'name' => 'David Kim',
                'position' => 'Founder',
                'company' => 'StartupX',
                'quote' => 'Their technical expertise and problem-solving skills helped us launch our product ahead of schedule. A true professional.',
                'rating' => 5,
                'image' => null,
                'order' => 4,
                'is_featured' => false,
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
} 