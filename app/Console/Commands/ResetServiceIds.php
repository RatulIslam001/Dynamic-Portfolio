<?php

namespace App\Console\Commands;

use App\Models\Service;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ResetServiceIds extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'services:reset-ids';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset auto-increment IDs for services table and reassign sequential IDs';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to reset service IDs...');
        
        try {
            // Get all services ordered by their current order
            $services = Service::orderBy('order')->get();
            
            if ($services->isEmpty()) {
                $this->info('No services found. Nothing to reset.');
                return 0;
            }
            
            $this->info('Found ' . $services->count() . ' services.');
            
            // Disable foreign key checks temporarily
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            
            // Store the original services data (excluding IDs)
            $serviceData = [];
            foreach ($services as $service) {
                $serviceData[] = [
                    'title' => $service->title,
                    'description' => $service->description,
                    'long_description' => $service->long_description,
                    'icon' => $service->icon,
                    'price' => $service->price,
                    'starting_price' => $service->starting_price,
                    'duration' => $service->duration,
                    'projects_count' => $service->projects_count,
                    'features' => json_encode($service->features),
                    'technologies' => json_encode($service->technologies),
                    'image_url' => $service->image_url,
                    'is_active' => $service->is_active,
                    'is_featured' => $service->is_featured,
                    'order' => $service->order,
                    'created_at' => $service->created_at,
                    'updated_at' => $service->updated_at
                ];
            }
            
            // Truncate the services table to reset auto-increment
            $this->info('Truncating services table to reset auto-increment...');
            DB::statement('TRUNCATE TABLE services');
            
            // Insert the data back with new sequential IDs
            $this->info('Restoring services with sequential IDs...');
            
            // Use a single database transaction for better performance
            DB::beginTransaction();
            
            try {
                foreach ($serviceData as $index => $data) {
                    DB::table('services')->insert($data);
                }
                
                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
            
            // Re-enable foreign key checks
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
            
            $this->info('Successfully reset service IDs!');
            return 0;
            
        } catch (\Exception $e) {
            // Re-enable foreign key checks
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
            
            $this->error('Failed to reset service IDs: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
            return 1;
        }
    }
}
