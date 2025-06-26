<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SeedDummyServices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'seed:dummy-services';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed the database with dummy service data';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Seeding dummy services...');
        
        Artisan::call('db:seed', [
            '--class' => 'Database\\Seeders\\DummyServicesSeeder',
        ]);
        
        $this->info('Dummy services seeded successfully!');
        
        return Command::SUCCESS;
    }
} 