<?php

return [
    'email_notifications' => env('EMAIL_NOTIFICATIONS', true),
    'preferences' => [
        'new_messages' => env('NOTIFY_NEW_MESSAGES', true),
        'login_alerts' => env('NOTIFY_LOGIN_ALERTS', true),
        'weekly_reports' => env('NOTIFY_WEEKLY_REPORTS', false),
        'marketing_emails' => env('NOTIFY_MARKETING_EMAILS', false),
    ],
]; 