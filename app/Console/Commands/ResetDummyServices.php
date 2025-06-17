<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class ResetDummyServices extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'services:reset-dummy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete all services and add 10 fresh dummy services with sequential IDs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to reset services with dummy data...');
        
        try {
            // Run the dummy services seeder
            $this->info('Running DummyServicesResetSeeder...');
            Artisan::call('db:seed', [
                '--class' => 'Database\\Seeders\\DummyServicesResetSeeder',
            ]);
            
            $this->info('Services successfully reset with 10 dummy entries!');
            $this->info('IDs are sequential from 1-10.');
            
            return 0;
        } catch (\Exception $e) {
            $this->error('Failed to reset services: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
            return 1;
        }
    }
} 