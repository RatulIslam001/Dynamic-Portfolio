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
                'email' => 'contact@example.com',
                'phone' => '+1(123) 456-7890',
                'location' => 'San Francisco, CA, USA',
                'years_experience' => 5,
                'projects_completed' => 50,
                'is_available' => true,
                'cta_text' => 'View Work',
                'cta_secondary_text' => 'Download CV',
                'cta_url' => '#works',
                'cta_secondary_url' => '#',
            ]);
        }

        return Inertia::render('admin/profile', [
            'profile' => [
                'id' => $profile->id,
                'fullName' => $profile->full_name,
                'title' => $profile->title,
                'about' => $profile->about,
                'email' => $profile->email,
                'phone' => $profile->phone,
                'location' => $profile->location,
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
            ],
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'fullName' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'about' => 'required|string',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'location' => 'required|string|max:255',
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
        $profile->email = $request->email;
        $profile->phone = $request->phone;
        $profile->location = $request->location;
        $profile->years_experience = $request->yearsExperience;
        $profile->projects_completed = $request->projectsCompleted;
        $profile->github_url = $request->githubUrl;
        $profile->linkedin_url = $request->linkedinUrl;
        $profile->twitter_url = $request->twitterUrl;

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            // Delete old avatar if it exists
            if ($profile->avatar) {
                Storage::delete($profile->avatar);
            }
            
            $path = $request->file('avatar')->store('public/avatars');
            $profile->avatar = str_replace('public/', '', $path);
        }

        // Handle resume upload
        if ($request->hasFile('resume')) {
            // Delete old resume if it exists
            if ($profile->resume) {
                Storage::delete($profile->resume);
            }
            
            $path = $request->file('resume')->store('public/resumes');
            $profile->resume = str_replace('public/', '', $path);
        }

        $profile->save();

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

    public function updateHeroSection(Request $request)
    {
        $request->validate([
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
        ]);

        $profile = Profile::first();
        if (!$profile) {
            $profile = new Profile();
            $profile->full_name = 'John Doe';
            $profile->email = 'contact@example.com';
            $profile->phone = '+1(123) 456-7890';
            $profile->location = 'San Francisco, CA, USA';
        }

        // Update hero section fields
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
                Storage::delete($profile->avatar);
            }
            
            $path = $request->file('avatar')->store('public/avatars');
            $profile->avatar = str_replace('public/', '', $path);
        }

        $profile->save();

        return redirect()->back()->with('success', 'Hero section updated successfully.');
    }
} 