<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use App\Models\Service;

class ServicesResetIds extends Command
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
    protected $description = 'Reset service IDs to be sequential (1, 2, 3, etc.) without gaps';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to reset service IDs...');
        
        // Begin a transaction
        DB::beginTransaction();
        
        try {
            // Get all services ordered by their current order
            $services = Service::orderBy('order')->get();
            
            if ($services->isEmpty()) {
                $this->info('No services found. Nothing to reset.');
                DB::commit();
                return 0;
            }
            
            // Disable foreign key checks temporarily
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');
            
            // Create a backup of all services with complete data
            $backupServices = [];
            foreach ($services as $service) {
                $backupServices[] = $service->toArray();
            }
            
            // Truncate the services table
            DB::table('services')->truncate();
            
            // Reset the auto-increment to 1
            DB::statement('ALTER TABLE services AUTO_INCREMENT = 1;');
            
            // Re-enable foreign key checks
            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
            
            // Re-insert all services to get new sequential IDs
            foreach ($backupServices as $index => $serviceData) {
                // Remove the old ID
                unset($serviceData['id']);
                
                // Make sure JSON fields are properly encoded
                if (isset($serviceData['features']) && is_array($serviceData['features'])) {
                    $serviceData['features'] = json_encode($serviceData['features']);
                }
                
                if (isset($serviceData['technologies']) && is_array($serviceData['technologies'])) {
                    $serviceData['technologies'] = json_encode($serviceData['technologies']);
                }
                
                // Insert with new ID (auto-incremented)
                $newId = DB::table('services')->insertGetId($serviceData);
                
                $this->info("Restored service: {$serviceData['title']} with new ID: {$newId}");
            }
            
            // Commit the transaction
            DB::commit();
            
            $this->info('Service IDs have been successfully reset.');
            return 0;
        } catch (\Exception $e) {
            // Rollback the transaction if something goes wrong
            DB::rollBack();
            
            $this->error('Failed to reset service IDs: ' . $e->getMessage());
            $this->error($e->getTraceAsString());
            return 1;
        }
    }
}
