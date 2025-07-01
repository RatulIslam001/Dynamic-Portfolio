<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProfileController extends Controller
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
                'cta_text' => 'View Work',
                'cta_secondary_text' => 'Download CV',
                'cta_url' => '#works',
                'cta_secondary_url' => '#',
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

        return Inertia::render('admin/Profile', [
            'profile' => [
                'id' => $profile->id,
                'fullName' => $profile->full_name,
                'title' => $profile->title,
                'about' => $profile->about,
                'yearsExperience' => $profile->years_experience,
                'projectsCompleted' => $profile->projects_completed,
                'isAvailable' => $profile->is_available,
                'ctaText' => $profile->cta_text,
                'ctaSecondaryText' => $profile->cta_secondary_text,
                'ctaUrl' => $profile->cta_url,
                'ctaSecondaryUrl' => $profile->cta_secondary_url,
                'avatar' => $profile->avatar ? Storage::url($profile->avatar) : null,
                'resume' => $profile->resume ? Storage::url($profile->resume) : null,
                'githubUrl' => $profile->github_url,
                'linkedinUrl' => $profile->linkedin_url,
                'twitterUrl' => $profile->twitter_url,
                'logo_text' => $profile->logo_text,
                'logo_type' => $profile->logo_type,
                'logo_icon' => $profile->logo_icon,
                'logo_icon_type' => $profile->logo_icon_type,
                'logo_color' => $profile->logo_color,
                'navbar_items' => is_array($profile->navbar_items) ? $profile->navbar_items :
                    (is_string($profile->navbar_items) ? json_decode($profile->navbar_items, true) : []),
            ],
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'about' => 'required|string',
            'yearsExperience' => 'required|integer|min:0',
            'projectsCompleted' => 'required|integer|min:0',
            'githubUrl' => 'nullable|url|max:255',
            'linkedinUrl' => 'nullable|url|max:255',
            'twitterUrl' => 'nullable|url|max:255',
            'avatar' => 'nullable|image|max:2048',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
        }

        // Update text fields
        $profile->full_name = $request->fullName;
        $profile->title = $request->title;
        $profile->about = $request->about;
        $profile->years_experience = $request->yearsExperience;
        $profile->projects_completed = $request->projectsCompleted;
        $profile->github_url = $request->githubUrl;
        $profile->linkedin_url = $request->linkedinUrl;
        $profile->twitter_url = $request->twitterUrl;

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if it exists
            if ($profile->avatar) {
                Storage::delete('public/' . $profile->avatar);
            }
            
            $path = $request->file('avatar')->store('avatars', 'public');
            $profile->avatar = $path;
        }

        // Handle resume upload
        if ($request->hasFile('resume')) {
            // Delete old resume if it exists
            if ($profile->resume) {
                Storage::delete('public/' . $profile->resume);
            }
            
            $path = $request->file('resume')->store('resumes', 'public');
            $profile->resume = $path;
        }

        $profile->save();

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    public function updateHeroSection(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'about' => 'required|string',
            'yearsExperience' => 'required|integer|min:0',
            'projectsCompleted' => 'required|integer|min:0',
            'isAvailable' => 'boolean',
            'ctaText' => 'required|string|max:255',
            'ctaSecondaryText' => 'required|string|max:255',
            'ctaUrl' => 'nullable|string|max:255',
            'ctaSecondaryUrl' => 'nullable|string|max:255',
            'avatar' => 'nullable|image|max:2048',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:10240',
        ]);

        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
        }

        // Update hero section fields
        $profile->full_name = $request->fullName;
        $profile->title = $request->title;
        $profile->about = $request->about;
        $profile->years_experience = $request->yearsExperience;
        $profile->projects_completed = $request->projectsCompleted;
        $profile->is_available = $request->isAvailable;
        $profile->cta_text = $request->ctaText;
        $profile->cta_secondary_text = $request->ctaSecondaryText;
        $profile->cta_url = $request->ctaUrl;
        $profile->cta_secondary_url = $request->ctaSecondaryUrl;

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if it exists
            if ($profile->avatar) {
                Storage::delete('public/' . $profile->avatar);
            }
            
            $path = $request->file('avatar')->store('avatars', 'public');
            $profile->avatar = $path;
        }

        // Handle resume upload
        if ($request->hasFile('resume')) {
            // Delete old resume if it exists
            if ($profile->resume) {
                Storage::delete('public/' . $profile->resume);
            }
            
            $path = $request->file('resume')->store('resumes', 'public');
            $profile->resume = $path;
        }

        $profile->save();

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    public function updateSocialLinks(Request $request)
    {
        $request->validate([
            'githubUrl' => 'nullable|url|max:255',
            'linkedinUrl' => 'nullable|url|max:255',
            'twitterUrl' => 'nullable|url|max:255',
        ]);

        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
        }

        // Update social links
        $profile->github_url = $request->githubUrl;
        $profile->linkedin_url = $request->linkedinUrl;
        $profile->twitter_url = $request->twitterUrl;

        $profile->save();

        return redirect()->back()->with('success', 'Social links updated successfully.');
    }
} 