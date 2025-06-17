<?php

namespace App\Console\Commands;

use App\Models\Project;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ResetProjectIds extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'projects:reset-ids';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reset project IDs to be sequential';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Starting to reset project IDs...');
        
        // Get all projects ordered by ID
        $projects = Project::orderBy('id')->get();
        
        if ($projects->isEmpty()) {
            $this->info('No projects found.');
            return Command::SUCCESS;
        }
        
        // Store all project data
        $projectsData = [];
        $count = 1;
        
        foreach ($projects as $project) {
            $oldId = $project->id;
            
            // Store the project data
            $data = $project->getAttributes();
            unset($data['id']); // Remove ID to let MySQL auto-increment
            $projectsData[] = $data;
            
            $this->info("Project '{$project->title}': ID {$oldId} -> {$count}");
            $count++;
        }
        
        try {
            // Disable foreign key checks
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            
            // Truncate the projects table
            DB::table('projects')->truncate();
            
            // Reset auto-increment
            DB::statement('ALTER TABLE projects AUTO_INCREMENT = 1');
            
            // Insert all projects back with new IDs
            foreach ($projectsData as $data) {
                DB::table('projects')->insert($data);
            }
            
            // Re-enable foreign key checks
            DB::statement('SET FOREIGN_KEY_CHECKS=1');
            
            $this->info('Successfully reset project IDs.');
            
        } catch (\Exception $e) {
            $this->error('An error occurred: ' . $e->getMessage());
            return Command::FAILURE;
        }
        
        return Command::SUCCESS;
    }
} 