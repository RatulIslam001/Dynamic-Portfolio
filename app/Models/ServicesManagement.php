<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServicesManagement extends Model
{
    use HasFactory;

    protected $table = 'services_management';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        // Home page services section content
        'services_section_badge',
        'services_section_title',
        'services_section_description',
        'services_button_text',
        
        // Services page content
        'services_page_title',
        'services_page_description',
        
        // Benefits section
        'services_benefit_1_text',
        'services_benefit_1_icon',
        'services_benefit_2_text',
        'services_benefit_2_icon',
        'services_benefit_3_text',
        'services_benefit_3_icon',
        
        // Work process section
        'work_process_title',
        'work_process_description',
        'work_process_steps',
        
        // CTA section
        'services_cta_title',
        'services_cta_description',
        'services_cta_primary_text',
        'services_cta_secondary_text',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'work_process_steps' => 'array',
    ];

    /**
     * Get the first (and should be only) services management record.
     * Create one with defaults if it doesn't exist.
     *
     * @return ServicesManagement
     */
    public static function getOrCreate()
    {
        // Always get fresh data from database - get the most recently updated record
        $record = static::orderBy('updated_at', 'desc')->first();

        if (!$record) {
            $record = static::create([
                'services_section_badge' => 'Professional Services',
                'services_section_title' => 'Areas of Expertise',
                'services_section_description' => 'Delivering tailored, high-quality solutions to help your business thrive in the digital landscape',
                'services_button_text' => 'Explore All Services',
                'services_page_title' => 'Professional Services',
                'services_page_description' => 'Comprehensive digital solutions tailored to your business needs.',
                'services_benefit_1_text' => 'Fast Delivery',
                'services_benefit_1_icon' => 'Zap',
                'services_benefit_2_text' => 'Quality Guaranteed',
                'services_benefit_2_icon' => 'CheckCircle',
                'services_benefit_3_text' => '24/7 Support',
                'services_benefit_3_icon' => 'Clock',
                'work_process_title' => 'My Work Process',
                'work_process_description' => 'A systematic approach that ensures quality results and client satisfaction.',
                'work_process_steps' => [
                    [
                        'number' => '01',
                        'title' => 'Discovery',
                        'description' => 'Understanding your requirements, goals, and target audience to create an optimal solution.'
                    ],
                    [
                        'number' => '02',
                        'title' => 'Planning',
                        'description' => 'Creating a detailed roadmap with timelines, milestones, and resource allocation.'
                    ],
                    [
                        'number' => '03',
                        'title' => 'Development',
                        'description' => 'Building your solution using best practices, modern technologies, and clean code.'
                    ],
                    [
                        'number' => '04',
                        'title' => 'Testing',
                        'description' => 'Rigorous testing to ensure functionality, performance, and user experience excellence.'
                    ],
                    [
                        'number' => '05',
                        'title' => 'Launch',
                        'description' => 'Deploying your solution and providing ongoing support for optimal performance.'
                    ]
                ],
                'services_cta_title' => 'Ready to Start Your Project?',
                'services_cta_description' => 'Let us discuss your requirements and create something amazing together.',
                'services_cta_primary_text' => 'Get Free Consultation',
                'services_cta_secondary_text' => 'View Portfolio',
            ]);
        }

        return $record;
    }

    /**
     * Get formatted benefits array for the frontend.
     *
     * @return array
     */
    public function getBenefitsAttribute()
    {
        return [
            [
                'text' => $this->services_benefit_1_text,
                'icon' => $this->services_benefit_1_icon
            ],
            [
                'text' => $this->services_benefit_2_text,
                'icon' => $this->services_benefit_2_icon
            ],
            [
                'text' => $this->services_benefit_3_text,
                'icon' => $this->services_benefit_3_icon
            ]
        ];
    }

    /**
     * Get formatted work process data for the frontend.
     *
     * @return array
     */
    public function getWorkProcessAttribute()
    {
        return [
            'title' => $this->work_process_title,
            'description' => $this->work_process_description,
            'steps' => $this->work_process_steps ?? []
        ];
    }

    /**
     * Get formatted CTA data for the frontend.
     *
     * @return array
     */
    public function getCtaAttribute()
    {
        return [
            'title' => $this->services_cta_title,
            'description' => $this->services_cta_description,
            'primary_text' => $this->services_cta_primary_text,
            'secondary_text' => $this->services_cta_secondary_text
        ];
    }
}
