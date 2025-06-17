<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Artisan;

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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'is_active' => 'sometimes|boolean',
            'features' => 'required|array',
            'features.*' => 'string'
        ]);

        // Set order to be after the last service
        $maxOrder = Service::max('order') ?? 0;
        $validated['order'] = $maxOrder + 1;

        Service::create($validated);

        return redirect()->back()->with('success', 'Service created successfully.');
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'icon' => 'sometimes|required|string|max:255',
            'price' => 'sometimes|required|numeric|min:0',
            'is_active' => 'sometimes|boolean',
            'features' => 'sometimes|required|array',
            'features.*' => 'string',
            'order' => 'sometimes|integer'
        ]);

        $service->update($validated);

        return redirect()->back()->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        // Get the ID being deleted for logging
        $deletedId = $service->id;
        
        // Delete the service
        $service->delete();

        // Reset service IDs to ensure sequential ordering without gaps
        try {
            // Run the ID reset command synchronously
            $result = Artisan::call('services:reset-ids');
            
            if ($result === 0) {
                // Successfully reset IDs
                return response()->json([
                    'success' => true,
                    'message' => "Service #$deletedId deleted and IDs reset successfully."
                ]);
            } else {
                // Failed to reset IDs but service was deleted
                return response()->json([
                    'success' => true,
                    'message' => 'Service deleted successfully, but ID reindexing failed. Please reindex manually.'
                ]);
            }
        } catch (\Exception $e) {
            // Log the error but still return success for the deletion
            \Log::error("Failed to reset service IDs: " . $e->getMessage());
            
            return response()->json([
                'success' => true,
                'message' => 'Service deleted successfully, but ID reindexing failed. Please reindex manually.'
            ]);
        }
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
} 