<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Default Theme
    |--------------------------------------------------------------------------
    |
    | This value is the default theme that will be used for the portfolio.
    | Available options: professional-blue, creative-purple, natural-green,
    | bold-red, monochrome, dark-mode
    |
    */
    'theme' => env('DEFAULT_THEME', 'professional-blue'),

    /*
    |--------------------------------------------------------------------------
    | Dark Mode
    |--------------------------------------------------------------------------
    |
    | This value determines the default dark mode behavior.
    | Available options: light, dark, auto, disabled
    |
    */
    'dark_mode' => env('DEFAULT_DARK_MODE', 'auto'),

    /*
    |--------------------------------------------------------------------------
    | Typography Settings
    |--------------------------------------------------------------------------
    |
    | Default typography settings for the portfolio.
    |
    */
    'typography' => [
        'font' => env('DEFAULT_FONT', 'inter'),
        'size' => env('DEFAULT_FONT_SIZE', 'base'),
    ],

    /*
    |--------------------------------------------------------------------------
    | Layout Settings
    |--------------------------------------------------------------------------
    |
    | Default layout settings for the portfolio.
    |
    */
    'layout' => [
        'width' => env('DEFAULT_LAYOUT_WIDTH', 'default'),
        'spacing' => env('DEFAULT_LAYOUT_SPACING', 'comfortable'),
    ],
]; 