<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('order')->get();
        
        return Inertia::render('admin/services', [
            'services' => $services
        ]);
    }

    public function publicIndex()
    {
        $services = Service::where('is_active', true)
            ->orderBy('order')
            ->get();
        
        return Inertia::render('services', [
            'services' => $services
        ]);
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
        // Get the ID being deleted for logging
        $deletedId = $service->id;
        
        // Delete image if exists
        if ($service->image_url && Storage::exists(str_replace('/storage', 'public', $service->image_url))) {
            Storage::delete(str_replace('/storage', 'public', $service->image_url));
        }
        
        // Delete the service
        $service->delete();

        // Return success response
        return response()->json([
            'success' => true,
            'message' => "Service #$deletedId deleted successfully."
        ]);
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
} 