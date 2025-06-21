<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NavbarController extends Controller
{
    public function index()
    {
        $profile = Profile::first();
        
        // If no profile exists yet, create a default one
        if (!$profile) {
            $profile = Profile::create([
                'full_name' => 'John Doe',
                'title' => 'Creative Designer & Developer',
                'about' => 'I create exceptional digital experiences that solve complex problems and connect people through elegant, user-focused design.',
                'years_experience' => 5,
                'projects_completed' => 50,
                'is_available' => true,
                'logo_text' => 'Portfolio',
                'logo_type' => 'text_with_icon',
                'logo_icon' => 'P',
                'logo_icon_type' => 'letter',
                'logo_color' => '#20B2AA',
                'navbar_items' => [
                    ['title' => 'Home', 'href' => 'home'],
                    ['title' => 'Services', 'href' => 'services'],
                    ['title' => 'Works', 'href' => 'works'],
                    ['title' => 'Skills', 'href' => 'skills'],
                    ['title' => 'Resume', 'href' => 'resume'],
                    ['title' => 'Testimonials', 'href' => 'testimonials'],
                    ['title' => 'Contact', 'href' => 'contact']
                ]
            ]);
        }

        return Inertia::render('admin/navbar-settings', [
            'profile' => [
                'id' => $profile->id,
                'logo_text' => $profile->logo_text,
                'logo_type' => $profile->logo_type,
                'logo_icon' => $profile->logo_icon,
                'logo_icon_type' => $profile->logo_icon_type,
                'logo_color' => $profile->logo_color,
                'navbar_items' => $profile->navbar_items,
            ],
        ]);
    }

    public function updateLogo(Request $request)
    {
        $request->validate([
            'logo_text' => 'required|string|max:255',
            'logo_type' => 'required|string|in:text_only,icon_only,text_with_icon',
            'logo_icon' => 'required|string',
            'logo_icon_type' => 'required|string|in:letter,svg,image',
            'logo_color' => 'required|string|max:255',
        ]);

        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
        }

        // Update logo settings
        $profile->logo_text = $request->logo_text;
        $profile->logo_type = $request->logo_type;
        $profile->logo_icon = $request->logo_icon;
        $profile->logo_icon_type = $request->logo_icon_type;
        $profile->logo_color = $request->logo_color;

        $profile->save();

        return redirect()->back()->with('success', 'Logo settings updated successfully.');
    }

    public function updateNavbarItems(Request $request)
    {
        $request->validate([
            'navbar_items' => 'required|array',
            'navbar_items.*.title' => 'required|string|max:255',
            'navbar_items.*.href' => 'required|string|max:255',
        ]);

        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
        }

        // Update navbar items
        $profile->navbar_items = $request->navbar_items;
        $profile->save();

        return redirect()->back()->with('success', 'Navbar items updated successfully.');
    }
}
