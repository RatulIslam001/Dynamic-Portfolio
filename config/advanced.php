<?php

return [
    'cache' => [
        'duration' => env('CACHE_DURATION', '1 day'), // Options: 1 day, 1 week, 1 month, custom
    ],
    'image_optimization' => [
        'enabled' => env('IMAGE_OPTIMIZATION_ENABLED', true),
        'quality' => env('IMAGE_OPTIMIZATION_QUALITY', 85),
    ],
    'maintenance_mode' => [
        'enabled' => env('MAINTENANCE_MODE', false),
    ],
]; 