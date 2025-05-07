<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('order')->get();

        return Inertia::render('admin/testimonials', [
            'testimonials' => $testimonials,
            'featuredCount' => Testimonial::where('is_featured', true)->count(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'quote' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|max:2048',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('testimonials', 'public');
            $validated['image'] = $path;
        }

        $maxOrder = Testimonial::max('order') ?? 0;
        $testimonial = Testimonial::create([
            ...$validated,
            'order' => $maxOrder + 1,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Testimonial $testimonial)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'position' => 'required|string|max:255',
            'company' => 'required|string|max:255',
            'quote' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
            'image' => 'nullable|image|max:2048',
            'is_featured' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($testimonial->image) {
                Storage::disk('public')->delete($testimonial->image);
            }
            $path = $request->file('image')->store('testimonials', 'public');
            $validated['image'] = $path;
        }

        $testimonial->update($validated);

        return redirect()->back();
    }

    public function destroy(Testimonial $testimonial)
    {
        if ($testimonial->image) {
            Storage::disk('public')->delete($testimonial->image);
        }
        
        $testimonial->delete();
        return redirect()->back();
    }

    public function reorder(Request $request)
    {
        $request->validate([
            'orderedIds' => 'required|array',
            'orderedIds.*' => 'integer',
        ]);

        foreach ($request->orderedIds as $index => $id) {
            Testimonial::where('id', $id)->update(['order' => $index]);
        }

        return redirect()->back();
    }

    public function toggleFeatured(Testimonial $testimonial)
    {
        if (!$testimonial->is_featured) {
            $featuredCount = Testimonial::where('is_featured', true)->count();
            
            if ($featuredCount >= 3) {
                return response()->json([
                    'success' => false,
                    'message' => 'You can only feature up to 3 testimonials.',
                ], 422);
            }
        }

        $testimonial->update(['is_featured' => !$testimonial->is_featured]);
        return redirect()->back();
    }
} 