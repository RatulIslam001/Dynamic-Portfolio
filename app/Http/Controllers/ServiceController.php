<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('order')->get();
        
        return Inertia::render('admin/services', [
            'services' => $services
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'long_description' => 'nullable|string',
            'icon' => 'required|string|max:255',
            'order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
            'projects_count' => 'nullable|integer|min:0',
            'duration' => 'nullable|string|max:255',
            'starting_price' => 'nullable|numeric|min:0',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string'
        ]);

        Service::create($validated);

        return redirect()->back()->with('success', 'Service created successfully.');
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'long_description' => 'nullable|string',
            'icon' => 'sometimes|required|string|max:255',
            'order' => 'sometimes|integer|min:0',
            'is_active' => 'sometimes|boolean',
            'projects_count' => 'nullable|integer|min:0',
            'duration' => 'nullable|string|max:255',
            'starting_price' => 'nullable|numeric|min:0',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'technologies' => 'nullable|array',
            'technologies.*' => 'string'
        ]);

        $service->update($validated);

        return redirect()->back()->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->back()->with('success', 'Service deleted successfully.');
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'services' => 'required|array',
            'services.*.id' => 'required|exists:services,id',
            'services.*.order' => 'required|integer|min:0'
        ]);

        foreach ($request->services as $serviceData) {
            Service::where('id', $serviceData['id'])->update(['order' => $serviceData['order']]);
        }

        return response()->json(['message' => 'Services reordered successfully']);
    }
} 