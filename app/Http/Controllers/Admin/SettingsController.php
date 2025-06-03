<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Artisan;

class SettingsController extends Controller
{
    public function index()
    {
        $lastLogin = session('last_login', [
            'date' => Carbon::now()->format('F j, Y, g:i A'),
            'ip' => request()->ip()
        ]);

        return Inertia::render('admin/settings', [
            'settings' => [
                'site' => [
                    'title' => config('app.name'),
                    'description' => config('app.description', ''),
                    'language' => config('app.locale', 'en'),
                    'timezone' => config('app.timezone'),
                    'date_format' => config('app.date_format', 'Y-m-d'),
                    'time_format' => config('app.time_format', 'H:i'),
                ],
                'seo' => [
                    'meta_title' => config('seo.meta_title', ''),
                    'meta_description' => config('seo.meta_description', ''),
                    'social_image' => config('seo.social_image', ''),
                    'google_analytics_id' => config('seo.google_analytics_id', ''),
                    'generate_sitemap' => config('seo.generate_sitemap', true),
                    'generate_robots' => config('seo.generate_robots', true),
                    'structured_data' => config('seo.structured_data', true),
                ],
                'security' => [
                    'two_factor_enabled' => config('security.two_factor_enabled', false),
                    'session_timeout' => config('security.session_timeout', 30),
                    'ip_restriction' => config('security.ip_restriction', ''),
                    'last_login' => $lastLogin
                ],
                'notifications' => [
                    'email_notifications' => config('notifications.email_notifications', true),
                    'preferences' => [
                        'new_messages' => config('notifications.preferences.new_messages', true),
                        'login_alerts' => config('notifications.preferences.login_alerts', true),
                        'weekly_reports' => config('notifications.preferences.weekly_reports', false),
                        'marketing_emails' => config('notifications.preferences.marketing_emails', false),
                    ]
                ],
                'advanced' => [
                    'cache_duration' => config('advanced.cache.duration', '1 day'),
                    'image_optimization' => [
                        'enabled' => config('advanced.image_optimization.enabled', true),
                        'quality' => config('advanced.image_optimization.quality', 85),
                    ],
                    'maintenance_mode' => config('advanced.maintenance_mode.enabled', false),
                ]
            ]
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'site.title' => 'required|string|max:255',
            'site.description' => 'nullable|string|max:1000',
            'site.language' => 'required|string|in:en',
            'site.timezone' => 'required|string|timezone',
            'site.date_format' => 'required|string',
            'site.time_format' => 'required|string',
            'seo.meta_title' => 'required|string|max:60',
            'seo.meta_description' => 'required|string|max:160',
            'seo.social_image' => 'nullable|string',
            'seo.google_analytics_id' => 'nullable|string|max:50',
            'seo.generate_sitemap' => 'boolean',
            'seo.generate_robots' => 'boolean',
            'seo.structured_data' => 'boolean',
            'security.two_factor_enabled' => 'boolean',
            'security.session_timeout' => 'required|integer|in:15,30,60,120',
            'security.ip_restriction' => 'nullable|string',
            'notifications.email_notifications' => 'boolean',
            'notifications.preferences.new_messages' => 'boolean',
            'notifications.preferences.login_alerts' => 'boolean',
            'notifications.preferences.weekly_reports' => 'boolean',
            'notifications.preferences.marketing_emails' => 'boolean',
            'advanced.cache_duration' => 'required|string|in:1 day,1 week,1 month,custom',
            'advanced.image_optimization.enabled' => 'boolean',
            'advanced.image_optimization.quality' => 'integer|min:1|max:100',
            'advanced.maintenance_mode' => 'boolean',
        ]);

        // Store the last login information in the session
        session(['last_login' => [
            'date' => Carbon::now()->format('F j, Y, g:i A'),
            'ip' => request()->ip()
        ]]);

        // Update settings logic here
        // This will be implemented based on your settings storage mechanism

        return redirect()->back()->with('success', 'Settings updated successfully.');
    }

    public function clearCache()
    {
        Cache::flush();
        Artisan::call('cache:clear');
        Artisan::call('view:clear');
        
        return redirect()->back()->with('success', 'Cache cleared successfully.');
    }

    public function exportData()
    {
        // Implementation for data export
        // This will be customized based on what data needs to be exported
        
        return response()->json(['message' => 'Data export initiated']);
    }
} 