<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\ServicesManagement;
use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Schema;

class ServiceController extends Controller
{
    public function index()
    {
        try {
            // Get only service cards (not content management)
            $services = Service::where('is_active', true)
                ->orWhere('is_active', false) // Include inactive services for admin
                ->orderBy('order')
                ->get();

            // Get content management from dedicated table
            $contentManagement = ServicesManagement::getOrCreate();

            // Default content values if content management record is not available
            $defaultContent = [
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
                    ['number' => '01', 'title' => 'Discovery', 'description' => 'Understanding your requirements, goals, and target audience to create an optimal solution.'],
                    ['number' => '02', 'title' => 'Planning', 'description' => 'Creating detailed project plans, wireframes, and technical specifications.'],
                    ['number' => '03', 'title' => 'Development', 'description' => 'Building your solution using best practices and cutting-edge technologies.'],
                    ['number' => '04', 'title' => 'Testing', 'description' => 'Rigorous testing across all devices and browsers to ensure quality and performance.'],
                    ['number' => '05', 'title' => 'Launch', 'description' => 'Deploying your project and providing ongoing support and maintenance.']
                ],
                'services_cta_title' => 'Ready to Start Your Project?',
                'services_cta_description' => 'Let us discuss your requirements and create something amazing together.',
                'services_cta_primary_text' => 'Get Free Consultation',
                'services_cta_secondary_text' => 'View Portfolio',
            ];

            // Use content from the services management record
            $content = [
                'services_section_badge' => $contentManagement->services_section_badge,
                'services_section_title' => $contentManagement->services_section_title,
                'services_section_description' => $contentManagement->services_section_description,
                'services_button_text' => $contentManagement->services_button_text,
                'services_page_title' => $contentManagement->services_page_title,
                'services_page_description' => $contentManagement->services_page_description,
                'services_benefit_1_text' => $contentManagement->services_benefit_1_text,
                'services_benefit_1_icon' => $contentManagement->services_benefit_1_icon,
                'services_benefit_2_text' => $contentManagement->services_benefit_2_text,
                'services_benefit_2_icon' => $contentManagement->services_benefit_2_icon,
                'services_benefit_3_text' => $contentManagement->services_benefit_3_text,
                'services_benefit_3_icon' => $contentManagement->services_benefit_3_icon,
                'work_process_title' => $contentManagement->work_process_title,
                'work_process_description' => $contentManagement->work_process_description,
                'work_process_steps' => $contentManagement->work_process_steps,
                'services_cta_title' => $contentManagement->services_cta_title,
                'services_cta_description' => $contentManagement->services_cta_description,
                'services_cta_primary_text' => $contentManagement->services_cta_primary_text,
                'services_cta_secondary_text' => $contentManagement->services_cta_secondary_text,
            ];

            return Inertia::render('admin/services', [
                'services' => $services,
                'content' => $content
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in ServiceController index: ' . $e->getMessage());
            return Inertia::render('admin/services', [
                'services' => [],
                'content' => [],
                'error' => 'There was an error loading services. Please check the logs for details.'
            ]);
        }
    }

    public function publicIndex()
    {
        try {
            // Get only active service cards
            $services = Service::where('is_active', true)
                ->orderBy('order')
                ->get();

            // Get profile for navigation items
            $profile = Profile::first();

            // Get content management from dedicated table (fresh data)
            // Get the most recently updated record, or create one if none exists
            $contentManagement = ServicesManagement::orderBy('updated_at', 'desc')->first();



            if (!$contentManagement) {
                $contentManagement = ServicesManagement::create([
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
                        ['number' => '01', 'title' => 'Discovery', 'description' => 'Understanding your requirements, goals, and target audience to create an optimal solution.'],
                        ['number' => '02', 'title' => 'Planning', 'description' => 'Creating a detailed roadmap with timelines, milestones, and resource allocation.'],
                        ['number' => '03', 'title' => 'Development', 'description' => 'Building your solution using best practices, modern technologies, and clean code.'],
                        ['number' => '04', 'title' => 'Testing', 'description' => 'Rigorous testing to ensure functionality, performance, and user experience excellence.'],
                        ['number' => '05', 'title' => 'Launch', 'description' => 'Deploying your solution and providing ongoing support for optimal performance.']
                    ],
                    'services_cta_title' => 'Ready to Start Your Project?',
                    'services_cta_description' => 'Let us discuss your requirements and create something amazing together.',
                    'services_cta_primary_text' => 'Get Free Consultation',
                    'services_cta_secondary_text' => 'View Portfolio',
                ]);
            }



            // Default content values if content management record is not available
            $defaultContent = [
                'page_title' => 'Professional Services',
                'page_description' => 'Comprehensive digital solutions tailored to your business needs.',
                'benefits' => [
                    [
                        'text' => 'Fast Delivery',
                        'icon' => 'Zap'
                    ],
                    [
                        'text' => 'Quality Guaranteed',
                        'icon' => 'CheckCircle'
                    ],
                    [
                        'text' => '24/7 Support',
                        'icon' => 'Clock'
                    ]
                ],
                'work_process' => [
                    'title' => 'My Work Process',
                    'description' => 'A systematic approach that ensures quality results and client satisfaction.',
                    'steps' => [
                        ['number' => '01', 'title' => 'Discovery', 'description' => 'Understanding your requirements, goals, and target audience to create an optimal solution.'],
                        ['number' => '02', 'title' => 'Planning', 'description' => 'Creating detailed project plans, wireframes, and technical specifications.'],
                        ['number' => '03', 'title' => 'Development', 'description' => 'Building your solution using best practices and cutting-edge technologies.'],
                        ['number' => '04', 'title' => 'Testing', 'description' => 'Rigorous testing across all devices and browsers to ensure quality and performance.'],
                        ['number' => '05', 'title' => 'Launch', 'description' => 'Deploying your project and providing ongoing support and maintenance.']
                    ]
                ],
                'cta' => [
                    'title' => 'Ready to Start Your Project?',
                    'description' => 'Let us discuss your requirements and create something amazing together.',
                    'primary_text' => 'Get Free Consultation',
                    'secondary_text' => 'View Portfolio'
                ]
            ];

            // Use content from the services management record
            $content = [
                'page_title' => $contentManagement->services_page_title,
                'page_description' => $contentManagement->services_page_description,
                'benefits' => [
                    [
                        'text' => $contentManagement->services_benefit_1_text,
                        'icon' => $contentManagement->services_benefit_1_icon
                    ],
                    [
                        'text' => $contentManagement->services_benefit_2_text,
                        'icon' => $contentManagement->services_benefit_2_icon
                    ],
                    [
                        'text' => $contentManagement->services_benefit_3_text,
                        'icon' => $contentManagement->services_benefit_3_icon
                    ]
                ],
                'work_process' => [
                    'title' => $contentManagement->work_process_title,
                    'description' => $contentManagement->work_process_description,
                    'steps' => $contentManagement->work_process_steps ?? []
                ],
                'cta' => [
                    'title' => $contentManagement->services_cta_title,
                    'description' => $contentManagement->services_cta_description,
                    'primary_text' => $contentManagement->services_cta_primary_text,
                    'secondary_text' => $contentManagement->services_cta_secondary_text
                ]
            ];











            // Prepare profile data for navigation
            $profileData = null;
            if ($profile) {
                $profileData = [
                    'navbar_items' => is_array($profile->navbar_items) ? $profile->navbar_items :
                        (is_string($profile->navbar_items) ? json_decode($profile->navbar_items, true) : []),
                    'logo' => [
                        'text' => $profile->logo_text,
                        'type' => $profile->logo_type,
                        'icon' => $profile->logo_icon,
                        'icon_type' => $profile->logo_icon_type,
                        'color' => $profile->logo_color,
                    ],
                ];
            }

            return Inertia::render('services', [
                'services' => $services,
                'content' => $content,
                'profile' => $profileData
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in ServiceController publicIndex: ' . $e->getMessage());
            return Inertia::render('services', [
                'services' => [],
                'content' => $defaultContent ?? [],
                'profile' => null,
                'error' => 'There was an error loading services. Please check the logs for details.'
            ]);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'long_description' => 'nullable|string',
                'icon' => 'required|string|max:255',
                'price' => 'required|numeric|min:0',
                'duration' => 'nullable|string|max:255',
                'projects_count' => 'nullable|integer|min:0',
                'is_active' => 'sometimes|boolean',
                'is_featured' => 'sometimes|boolean',
                'features' => 'required|string',
                'technologies' => 'nullable|string',
                'image' => 'nullable|image|max:10240',
            ]);

            // Ensure long_description is not null - set to empty string if null
            if (!isset($validated['long_description']) || $validated['long_description'] === null) {
                $validated['long_description'] = '';
            }

            // Convert boolean values properly
            $validated['is_active'] = $request->has('is_active') ? (bool)$request->input('is_active') : true;
            $validated['is_featured'] = $request->has('is_featured') ? (bool)$request->input('is_featured') : false;

            // Debug log the validated data
            \Log::info('Service creation validated data:', $validated);

            // Process features and technologies JSON strings
            if (isset($validated['features']) && is_string($validated['features'])) {
                $features = json_decode($validated['features'], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $validated['features'] = $features;
                } else {
                    // Log error and use empty array as fallback
                    \Log::error("Failed to decode features JSON: " . json_last_error_msg());
                    $validated['features'] = [];
                }
            }
            
            if (isset($validated['technologies']) && is_string($validated['technologies'])) {
                $technologies = json_decode($validated['technologies'], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $validated['technologies'] = $technologies;
                } else {
                    // Log error and use empty array as fallback
                    \Log::error("Failed to decode technologies JSON: " . json_last_error_msg());
                    $validated['technologies'] = [];
                }
            }

            // Set order to be after the last service
            $maxOrder = Service::max('order') ?? 0;
            $validated['order'] = $maxOrder + 1;

            // Handle image upload if present
            if ($request->hasFile('image')) {
                $path = $request->file('image')->store('services', 'public');
                $validated['image_url'] = Storage::url($path);
            }
            
            // Set starting_price to the same value as price
            if (isset($validated['price'])) {
                $validated['starting_price'] = $validated['price'];
            }

            $service = Service::create($validated);
            
            // Return JSON response for AJAX requests
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Service created successfully.',
                    'service' => $service
                ]);
            }

            return redirect()->back()->with('success', 'Service created successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return validation errors as JSON for AJAX requests
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed.',
                    'errors' => $e->errors()
                ], 422);
            }
            
            throw $e;
        } catch (\Exception $e) {
            \Log::error('Error creating service: ' . $e->getMessage());
            
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to create service.',
                    'error' => $e->getMessage()
                ], 500);
            }
            
            return redirect()->back()->with('error', 'Failed to create service: ' . $e->getMessage());
        }
    }

    public function update(Request $request, Service $service)
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'sometimes|required|string',
                'long_description' => 'nullable|string',
                'icon' => 'sometimes|required|string|max:255',
                'price' => 'sometimes|required|numeric|min:0',
                'duration' => 'nullable|string|max:255',
                'projects_count' => 'nullable|integer|min:0',
                'is_active' => 'sometimes|boolean',
                'is_featured' => 'sometimes|boolean',
                'features' => 'sometimes|required|string',
                'technologies' => 'nullable|string',
                'image' => 'nullable|image|max:10240',
                'order' => 'sometimes|integer'
            ]);

            // Ensure long_description is not null - set to empty string if null
            if (!isset($validated['long_description']) || $validated['long_description'] === null) {
                $validated['long_description'] = '';
            }

            // Convert boolean values properly
            if (isset($validated['is_active'])) {
                $validated['is_active'] = (bool)$validated['is_active'];
            }
            if (isset($validated['is_featured'])) {
                $validated['is_featured'] = (bool)$validated['is_featured'];
            }

            // Debug log the validated data
            \Log::info('Service update validated data:', $validated);

            // Process features and technologies JSON strings
            if (isset($validated['features']) && is_string($validated['features'])) {
                $features = json_decode($validated['features'], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $validated['features'] = $features;
                } else {
                    // Log error and use empty array as fallback
                    \Log::error("Failed to decode features JSON: " . json_last_error_msg());
                    $validated['features'] = [];
                }
            }
            
            if (isset($validated['technologies']) && is_string($validated['technologies'])) {
                $technologies = json_decode($validated['technologies'], true);
                if (json_last_error() === JSON_ERROR_NONE) {
                    $validated['technologies'] = $technologies;
                } else {
                    // Log error and use empty array as fallback
                    \Log::error("Failed to decode technologies JSON: " . json_last_error_msg());
                    $validated['technologies'] = [];
                }
            }

            // Handle image upload if present
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($service->image_url && Storage::exists(str_replace('/storage', 'public', $service->image_url))) {
                    Storage::delete(str_replace('/storage', 'public', $service->image_url));
                }
                
                $path = $request->file('image')->store('services', 'public');
                $validated['image_url'] = Storage::url($path);
            }
            
            // Set starting_price to the same value as price if it exists
            if (isset($validated['price'])) {
                $validated['starting_price'] = $validated['price'];
            }

            $service->update($validated);

            // Return JSON response for AJAX requests
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Service updated successfully.',
                    'service' => $service
                ]);
            }

            return redirect()->back()->with('success', 'Service updated successfully.');
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return validation errors as JSON for AJAX requests
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed.',
                    'errors' => $e->errors()
                ], 422);
            }
            
            throw $e;
        } catch (\Exception $e) {
            \Log::error('Error updating service: ' . $e->getMessage());
            
            if ($request->expectsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update service.',
                    'error' => $e->getMessage()
                ], 500);
            }
            
            return redirect()->back()->with('error', 'Failed to update service: ' . $e->getMessage());
        }
    }

    public function destroy(Service $service)
    {
        // Delete image if exists
        if ($service->image_url && Storage::exists(str_replace('/storage', 'public', $service->image_url))) {
            Storage::delete(str_replace('/storage', 'public', $service->image_url));
        }

        // Delete the service
        $service->delete();

        // Return Inertia redirect response
        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        $validated = $request->validate([
            'services' => 'required|array',
            'services.*.id' => 'required|exists:services,id',
            'services.*.order' => 'required|integer|min:0',
        ]);

        foreach ($validated['services'] as $item) {
            Service::where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json(['message' => 'Services reordered successfully']);
    }

    public function resetIds()
    {
        try {
            $result = Artisan::call('services:reset-ids');

            if ($result === 0) {
                return redirect()->back()->with('success', 'Service IDs reset successfully.');
            } else {
                return redirect()->back()->with('error', 'Failed to reset service IDs. Please try again.');
            }
        } catch (\Exception $e) {
            \Log::error("Failed to reset service IDs: " . $e->getMessage());
            return redirect()->back()->with('error', 'An error occurred while resetting service IDs: ' . $e->getMessage());
        }
    }

    public function updateContent(Request $request)
    {
        $validated = $request->validate([
            'services_section_badge' => 'required|string|max:255',
            'services_section_title' => 'required|string|max:255',
            'services_section_description' => 'required|string',
            'services_button_text' => 'required|string|max:255',
            'services_page_title' => 'required|string|max:255',
            'services_page_description' => 'required|string',
            'services_benefit_1_text' => 'required|string|max:255',
            'services_benefit_1_icon' => 'required|string|max:255',
            'services_benefit_2_text' => 'required|string|max:255',
            'services_benefit_2_icon' => 'required|string|max:255',
            'services_benefit_3_text' => 'required|string|max:255',
            'services_benefit_3_icon' => 'required|string|max:255',
            'work_process_title' => 'required|string|max:255',
            'work_process_description' => 'required|string',
            'work_process_steps' => 'required|array',
            'work_process_steps.*.number' => 'required|string',
            'work_process_steps.*.title' => 'required|string',
            'work_process_steps.*.description' => 'required|string',
            'services_cta_title' => 'required|string|max:255',
            'services_cta_description' => 'required|string',
            'services_cta_primary_text' => 'required|string|max:255',
            'services_cta_secondary_text' => 'required|string|max:255',
        ]);

        // Get the first record or create if none exists
        $contentManagement = ServicesManagement::first();
        if (!$contentManagement) {
            $contentManagement = ServicesManagement::create($validated);
        } else {
            $contentManagement->update($validated);
        }



        // Clear any potential caches
        if (function_exists('opcache_reset')) {
            opcache_reset();
        }

        // Clear application cache
        \Artisan::call('cache:clear');
        \Artisan::call('config:clear');
        \Artisan::call('view:clear');

        return redirect()->back()->with('success', 'Services content updated successfully.');
    }
}