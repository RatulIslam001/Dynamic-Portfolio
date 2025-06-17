<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class SeedDummyProjects extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'projects:seed-dummy';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Seed the database with dummy projects for all categories';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Seeding dummy projects...');
        
        Artisan::call('db:seed', [
            '--class' => 'Database\\Seeders\\DummyProjectsSeeder',
        ]);
        
        $this->info('Dummy projects seeded successfully!');
        
        return Command::SUCCESS;
    }
} 