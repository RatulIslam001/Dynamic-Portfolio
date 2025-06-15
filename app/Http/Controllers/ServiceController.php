<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::all();
        
        return Inertia::render('admin/services', [
            'services' => $services
        ]);
    }

    public function publicIndex()
    {
        $services = Service::where('is_active', true)
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
            'features.*' => 'string'
        ]);

        $service->update($validated);

        return redirect()->back()->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->back()->with('success', 'Service deleted successfully.');
    }
} 