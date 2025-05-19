<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppearanceController extends Controller
{
    public function index()
    {
        return Inertia::render('appearance', [
            'settings' => [
                'theme' => config('appearance.theme', 'professional-blue'),
                'darkMode' => config('appearance.dark_mode', 'auto'),
                'typography' => config('appearance.typography', [
                    'font' => 'inter',
                    'size' => 'base',
                ]),
                'layout' => config('appearance.layout', [
                    'width' => 'default',
                    'spacing' => 'comfortable',
                ]),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'theme' => 'required|string|in:professional-blue,creative-purple,natural-green,bold-red,monochrome,dark-mode',
            'darkMode' => 'required|string|in:light,dark,auto,disabled',
            'typography.font' => 'sometimes|string',
            'typography.size' => 'sometimes|string',
            'layout.width' => 'sometimes|string',
            'layout.spacing' => 'sometimes|string',
        ]);

        // Save settings to config or database
        config(['appearance.theme' => $validated['theme']]);
        config(['appearance.dark_mode' => $validated['darkMode']]);
        
        if (isset($validated['typography'])) {
            config(['appearance.typography' => $validated['typography']]);
        }
        
        if (isset($validated['layout'])) {
            config(['appearance.layout' => $validated['layout']]);
        }

        return redirect()->back()->with('success', 'Appearance settings updated successfully.');
    }
} 